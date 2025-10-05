import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Text, Card, Chip, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { appointmentsAPI } from '../../services/api';
import { colors } from '../../theme';
import { format, parseISO } from 'date-fns';

const AppointmentsScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchAppointments();
    }, [])
  );

  const fetchAppointments = async () => {
    try {
      const response = await appointmentsAPI.getAll();
      setAppointments(response.data.data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAppointments();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return colors.status.pending;
      case 'confirmed':
        return colors.status.confirmed;
      case 'completed':
        return colors.status.completed;
      case 'cancelled':
        return colors.status.cancelled;
      default:
        return colors.gray[500];
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return 'time';
      case 'confirmed':
        return 'checkmark-circle';
      case 'completed':
        return 'checkmark-done-circle';
      case 'cancelled':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <Text style={styles.headerSubtitle}>
          {appointments.length} {appointments.length === 1 ? 'appointment' : 'appointments'}
        </Text>
      </View>

      {/* Appointments List */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.centerContainer}>
            <Text>Loading appointments...</Text>
          </View>
        ) : appointments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={80} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No appointments yet</Text>
            <Text style={styles.emptySubtext}>Book your first appointment with a doctor</Text>
          </View>
        ) : (
          <View style={styles.appointmentsList}>
            {appointments.map((appointment) => (
              <Card key={appointment._id} style={styles.appointmentCard}>
                <Card.Content>
                  {/* Status Badge */}
                  <View style={styles.cardHeader}>
                    <Chip
                      mode="flat"
                      style={[
                        styles.statusChip,
                        { backgroundColor: getStatusColor(appointment.status) + '20' },
                      ]}
                      textStyle={[
                        styles.statusText,
                        { color: getStatusColor(appointment.status) },
                      ]}
                      icon={getStatusIcon(appointment.status)}
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Chip>
                  </View>

                  {/* Doctor Info */}
                  <View style={styles.doctorSection}>
                    <View style={styles.doctorIcon}>
                      <Ionicons name="person" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.doctorInfo}>
                      <Text style={styles.doctorName}>{appointment.doctor?.name}</Text>
                      <Text style={styles.specialty}>{appointment.doctor?.specialty}</Text>
                    </View>
                  </View>

                  {/* Appointment Details */}
                  <View style={styles.detailsSection}>
                    <View style={styles.detailRow}>
                      <Ionicons name="calendar" size={18} color={colors.gray[600]} />
                      <Text style={styles.detailText}>
                        {format(parseISO(appointment.date), 'MMMM dd, yyyy')}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="time" size={18} color={colors.gray[600]} />
                      <Text style={styles.detailText}>{appointment.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="document-text" size={18} color={colors.gray[600]} />
                      <Text style={styles.detailText} numberOfLines={2}>
                        {appointment.reason}
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        label="New Appointment"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.gray[700],
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 5,
  },
  appointmentsList: {
    padding: 15,
  },
  appointmentCard: {
    marginBottom: 15,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  statusChip: {
    height: 28,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  doctorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  doctorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  specialty: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
  },
  detailsSection: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: colors.gray[700],
    marginLeft: 10,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default AppointmentsScreen;
