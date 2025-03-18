import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const servicesData = {
  '1': [
    { name: 'Wall Painting', image: require('../assets/worker.png') },
    { name: 'Ceiling Painting', image: require('../assets/ac.jpg') },
    { name: 'Door Painting', image: require('../assets/cleaning.jpeg') },
  ],
  '2': [
    { name: 'AC Installation', image: require('../assets/ac.jpg') },
    { name: 'AC Repair', image: require('../assets/ac.jpg') },
    { name: 'AC Maintenance', image: require('../assets/ac.jpg') },
  ],
  '3': [
    { name: 'House Cleaning', image: require('../assets/cleaning.jpeg') },
    { name: 'Office Cleaning', image: require('../assets/cleaning.jpeg') },
    { name: 'Carpet Cleaning', image: require('../assets/cleaning.jpeg') },
  ],
  // Add more categories accordingly
};

const ServicesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params;
  const services = servicesData[category.id] || [];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{category.name}</Text>
      <Text style={styles.subtitle}>Selecione um serviço</Text>

      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.serviceButton}>
            <Image source={item.image} style={styles.serviceImage} />
            <Text style={styles.serviceText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8', padding: 15 },
  backButton: { position: 'absolute', top: 15, left: 15, backgroundColor: '#E0E0E0', padding: 10, borderRadius: 20, zIndex: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 50, marginBottom: 5 },
  subtitle: { fontSize: 14, color: 'gray', marginBottom: 15 },
  serviceButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  serviceImage: { width: 40, height: 40, marginRight: 10, borderRadius: 5 },
  serviceText: { fontSize: 16, fontWeight: 'bold' },
});

export default ServicesScreen;
