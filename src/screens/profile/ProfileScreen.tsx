import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabScreenNavigationProp } from '../../navigations/type';

export default function ProfileScreen() {
  const navigation = useNavigation<TabScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
            <Text style={styles.title}>Hồ sơ cá nhân</Text>
        </View>

        <View style={styles.card}>
            <View style={styles.profileRow}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>TB</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>Tuấn Barber</Text>
                <Text style={styles.meta}>Cấp bậc: Senior Barber</Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editText}>Sửa</Text>
            </TouchableOpacity>
            </View>
        </View>

        <View style={styles.infoCard}>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Ca làm việc</Text>
                <Text style={styles.value}>09:00 – 18:00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
                <Text style={styles.label}>Số điện thoại</Text>
                <Text style={styles.value}>0987.654.321</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>tuan@polyshine.vn</Text>
            </View>
        </View>

        <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EarningsScreen')}>
                <Text style={styles.menuText}>💰 Thu nhập & Thống kê</Text>
                <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('LeaveRequestScreen')}>
                <Text style={styles.menuText}>📅 Đăng ký nghỉ / Tăng ca</Text>
                <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
             <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>⚙️ Cài đặt ứng dụng</Text>
                <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('LoginScreen')}> 
            <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1a1a1a' },
  card: { backgroundColor: '#fff', padding: 20, marginBottom: 16 },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#ffe5d1', marginRight: 16, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#ff7a18', fontSize: 24, fontWeight: 'bold' },
  name: { color: '#1a1a1a', fontWeight: 'bold', fontSize: 20 },
  meta: { color: '#666', marginTop: 4 },
  editBtn: { backgroundColor: '#f0f0f0', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 },
  editText: { color: '#333', fontWeight: 'bold' },
  
  infoCard: { backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14 },
  label: { color: '#666', fontSize: 16 },
  value: { color: '#1a1a1a', fontWeight: 'bold', fontSize: 16 },
  divider: { height: 1, backgroundColor: '#f0f0f0' },
  
  menuCard: { backgroundColor: '#fff', paddingHorizontal: 20, marginBottom: 24 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, alignItems: 'center' },
  menuText: { fontSize: 16, fontWeight: '500', color: '#333' },
  arrow: { fontSize: 20, color: '#ccc', fontWeight: 'bold' },
  
  logoutBtn: { margin: 20, backgroundColor: '#fff0e6', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ffdac1' },
  logoutText: { color: '#ff7a18', fontWeight: 'bold', fontSize: 16 }
});
