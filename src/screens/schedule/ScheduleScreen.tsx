import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { TabScreenNavigationProp } from '../../navigations/type';

// Mock Data
const MOCK_APPOINTMENTS = [
    { id: '1', time: '09:00 - 09:30', client: 'Nguyễn Huy', service: 'Combo cắt gội', status: 'pending', date: '2025-12-10' },
    { id: '2', time: '10:30 - 11:00', client: 'Lê Minh', service: 'Uốn + gội', status: 'checkin', date: '2025-12-10' },
    { id: '3', time: '14:00 - 14:45', client: 'Phạm Dũng', service: 'Nhuộm tóc', status: 'completed', date: '2025-12-10' },
];

LocaleConfig.locales['vi'] = {
  monthNames: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
  monthNamesShort: ['Th.1','Th.2','Th.3','Th.4','Th.5','Th.6','Th.7','Th.8','Th.9','Th.10','Th.11','Th.12'],
  dayNames: ['Chủ Nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
  dayNamesShort: ['CN','T2','T3','T4','T5','T6','T7'],
  today: 'Hôm nay'
};
LocaleConfig.defaultLocale = 'vi';

export default function ScheduleScreen() {
    const navigation = useNavigation<TabScreenNavigationProp>();
    const [selectedDate, setSelectedDate] = useState('2025-12-10');

    const filteredAppointments = MOCK_APPOINTMENTS.filter(app => app.date === selectedDate);

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'pending': return '#f1c40f'; // Yellow
            case 'checkin': return '#2ecc71'; // Green
            case 'completed': return '#95a5a6'; // Gray
            default: return '#ccc';
        }
    };

    const getStatusText = (status: string) => {
         switch(status) {
            case 'pending': return 'Chờ'; 
            case 'checkin': return 'Check-in'; 
            case 'completed': return 'Hoàn thành'; 
            default: return '';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
                        setSelectedDate(day.dateString);
                    }}
                    markedDates={{
                        [selectedDate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                    }}
                    theme={{
                        selectedDayBackgroundColor: '#ff7a18',
                        todayTextColor: '#ff7a18',
                        arrowColor: '#ff7a18',
                    }}
                />
            </View>

            <View style={styles.listContainer}>
                <Text style={styles.dateHeader}>Lịch ngày {selectedDate}</Text>
                <FlatList
                    data={filteredAppointments}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{paddingBottom: 20}}
                    ListEmptyComponent={<Text style={styles.emptyText}>Không có lịch nào.</Text>}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            style={styles.card}
                            onPress={() => navigation.navigate('AppointmentDetailScreen', { appointmentId: item.id })}
                        >
                            <View style={styles.timeColumn}>
                                <Text style={styles.timeText}>{item.time.split(' - ')[0]}</Text>
                                <Text style={styles.endTimeText}>{item.time.split(' - ')[1]}</Text>
                            </View>
                            <View style={styles.infoColumn}>
                                <Text style={styles.clientName}>{item.client}</Text>
                                <Text style={styles.serviceName}>{item.service}</Text>
                            </View>
                            <View style={styles.statusColumn}>
                                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                                    <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    calendarContainer: { backgroundColor: '#fff', marginBottom: 10, elevation: 2 },
    listContainer: { flex: 1, paddingHorizontal: 16 },
    dateHeader: { fontSize: 18, fontWeight: 'bold', marginVertical: 12, color: '#333' },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 }
    },
    timeColumn: { marginRight: 16, alignItems: 'center', minWidth: 50 },
    timeText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    endTimeText: { fontSize: 12, color: '#888' },
    infoColumn: { flex: 1 },
    clientName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    serviceName: { fontSize: 14, color: '#666', marginTop: 4 },
    statusColumn: { marginLeft: 8 },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    emptyText: { textAlign: 'center', color: '#999', marginTop: 20 }
});
