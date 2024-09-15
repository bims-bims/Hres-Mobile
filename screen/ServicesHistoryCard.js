import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';


const ScheduleServicesCard = (userId) => { 
  const [serviceData, setServiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get('http://192.168.160.137:8000/api/admin/schedule-services');
        setServiceData(response.data.data); 
      } catch (error) {
        console.error('Error fetching service data:', error);
        setError('Terjadi kesalahan saat mengambil data.'); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceData();
  }, []);


  const filteredServiceData = serviceData.filter(item => item.user_id === userId.userId);



  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Service ID: {item.id}</Text>
      <Text style={styles.title}>User ID: {item.user_id}</Text>
      <Text>Tanggal Terakhir Service: {item.tanggal_terakhir_service}</Text>
      <Text>Tanggal Service Selanjutnya: {item.tanggal_service_selanjutnya}</Text>
      <Text>Unit: {item.unit}</Text>
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <FlatList
      
      data={filteredServiceData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity:   
 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize:   
 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default ScheduleServicesCard; 