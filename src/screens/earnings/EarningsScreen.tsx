import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';

export default function EarningsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
            <Text style={styles.label}>Tổng thu nhập tháng này</Text>
            <Text style={styles.totalMoney}>12.500.000đ</Text>
        </View>

        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Biểu đồ thu nhập</Text>
            <LineChart
                data={{
                labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
                datasets: [
                    {
                    data: [2500000, 3200000, 2800000, 4000000]
                    }
                ]
                }}
                width={Dimensions.get("window").width - 40}
                height={220}
                yAxisLabel=""
                yAxisSuffix="đ"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#ff7a18",
                    backgroundGradientFrom: "#ff7a18",
                    backgroundGradientTo: "#ffa05c",
                    decimalPlaces: 0, 
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>

        <View style={styles.statsRow}>
            <View style={styles.statBox}>
                <Text style={styles.statVal}>125</Text>
                <Text style={styles.statLbl}>Lượt phục vụ</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statVal}>2.3tr</Text>
                <Text style={styles.statLbl}>Tiền Tip</Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    content: { padding: 20 },
    header: { alignItems: 'center', marginBottom: 24 },
    label: { color: '#666', fontSize: 16 },
    totalMoney: { fontSize: 32, fontWeight: 'bold', color: '#ff7a18', marginTop: 8 },
    chartContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 16, marginBottom: 20, elevation: 2 },
    chartTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
    statBox: { flex: 1, backgroundColor: '#fff', padding: 20, borderRadius: 16, alignItems: 'center', marginHorizontal: 6, elevation: 2 },
    statVal: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    statLbl: { color: '#666', marginTop: 4 }
});
