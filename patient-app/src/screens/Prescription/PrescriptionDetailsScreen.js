import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';
import { format, parseISO } from 'date-fns';

const PrescriptionDetailsScreen = ({ route }) => {
  const { prescription } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Card */}
        <Card style={styles.headerCard}>
          <Card.Content>
            <View style={styles.headerContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="document-text" size={40} color={colors.primary} />
              </View>
              <Text style={styles.headerTitle}>Prescription Details</Text>
              <Text style={styles.headerDate}>
                Issued: {format(parseISO(prescription.createdAt), 'MMMM dd, yyyy')}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Doctor Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Prescribed By</Text>
            <Divider style={styles.divider} />
            <View style={styles.doctorInfo}>
              <View style={styles.doctorIcon}>
                <Ionicons name="person" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.doctorName}>{prescription.doctor?.name}</Text>
                <Text style={styles.specialty}>{prescription.doctor?.specialty}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Patient Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Patient Information</Text>
            <Divider style={styles.divider} />
            <View style={styles.infoRow}>
              <Ionicons name="person" size={18} color={colors.gray[600]} />
              <Text style={styles.infoText}>{prescription.patient?.name}</Text>
            </View>
            {prescription.patient?.email && (
              <View style={styles.infoRow}>
                <Ionicons name="mail" size={18} color={colors.gray[600]} />
                <Text style={styles.infoText}>{prescription.patient?.email}</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Symptoms */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Symptoms</Text>
            <Divider style={styles.divider} />
            <Text style={styles.bodyText}>{prescription.symptoms}</Text>
          </Card.Content>
        </Card>

        {/* Diagnosis */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Diagnosis</Text>
            <Divider style={styles.divider} />
            <Text style={styles.bodyText}>{prescription.diagnosis}</Text>
          </Card.Content>
        </Card>

        {/* Medicines */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Prescribed Medicines</Text>
            <Divider style={styles.divider} />
            {prescription.medicines?.map((medicine, index) => (
              <View key={index} style={styles.medicineItem}>
                <View style={styles.medicineNumber}>
                  <Text style={styles.medicineNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.medicineDetails}>
                  <Text style={styles.medicineName}>{medicine.name}</Text>
                  <View style={styles.medicineInfo}>
                    <View style={styles.medicineInfoItem}>
                      <Ionicons name="flask" size={14} color={colors.gray[600]} />
                      <Text style={styles.medicineInfoText}>Dosage: {medicine.dosage}</Text>
                    </View>
                    <View style={styles.medicineInfoItem}>
                      <Ionicons name="time" size={14} color={colors.gray[600]} />
                      <Text style={styles.medicineInfoText}>Duration: {medicine.duration}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Additional Notes */}
        {prescription.notes && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Additional Notes</Text>
              <Divider style={styles.divider} />
              <View style={styles.notesContainer}>
                <Ionicons name="information-circle" size={20} color={colors.primary} />
                <Text style={styles.notesText}>{prescription.notes}</Text>
              </View>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
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
    paddingVertical: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 5,
  },
  headerDate: {
    fontSize: 14,
    color: colors.gray[600],
  },
  card: {
    margin: 15,
    marginTop: 0,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 8,
  },
  divider: {
    marginBottom: 12,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  specialty: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray[700],
    marginLeft: 10,
  },
  bodyText: {
    fontSize: 14,
    color: colors.gray[800],
    lineHeight: 22,
  },
  medicineItem: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 12,
    backgroundColor: colors.gray[50],
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.success,
  },
  medicineNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medicineNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  medicineDetails: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 8,
  },
  medicineInfo: {
    gap: 6,
  },
  medicineInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  medicineInfoText: {
    fontSize: 13,
    color: colors.gray[700],
    marginLeft: 6,
  },
  notesContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '10',
    padding: 12,
    borderRadius: 8,
  },
  notesText: {
    flex: 1,
    fontSize: 14,
    color: colors.gray[800],
    marginLeft: 10,
    lineHeight: 20,
  },
});

export default PrescriptionDetailsScreen;
