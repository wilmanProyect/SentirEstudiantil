import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from 'react-native-calendars';

export default function Principal() {
    const [contador, setContador] = useState(3);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const router = useRouter();
    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        setShowCalendar(false); // Cierra el modal después de seleccionar una fecha
    };
    return (
        <ImageBackground
            source={require('../assets/images/background.jpg')}
            style={styles.background}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Cielo emocional</Text>
                <TouchableOpacity onPress={() => setShowCalendar(true)}>
                    <Ionicons name="calendar" style={styles.icono} />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.subtitle}>¿Cómo te sientes el día de hoy?</Text>
                {selectedDate ? (
                    <Text style={styles.selectedDate}>{selectedDate}</Text>
                ) : (
                    <Text> __ </Text>
                )}
            </View>
            <Modal
                visible={showCalendar}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowCalendar(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.calendarContainer}>
                        <Calendar
                            onDayPress={onDayPress}
                            markedDates={{
                                [selectedDate]: {selected: true, selectedColor: '#6200ee'}
                            }}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: '#b6c1cd',
                                selectedDayBackgroundColor: '#6200ee',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#6200ee',
                                dayTextColor: '#2d4150',
                                arrowColor: '#6200ee',
                            }}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowCalendar(false)}
                        >
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.container}>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push(`/modal`)}
                >
                    <Text style={styles.buttonText}>Expresa aquí tus emociones</Text>
                </TouchableOpacity>

                <Text style={styles.counterText}>Aparecerá una estrella en {contador}</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        display: 'flex',
    },
    header2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 100,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
    subtitle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    calendarContainer: {
        marginBottom: 20,
    },
    calendarIcon: {
        width: 50,
        height: 50,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: '80%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    counterText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    icono: {
        fontSize: 30,
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendarContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#6200ee',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});