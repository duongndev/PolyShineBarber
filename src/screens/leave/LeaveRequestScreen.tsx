import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const REQUESTS = [
    { id: '1', date: '15/12', type: 'Xin nghỉ', status: 'pending', reason: 'Nghỉ phép năm' },
    { id: '2', date: '17/12', type: 'Làm thêm', status: 'approved', reason: 'Tăng ca tối' },
];

export default function LeaveRequestScreen() {
    const [mode, setMode] = useState<'list' | 'create'>('list');
    const [type, setType] = useState('off'); // off | overtime
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');

    if (mode === 'create') {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Gửi yêu cầu mới</Text>
                
                <View style={styles.form}>
                    <Text style={styles.label}>Chọn loại:</Text>
                    <View style={styles.radioRow}>
                        <TouchableOpacity style={[styles.radio, type === 'off' && styles.radioActive]} onPress={() => setType('off')}>
                            <Text style={[styles.radioText, type === 'off' && styles.radioTextActive]}>Nghỉ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.radio, type === 'overtime' && styles.radioActive]} onPress={() => setType('overtime')}>
                            <Text style={[styles.radioText, type === 'overtime' && styles.radioTextActive]}>Tăng ca</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Chọn ngày:</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="DD/MM/YYYY" 
                        value={date} 
                        onChangeText={setDate}
                    />

                    <Text style={styles.label}>Lý do:</Text>
                    <TextInput 
                        style={[styles.input, {height: 80}]} 
                        placeholder="Nhập lý do..." 
                        multiline 
                        value={reason} 
                        onChangeText={setReason}
                    />

                    <TouchableOpacity style={styles.submitBtn} onPress={() => setMode('list')}>
                        <Text style={styles.submitText}>GỬI YÊU CẦU</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelBtn} onPress={() => setMode('list')}>
                        <Text style={styles.cancelText}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nghỉ & Tăng ca</Text>
      <FlatList
        data={REQUESTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <View style={styles.card}>
                <View style={styles.rowBetween}>
                    <Text style={styles.reqTitle}>{item.type} ngày {item.date}</Text>
                    <Text style={[styles.status, item.status === 'approved' ? styles.approved : styles.pending]}>
                        {item.status === 'approved' ? 'Đã duyệt' : 'Đang chờ duyệt'}
                    </Text>
                </View>
                <Text style={styles.reason}>{item.reason}</Text>
            </View>
        )}
      />
      
      <TouchableOpacity style={styles.fab} onPress={() => setMode('create')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1a1a1a' },
    card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 1 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    reqTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    status: { fontSize: 12, fontWeight: 'bold' },
    approved: { color: '#2ecc71' },
    pending: { color: '#f1c40f' },
    reason: { color: '#666' },
    fab: { position: 'absolute', bottom: 30, right: 30, width: 56, height: 56, borderRadius: 28, backgroundColor: '#ff7a18', justifyContent: 'center', alignItems: 'center', elevation: 5 },
    fabText: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
    
    // Form
    form: { marginTop: 10 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    radioRow: { flexDirection: 'row', marginBottom: 20 },
    radio: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
    radioActive: { backgroundColor: '#ff7a18', borderColor: '#ff7a18' },
    radioText: { color: '#333' },
    radioTextActive: { color: '#fff', fontWeight: 'bold' },
    input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 },
    submitBtn: { backgroundColor: '#ff7a18', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
    submitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    cancelBtn: { padding: 16, alignItems: 'center' },
    cancelText: { color: '#666' }
});
