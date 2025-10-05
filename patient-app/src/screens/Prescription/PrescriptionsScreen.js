import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { prescriptionsAPI } from '../../services/api';
import { colors } from '../../theme';
import { format, parseISO } from 'date-fns';

const PrescriptionsScreen = ({ navigation }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchPrescriptions();
    }, [])
  );

  const fetchPrescriptions = async () => {
    try {
      const response = await prescriptionsAPI.getAll();
      setPrescriptions(response.data.data.prescriptions);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPrescriptions();
  };

  const handlePrescriptionPress = (prescription) => {
    navigation.navigate('PrescriptionDetails', { prescription });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Prescriptions</Text>
        <Text style={styles.headerSubtitle}>
          {prescriptions.length} {prescriptions.length === 1 ? 'prescription' : 'prescriptions'}
        </Text>
      </View>

      {/* Prescriptions List */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.centerContainer}>
            <Text>Loading prescriptions...</Text>
          </View>
        ) : prescriptions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={80} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No prescriptions yet</Text>
            <Text style={styles.emptySubtext}>
              Your prescriptions will appear here after doctor visits
            </Text>
          </View>
        ) : (
          <View style={styles.prescriptionsList}>
            {prescriptions.map((prescription) => (
              <TouchableOpacity
                key={prescription._id}
                onPress={() => handlePrescriptionPress(prescription)}
                activeOpacity={0.7}
              >
                <Card style={styles.prescriptionCard}>
                  <Card.Content>
                    {/* Header */}
                    <View style={styles.cardHeader}>
                      <View style={styles.iconContainer}>
                        <Ionicons name="document-text" size={24} color={colors.primary} />
                      </View>
                      <View style={styles.headerInfo}>
                        <Text style={styles.doctorName}>{prescription.doctor?.name}</Text>
                        <Text style={styles.date}>
                          {format(parseISO(prescription.createdAt), 'MMM dd, yyyy')}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={24} color={colors.gray[400]} />
                    </View>

                    {/* Diagnosis */}
                    <View style={styles.diagnosisSection}>
                      <Text style={styles.label}>Diagnosis</Text>
                      <Text style={styles.diagnosis} numberOfLines={2}>
                        {prescription.diagnosis}
                      </Text>
                    </View>

                    {/* Medicines Count */}
                    <View style={styles.medicinesSection}>
                      <Ionicons name="medical" size={16} color={colors.success} />
                      <Text style={styles.medicinesCount}>
                        {prescription.medicines?.length || 0} medicine(s) prescribed
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
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
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  prescriptionsList: {
    padding: 15,
  },
  prescriptionCard: {
    marginBottom: 15,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  date: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
  diagnosisSection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: colors.gray[600],
    fontWeight: '600',
    marginBottom: 5,
  },
  diagnosis: {
    fontSize: 14,
    color: colors.gray[900],
  },
  medicinesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '10',
    padding: 8,
    borderRadius: 6,
  },
  medicinesCount: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default PrescriptionsScreen;
