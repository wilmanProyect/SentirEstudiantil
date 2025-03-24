import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const EmotionModal = () => {
    const [visible, setVisible] = useState(true);
    const [selectedEmotions, setSelectedEmotions] = useState([]);
    const router = useRouter();

    const colors = [
        { color: 'red', label: 'Enojo' },
        { color: 'orange', label: 'Celos' },
        { color: 'yellow', label: 'Alegría' },
        { color: 'green', label: 'Desagrado' },
        { color: 'skyblue', label: 'Tristeza' },
        { color: 'purple', label: 'Nostalgia' },
    ];

    const toggleEmotionSelection = (emotion) => {
        if (selectedEmotions.includes(emotion)) {
            setSelectedEmotions(selectedEmotions.filter(item => item !== emotion));
        } else {
            setSelectedEmotions([...selectedEmotions, emotion]);
        }
    };

    const handleSend = () => {
        router.push({
            pathname: "/principal",
            params: { selectedEmotions: JSON.stringify(selectedEmotions) } 
        });
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, styles.emotionsRow]}>
                        {colors.map((item, index) => (
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
                                    <Text style={styles.selectedText}>¡Seleccionado!</Text>
                                )}
                            </View>
                        ))}
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
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
    },
    circleContainer: {
        alignItems: 'center',
        marginBottom: 5,
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
        borderColor: '#6200ea',
    },
    label: {
        fontSize: 16,
    },
    selectedText: {
        fontSize: 14,
        color: '#6200ea',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#6200ea',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    sendButton: {
        marginTop: 20,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default EmotionModal;
