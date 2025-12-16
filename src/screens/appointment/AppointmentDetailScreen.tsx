import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function AppointmentDetailScreen({ route, navigation }: any) {
  const { appointmentId } = route?.params || {};

  // Mock data based on ID (real app would fetch)
  const appointment = {
    id: appointmentId || '123',
    customer: 'Nguyễn Huy',
    service: 'Combo cắt gội',
    time: '10:30 – 11:00',
    notes: 'Lần đầu cắt',
    status: 'Đang chờ',
    phone: '0912345678'
  };

  const handleAction = (action: string) => {
    Alert.alert('Thao tác', `Bạn đã chọn: ${action}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{appointment.customer.charAt(0)}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.customerName}>{appointment.customer}</Text>
                    <Text style={styles.phone}>{appointment.phone}</Text>
                </View>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{appointment.status}</Text>
                </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
                <Text style={styles.label}>Dịch vụ:</Text>
                <Text style={styles.value}>{appointment.service}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Thời gian:</Text>
                <Text style={styles.value}>{appointment.time}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Ghi chú:</Text>
                <Text style={styles.value}>{appointment.notes}</Text>
            </View>
        </View>

        <View style={styles.actionContainer}>
            <TouchableOpacity style={[styles.btn, styles.btnCheckin]} onPress={() => handleAction('Check-in')}>
                <Text style={styles.btnText}>CHECK-IN</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.btn, styles.btnStart]} onPress={() => handleAction('Bắt đầu')}>
                <Text style={styles.btnText}>BẮT ĐẦU PHỤC VỤ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.btn, styles.btnComplete]} onPress={() => handleAction('Hoàn thành')}>
                <Text style={styles.btnText}>HOÀN THÀNH</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => handleAction('Hủy')}>
                <Text style={[styles.btnText, styles.textCancel]}>HỦY LỊCH</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 2, marginBottom: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ffe5d1', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { fontSize: 20, fontWeight: 'bold', color: '#ff7a18' },
  customerName: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  phone: { color: '#666' },
  statusBadge: { backgroundColor: '#fff4e5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { color: '#ff7a18', fontWeight: 'bold', fontSize: 12 },
  divider: { height: 1, backgroundColor: '#eee', marginBottom: 16 },
  infoRow: { flexDirection: 'row', marginBottom: 12 },
  label: { width: 80, color: '#666' },
  value: { flex: 1, fontWeight: '500', color: '#333' },
  
  actionContainer: { gap: 12 },
  btn: { padding: 16, borderRadius: 12, alignItems: 'center', elevation: 1 },
  btnCheckin: { backgroundColor: '#3498db' },
  btnStart: { backgroundColor: '#f1c40f' },
  btnComplete: { backgroundColor: '#2ecc71' },
  btnCancel: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e74c3c' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  textCancel: { color: '#e74c3c' }
});
