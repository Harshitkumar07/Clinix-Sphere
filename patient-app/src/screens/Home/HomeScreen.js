import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Card, Avatar, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { doctorsAPI } from '../../services/api';
import { colors } from '../../theme';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [doctors, searchQuery]);

  const fetchDoctors = async () => {
    try {
      const response = await doctorsAPI.getAll();
      setDoctors(response.data.data.doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterDoctors = () => {
    if (!searchQuery.trim()) {
      setFilteredDoctors(doctors);
      return;
    }

    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDoctors();
  };

  const handleDoctorPress = (doctor) => {
    navigation.navigate('DoctorDetails', { doctor });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0]}! 👋</Text>
          <Text style={styles.subGreeting}>Find your doctor</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search doctors or specialties..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      {/* Doctors List */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.centerContainer}>
            <Text>Loading doctors...</Text>
          </View>
        ) : filteredDoctors.length === 0 ? (
          <View style={styles.centerContainer}>
            <Ionicons name="search" size={50} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No doctors found</Text>
          </View>
        ) : (
          <View style={styles.doctorsList}>
            {filteredDoctors.map((doctor) => (
              <TouchableOpacity
                key={doctor._id}
                onPress={() => handleDoctorPress(doctor)}
                activeOpacity={0.7}
              >
                <Card style={styles.doctorCard}>
                  <Card.Content>
                    <View style={styles.doctorHeader}>
                      <Avatar.Image
                        size={60}
                        source={{ uri: doctor.avatar }}
                        style={styles.avatar}
                      />
                      <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>{doctor.name}</Text>
                        <Chip
                          mode="outlined"
                          style={styles.specialtyChip}
                          textStyle={styles.specialtyText}
                        >
                          {doctor.specialty}
                        </Chip>
                        {doctor.experience > 0 && (
                          <View style={styles.experienceContainer}>
                            <Ionicons
                              name="ribbon"
                              size={14}
                              color={colors.gray[600]}
                            />
                            <Text style={styles.experienceText}>
                              {doctor.experience} years experience
                            </Text>
                          </View>
                        )}
                      </View>
                      <Ionicons
                        name="chevron-forward"
                        size={24}
                        color={colors.gray[400]}
                      />
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  subGreeting: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginTop: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBar: {
    elevation: 2,
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
  emptyText: {
    marginTop: 10,
    color: colors.gray[600],
    fontSize: 16,
  },
  doctorsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  doctorCard: {
    marginBottom: 15,
    elevation: 2,
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.primaryLight,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 15,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 5,
  },
  specialtyChip: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    height: 28,
    backgroundColor: colors.primaryLight + '20',
    borderColor: colors.primary,
  },
  specialtyText: {
    fontSize: 12,
    color: colors.primary,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  experienceText: {
    fontSize: 12,
    color: colors.gray[600],
    marginLeft: 4,
  },
});

export default HomeScreen;
