import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WAITING_LIST = [
    { id: '1', name: 'Nguyễn Huy', waitTime: '10 phút chờ' },
    { id: '2', name: 'Phạm Dũng', waitTime: '15 phút chờ' },
    { id: '3', name: 'Vũ Hoàng', waitTime: '20 phút chờ' },
];

export default function WaitingQueueScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Khách đang chờ</Text>
      
      <FlatList
        data={WAITING_LIST}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
            <View style={styles.item}>
                <View style={styles.row}>
                    <Text style={styles.index}>{index + 1})</Text>
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.wait}>{item.waitTime}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
            </View>
        )}
      />

      <TouchableOpacity style={styles.nextBtn}>
        <Text style={styles.btnText}>Nhận khách tiếp theo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1a1a1a' },
  item: { marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  index: { fontSize: 18, fontWeight: 'bold', color: '#ff7a18', marginRight: 12 },
  info: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  wait: { color: '#666' },
  divider: { height: 1, backgroundColor: '#eee', marginTop: 8 },
  nextBtn: { backgroundColor: '#ff7a18', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
