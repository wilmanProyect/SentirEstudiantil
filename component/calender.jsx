import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarModal = ({ visible, onClose, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              onDateSelect(day.dateString);
              onClose();
            }}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#6200ee' }
            }}
            theme={{
              todayTextColor: '#6200ee',
              arrowColor: '#6200ee',
            }}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 5,
  },
  closeText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});

export default CalendarModal;