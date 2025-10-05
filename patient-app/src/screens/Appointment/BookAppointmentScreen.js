import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, TextInput, Button, Snackbar, Card } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { appointmentsAPI } from '../../services/api';
import { colors } from '../../theme';
import { format } from 'date-fns';

const BookAppointmentScreen = ({ route, navigation }) => {
  const { doctor } = route.params;
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'info' });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  ];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleBookAppointment = async () => {
    if (!time || !reason.trim()) {
      setSnackbar({
        visible: true,
        message: 'Please select time and provide reason',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      await appointmentsAPI.create({
        doctorId: doctor._id,
        date: date.toISOString(),
        time,
        reason,
      });

      setSnackbar({
        visible: true,
        message: 'Appointment booked successfully!',
        type: 'success',
      });

      setTimeout(() => {
        navigation.navigate('Appointments');
      }, 1500);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to book appointment';
      setSnackbar({
        visible: true,
        message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Doctor Info */}
        <Card style={styles.doctorCard}>
          <Card.Content>
            <Text style={styles.label}>Booking with</Text>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
          </Card.Content>
        </Card>

        {/* Date Selection */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              icon="calendar"
              style={styles.dateButton}
            >
              {format(date, 'MMMM dd, yyyy')}
            </Button>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </Card.Content>
        </Card>

        {/* Time Selection */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.timeSlotsContainer}>
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  mode={time === slot ? 'contained' : 'outlined'}
                  onPress={() => setTime(slot)}
                  style={styles.timeSlot}
                  compact
                >
                  {slot}
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Reason */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Reason for Visit</Text>
            <TextInput
              value={reason}
              onChangeText={setReason}
              mode="outlined"
              multiline
              numberOfLines={4}
              placeholder="Describe your symptoms or reason for visit..."
              style={styles.textArea}
            />
          </Card.Content>
        </Card>

        {/* Book Button */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleBookAppointment}
            loading={loading}
            disabled={loading}
            style={styles.bookButton}
            contentStyle={styles.bookButtonContent}
            icon="calendar-check"
          >
            Confirm Booking
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={3000}
        style={snackbar.type === 'success' ? styles.successSnackbar : styles.errorSnackbar}
      >
        {snackbar.message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  doctorCard: {
    margin: 15,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 5,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  specialty: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
  },
  card: {
    margin: 15,
    marginTop: 0,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: 12,
  },
  dateButton: {
    borderRadius: 8,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  timeSlot: {
    margin: 5,
    borderRadius: 8,
  },
  textArea: {
    minHeight: 100,
  },
  buttonContainer: {
    padding: 15,
  },
  bookButton: {
    borderRadius: 10,
  },
  bookButtonContent: {
    paddingVertical: 8,
  },
  successSnackbar: {
    backgroundColor: colors.success,
  },
  errorSnackbar: {
    backgroundColor: colors.error,
  },
});

export default BookAppointmentScreen;
