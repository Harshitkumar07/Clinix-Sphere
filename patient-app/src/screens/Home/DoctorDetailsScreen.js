import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Avatar, Card, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

const DoctorDetailsScreen = ({ route, navigation }) => {
  const { doctor } = route.params;

  const handleBookAppointment = () => {
    navigation.navigate('BookAppointment', { doctor });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Doctor Header */}
        <Card style={styles.headerCard}>
          <Card.Content style={styles.headerContent}>
            <Avatar.Image
              size={100}
              source={{ uri: doctor.avatar }}
              style={styles.avatar}
            />
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
          </Card.Content>
        </Card>

        {/* Doctor Info */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>About Doctor</Text>
            <Divider style={styles.divider} />

            <View style={styles.infoRow}>
              <Ionicons name="ribbon" size={20} color={colors.primary} />
              <Text style={styles.infoLabel}>Experience</Text>
              <Text style={styles.infoValue}>{doctor.experience} years</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="mail" size={20} color={colors.primary} />
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{doctor.email}</Text>
            </View>

            {doctor.phone && (
              <View style={styles.infoRow}>
                <Ionicons name="call" size={20} color={colors.primary} />
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{doctor.phone}</Text>
              </View>
            )}

            <View style={styles.infoRow}>
              <Ionicons name="star" size={20} color={colors.primary} />
              <Text style={styles.infoLabel}>Specialty</Text>
              <Text style={styles.infoValue}>{doctor.specialty}</Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Book Appointment Button */}
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleBookAppointment}
          style={styles.bookButton}
          contentStyle={styles.bookButtonContent}
          icon="calendar-check"
        >
          Book Appointment
        </Button>
      </View>
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
  headerCard: {
    margin: 15,
    elevation: 3,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    marginBottom: 15,
    backgroundColor: colors.primaryLight,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 5,
  },
  specialty: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  infoCard: {
    margin: 15,
    marginTop: 0,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 10,
  },
  divider: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.gray[600],
    marginLeft: 10,
  },
  infoValue: {
    fontSize: 14,
    color: colors.gray[900],
    fontWeight: '500',
  },
  footer: {
    padding: 15,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  bookButton: {
    borderRadius: 10,
  },
  bookButtonContent: {
    paddingVertical: 8,
  },
});

export default DoctorDetailsScreen;
