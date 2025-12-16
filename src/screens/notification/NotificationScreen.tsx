import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NOTIFICATIONS = [
    { id: '1', title: 'Lịch mới', content: 'Bạn có lịch mới lúc 13:00 hôm nay', time: '10:00 AM', isNew: true },
    { id: '2', title: 'Yêu cầu nghỉ', content: 'Yêu cầu nghỉ ngày 15/12 đã được duyệt', time: '09:00 AM', isNew: false },
    { id: '3', title: 'Check-in', content: 'Khách Lê Minh vừa check-in', time: '08:30 AM', isNew: false },
];

export default function NotificationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Thông báo</Text>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 16}}
        renderItem={({ item }) => (
            <View style={[styles.card, item.isNew && styles.newCard]}>
                <View style={styles.row}>
                    <View style={styles.dot} />
                    <View style={styles.content}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.body}>{item.content}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                </View>
            </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { fontSize: 22, fontWeight: 'bold', padding: 20, backgroundColor: '#fff', color: '#1a1a1a' },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 1 },
    newCard: { backgroundColor: '#fff9f5', borderLeftWidth: 4, borderLeftColor: '#ff7a18' },
    row: { flexDirection: 'row' },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ff7a18', marginTop: 6, marginRight: 12 },
    content: { flex: 1 },
    title: { fontWeight: 'bold', fontSize: 16, color: '#333', marginBottom: 4 },
    body: { color: '#666', marginBottom: 6 },
    time: { color: '#999', fontSize: 12 }
});
