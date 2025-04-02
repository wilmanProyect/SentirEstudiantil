import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import useUserStore from '../store/userStore';

const { width, height } = Dimensions.get('window');
// Restricciones de posición
const TOP_MARGIN = 150;
const BOTTOM_MARGIN = 350;
const RENDER_HEIGHT = height - TOP_MARGIN - BOTTOM_MARGIN;
const RENDER_WIDTH = width;


const EmotionModal = () => {
    const [visible, setVisible] = useState(true);
    const [selectedEmotions, setSelectedEmotions] = useState([]);
    const router = useRouter();
    const { addEmocion } = useUserStore();

    const emotionsData = [
        {
            color: 'red',
            label: 'Enojo',
            description: 'El enojo es una emoción que surge cuando sentimos que algo no es justo o cuando nuestras expectativas no se cumplen.'
        },
        {
            color: 'rgb(253, 93, 0)',
            label: 'Celos',
            description: 'Los celos aparecen cuando sentimos que podemos perder algo o a alguien que valoramos, o cuando percibimos una amenaza a una relación importante.'
        },
        {
            color: 'yellow',
            label: 'Alegría',
            description: 'La alegría es una emoción positiva que experimentamos cuando ocurre algo que nos gusta o cuando nos sentimos satisfechos.'
        },
        {
            color: 'green',
            label: 'Desagrado',
            description: 'El desagrado es una reacción de rechazo hacia algo que nos parece desagradable, ya sea físico o moral.'
        },
        {
            color: 'skyblue',
            label: 'Tristeza',
            description: 'La tristeza surge ante la pérdida o el fracaso, y nos ayuda a procesar situaciones dolorosas.'
        },
        {
            color: 'purple',
            label: 'Nostalgia',
            description: 'La nostalgia es una mezcla de tristeza y afecto por recuerdos del pasado, generalmente asociados con momentos felices.'
        },
    ];

    const toggleEmotionSelection = (emotion) => {
        if (selectedEmotions.includes(emotion)) {
            setSelectedEmotions(selectedEmotions.filter(item => item !== emotion));
        } else {
            setSelectedEmotions([...selectedEmotions, emotion]);
        }
    };

    const generatePosition = () => ({
        top: TOP_MARGIN + (Math.random() * RENDER_HEIGHT),
        left: Math.random() * RENDER_WIDTH
    });


    const handleSend = () => {
        // Generar datos de emociones con posiciones
        const emocionesConPosicion = selectedEmotions.map(emocion => ({
            emocion,
            ...generatePosition()
        }));

        // Guardar en el estado global
        emocionesConPosicion.forEach(emocionData => {
            addEmocion(emocionData);
        });

        router.back();
    };
    const getDescription = () => {
        if (selectedEmotions.length === 0) {
            return (
                <View style={styles.currentDescription}>
                    <Text style={styles.initialMessage} >Selecciona una emoción para ver su descripción</Text>
                </View>
            );
        }

        return selectedEmotions.map(emotionLabel => {
            const emotion = emotionsData.find(e => e.label === emotionLabel);
            return (
                <View key={emotionLabel} style={styles.emotionDescription}>
                    <View style={[styles.descriptionColor, { backgroundColor: emotion.color }]} />
                    <Text style={styles.descriptionTitle}>{emotion.label}:</Text>
                    <Text style={styles.descriptionText}>{emotion.description}</Text>
                </View>
            );
        });
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <ImageBackground source={require('../assets/images/Backgound2.jpg')} style={styles.background}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent]}>
                        <ScrollView contentContainerStyle={styles.emotionsRow}>
                            {emotionsData.map((item, index) => (
                                <View key={index} style={styles.emotionItem}>
                                    <TouchableOpacity
                                        onPress={() => toggleEmotionSelection(item.label)}
                                        style={[
                                            styles.circleContainer,
                                            selectedEmotions.includes(item.label) && styles.selectedCircleContainer,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.circle,
                                                { backgroundColor: item.color },
                                                selectedEmotions.includes(item.label) && styles.enlargedCircle,
                                            ]}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.label}>{item.label}</Text>
                                    {selectedEmotions.includes(item.label) && (
                                        <Text style={styles.selectedText}>✓</Text>
                                    )}
                                </View>
                            ))}
                        </ScrollView>

                        <ScrollView style={styles.descriptionScrollContainer}>
                            <View style={styles.descriptionContainer}>
                                {getDescription()}
                            </View>
                        </ScrollView>

                        {!selectedEmotions.length ? (
                            <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                                <Text style={styles.sendButtonText}>Enviar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ImageBackground>
        </Modal>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        maxHeight: '80%',
        width: '90%',
    },
    emotionsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 15,
    },
    emotionItem: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 5,
        width: 80,
    },
    circleContainer: {
        alignItems: 'center',
        marginBottom: 5,
        padding: 5,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginBottom: 5,
    },
    enlargedCircle: {
        width: 50,
        height: 50,
    },
    selectedCircleContainer: {
        borderWidth: 2,
        borderColor: 'rgb(255, 255, 255)',
        borderRadius: 30,
    },
    label: {
        fontSize: 18,
        textAlign: 'center',
        color: 'rgb(255, 255, 255)',
        fontWeight: 'bold',
    },
    initialMessage: {
        color: 'rgb(255, 255, 255)',
    },
    selectedText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.5)',
        fontWeight: 'bold',
    },
    descriptionScrollContainer: {
        maxHeight: 150,
        width: '100%',
        marginVertical: 10,
    },
    descriptionContainer: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.42)',
        borderRadius: 8,
    },
    emotionDescription: {
        marginBottom: 15,
    },
    descriptionColor: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginBottom: 5,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(255, 255, 255)',
        marginBottom: 3,
    },
    descriptionText: {
        fontSize: 16,
        color: 'rgb(255, 255, 255)',
        textAlign: 'left',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 12,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 19,
    },
    sendButton: {
        marginTop: 10,
        backgroundColor: 'rgba(34, 36, 189, 0.5)',
        padding: 12,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 19,
    },
});

export default EmotionModal;