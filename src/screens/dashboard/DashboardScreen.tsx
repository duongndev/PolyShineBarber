import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TabScreenNavigationProp } from '../../navigations/type';

type Appointment = {
  id: string;
  time: string; // 24h
  client: string;
  service: string;
  status: 'confirmed' | 'pending' | 'done';
};

type LeaveSchedule = {
  id: string;
  date: string;
  reason: string;
};

const DashboardScreen = () => {
  const navigation = useNavigation<TabScreenNavigationProp>();
  const [isWorking, setIsWorking] = useState(true);

  // Mock Data
  const upcomingAppointments: Appointment[] = useMemo(
    () => [
      {
        id: '1',
        time: '08:45',
        client: 'Nguyễn Văn A',
        service: 'Cắt tóc nam',
        status: 'confirmed',
      },
      {
        id: '2',
        time: '10:10',
        client: 'Trần Quốc B',
        service: 'Cạo râu',
        status: 'pending',
      },
      {
        id: '3',
        time: '13:30',
        client: 'Phạm Minh C',
        service: 'Uốn tóc nhẹ',
        status: 'confirmed',
      },
    ],
    [],
  );

  const leaveSchedules: LeaveSchedule[] = useMemo(
    () => [
      { id: '1', date: '15/12/2025', reason: 'Nghỉ phép năm' },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fffefc" />
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* User Info Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              {/* Placeholder Avatar */}
              <Text style={styles.avatarText}>BJ</Text> 
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Barber John</Text>
              <Text style={styles.userLocation}>📍 Chi nhánh Hà Nội</Text>
            </View>
          </View>
          <View style={styles.statusBadge}>
            <Text style={[styles.statusText, isWorking ? styles.textOnline : styles.textOffline]}>
              {isWorking ? 'Đang làm việc' : 'Tạm nghỉ'}
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#ff7a18' }}
              thumbColor={isWorking ? '#fff' : '#f4f3f4'}
              onValueChange={setIsWorking}
              value={isWorking}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('ScheduleTab')}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Tổng lịch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('WaitingQueueScreen')}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Khách chờ</Text>
          </TouchableOpacity>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8h</Text>
            <Text style={styles.statLabel}>Giờ làm</Text>
          </View>
        </View>

        {/* Main Action: QR Check-in */}
        <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate('ScanQRTab')}>
          <Text style={styles.qrButtonText}>📷 Check-in khách bằng QR</Text>
        </TouchableOpacity>

        {/* Widget: Upcoming Customers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Khách sắp tới</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ScheduleTab')}>
              <Text style={styles.seeMore}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            {upcomingAppointments.map((item, index) => (
              <View key={item.id} style={[styles.appointmentItem, index !== upcomingAppointments.length - 1 && styles.borderBottom]}>
                <View style={styles.timeBox}>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.clientName}>{item.client}</Text>
                  <Text style={styles.serviceName}>{item.service}</Text>
                </View>
                <View style={[styles.statusDot, item.status === 'confirmed' ? styles.dotGreen : styles.dotYellow]} />
              </View>
            ))}
          </View>
        </View>

        {/* Widget: Registered Time Off */}
        {leaveSchedules.length > 0 && (
          <View style={styles.section}>
             <Text style={styles.sectionTitle}>Lịch nghỉ đã đăng ký</Text>
             <View style={styles.cardContainer}>
                {leaveSchedules.map((item, index) => (
                  <View key={item.id} style={[styles.leaveItem, index !== leaveSchedules.length - 1 && styles.borderBottom]}>
                    <Text style={styles.leaveDate}>{item.date}</Text>
                    <Text style={styles.leaveReason}>{item.reason}</Text>
                  </View>
                ))}
             </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { padding: 20, paddingBottom: 40 },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffefea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarText: { color: '#ff7a18', fontWeight: 'bold', fontSize: 18 },
  userDetails: {},
  userName: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  userLocation: { fontSize: 12, color: '#666', marginTop: 2 },
  statusBadge: { alignItems: 'flex-end' },
  statusText: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
  textOnline: { color: '#2ecc71' },
  textOffline: { color: '#95a5a6' },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: { fontSize: 20, fontWeight: '900', color: '#1a1a1a', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#666' },

  // QR Button
  qrButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  qrButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // Sections
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 10 },
  seeMore: { color: '#ff7a18', fontWeight: '600', fontSize: 13 },
  
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  timeBox: {
    backgroundColor: '#ffefea',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  timeText: { color: '#ff7a18', fontWeight: 'bold', fontSize: 13 },
  appointmentInfo: { flex: 1 },
  clientName: { fontWeight: 'bold', color: '#1a1a1a', fontSize: 15 },
  serviceName: { color: '#666', fontSize: 13, marginTop: 2 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  dotGreen: { backgroundColor: '#2ecc71' },
  dotYellow: { backgroundColor: '#f1c40f' },
  
  borderBottom: { borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },

  leaveItem: { padding: 16, flexDirection: 'row', justifyContent: 'space-between' },
  leaveDate: { fontWeight: 'bold', color: '#1a1a1a' },
  leaveReason: { color: '#666' },
});
