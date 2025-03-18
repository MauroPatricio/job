import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const serviceDetailsData = {
  'Wall Painting': ['Interior Painting', 'Exterior Painting', 'Decorative Painting'],
  'Ceiling Painting': ['Smooth Finish', 'Textured Finish'],
  'AC Installation': ['Split AC Installation', 'Window AC Installation'],
  'AC Repair': ['Cooling Issue Fix', 'Gas Refilling', 'Compressor Repair'],
  'House Cleaning': ['Deep Cleaning', 'Basic Cleaning', 'Move-in/Move-out Cleaning'],
  'Haircut': ['Men’s Haircut', 'Women’s Haircut', 'Kids Haircut'],
  'Beard Trim': ['Basic Trim', 'Styled Beard'],
};

const ServiceDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params;
  const serviceDetails = serviceDetailsData[service] || [];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{service}</Text>
      <Text style={styles.subtitle}>Escolha uma opção de serviço</Text>

      <FlatList
        data={serviceDetails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>{item}</Text>
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
  optionButton: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  optionText: { fontSize: 16, fontWeight: 'bold' },
});

export default ServiceDetailsScreen;
