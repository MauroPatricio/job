import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import {MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CategoryCard from '../components/CategoryCard';

const categories = [
  { id: '1', name: 'Pintura', icon: 'color-palette', color: '#FFA07A' },
  { id: '2', name: 'Reparacao de AC', icon: 'snow', color: '#FF6F61' },
  { id: '3', name: 'Limpeza', icon: 'brush', color: '#FFD700' },
  { id: '4', name: 'Seguros', icon: 'tv', color: '#87CEEB' },
  { id: '5', name: 'Salao e Beleza', icon: 'cut', color: '#9370DB' },
  { id: '6', name: 'Construcao', icon: 'construct', color: '#32CD32' },
  { id: '7', name: 'Electronicos', icon: 'hardware-chip', color: '#A9A9A9' },
  { id: '8', name: 'Salao Masculino', icon: 'cut', color: '#4682B4' },
  { id: '9', name: 'Mudancas', icon: 'cube', color: '#3CB371' },
];

const CategoriesScreen = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons  name="caret-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Todas Categorias</Text>
      <Text style={styles.subtitle}>Escolha a categoria de serviço que deseja agendar</Text>
      
      <View style={styles.searchBar}>
        <Ionicons  name="search" size={20} color="gray" />
        <TextInput
          placeholder="Pesquise pela categoria..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={categories.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <CategoryCard category={item} onPress={() => navigation.navigate('ServicesScreen', { category: item })} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8', padding: 15 },
  backButton: { position: 'absolute', top: 15, left: 15, backgroundColor: '#E0E0E0', padding: 10, borderRadius: 20, zIndex: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 50, marginBottom: 5 },
  subtitle: { fontSize: 14, color: 'gray', marginBottom: 15 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  searchInput: { marginLeft: 10, flex: 1 },
  row: { justifyContent: 'space-between', marginBottom: 15 },
});

export default CategoriesScreen;
