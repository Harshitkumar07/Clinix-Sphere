import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar, Divider, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Text
              size={80}
              label={user?.name?.charAt(0) || 'U'}
              style={styles.avatar}
            />
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            {user?.phone && (
              <View style={styles.phoneContainer}>
                <Ionicons name="call" size={16} color={colors.gray[600]} />
                <Text style={styles.userPhone}>{user.phone}</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Account Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <Divider style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Ionicons name="person" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Full Name</Text>
                <Text style={styles.infoValue}>{user?.name}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="mail" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user?.email}</Text>
              </View>
            </View>

            {user?.phone && (
              <View style={styles.infoRow}>
                <Ionicons name="call" size={20} color={colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{user.phone}</Text>
                </View>
              </View>
            )}

            <View style={styles.infoRow}>
              <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Account Type</Text>
                <Text style={styles.infoValue}>Patient</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* App Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>About</Text>
            <Divider style={styles.divider} />
            
            <List.Item
              title="Version"
              description="1.0.0"
              left={props => <List.Icon {...props} icon="information-circle" />}
            />
            <List.Item
              title="App Name"
              description="Clinix Sphere"
              left={props => <List.Icon {...props} icon="apps" />}
            />
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            mode="contained"
            onPress={handleLogout}
            icon="logout"
            style={styles.logoutButton}
            contentStyle={styles.logoutButtonContent}
            buttonColor={colors.error}
          >
            Logout
          </Button>
        </View>
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
  scrollView: {
    flex: 1,
  },
  profileCard: {
    margin: 15,
    elevation: 3,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    backgroundColor: colors.primary,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhone: {
    fontSize: 14,
    color: colors.gray[600],
    marginLeft: 6,
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
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: colors.gray[900],
    fontWeight: '500',
  },
  logoutContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  logoutButton: {
    borderRadius: 10,
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
});

export default ProfileScreen;
