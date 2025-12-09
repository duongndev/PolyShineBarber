import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

type Service = { id: string; name: string; price: number; duration: string };
type Barber = { id: string; name: string; avatar?: string; rating: number };

const SERVICES: Service[] = [
  { id: 'svc1', name: 'Cắt tóc nam', price: 120000, duration: '30p' },
  { id: 'svc2', name: 'Cạo râu', price: 80000, duration: '20p' },
  { id: 'svc3', name: 'Uốn tóc', price: 220000, duration: '45p' },
];

const BARBERS: Barber[] = [
  { id: 'b1', name: 'Anh Tuấn', rating: 4.8 },
  { id: 'b2', name: 'Quang Minh', rating: 4.7 },
  { id: 'b3', name: 'Hữu Phúc', rating: 4.9 },
];

export default function AppointmentScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Đặt lịch</Text>
        <Text style={styles.subtitle}>Chọn dịch vụ và thợ</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dịch vụ phổ biến</Text>
        <FlatList
          horizontal
          data={SERVICES}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.serviceItem}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceMeta}>{item.duration}</Text>
              <Text style={styles.servicePrice}>{item.price.toLocaleString()}đ</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Chọn thợ</Text>
        <FlatList
          data={BARBERS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.barberRow} onPress={() => navigation.navigate('AppointmentDetailScreen', { appointmentId: item.id })}>
              <View style={styles.barberAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.barberName}>{item.name}</Text>
                <Text style={styles.barberRating}>★ {item.rating}</Text>
              </View>
              <Text style={styles.barberAction}>Xem lịch</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffefc' },
  header: { paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#1a1a1a' },
  subtitle: { color: '#6b6b6b', marginTop: 4 },
  card: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#f0e9e6',
  },
  sectionTitle: { fontWeight: '800', color: '#1a1a1a', marginBottom: 10 },
  serviceItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 14,
    minWidth: 140,
  },
  serviceName: { color: '#333', fontWeight: '800' },
  serviceMeta: { color: '#6b6b6b', marginTop: 4 },
  servicePrice: { color: '#ff7a18', fontWeight: '800', marginTop: 4 },
  barberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
  },
  barberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffe5d1',
    marginRight: 12,
  },
  barberName: { color: '#1a1a1a', fontWeight: '800' },
  barberRating: { color: '#6b6b6b', marginTop: 2 },
  barberAction: { color: '#ff7a18', fontWeight: '800' },
});