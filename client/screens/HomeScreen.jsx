import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';

const offers = [
  { id: '1', image: 'https://via.placeholder.com/300x150', title: 'Oferta Especial', discount: 'Até 40% OFF' },
  { id: '2', image: 'https://via.placeholder.com/300x150', title: 'Promoção Exclusiva', discount: 'Até 50% OFF' },
  { id: '3', image: 'https://via.placeholder.com/300x150', title: 'Frete Grátis', discount: 'Por tempo limitado' },
];

const categories = [
  { id: '1', name: 'Limpeza', icon: 'broom', color: '#A4E3B2' },
  { id: '2', name: 'Reparação', icon: 'hammer', color: '#F4A98F' },
  { id: '3', name: 'Jardinagem', icon: 'leaf', color: '#FFC75F' },
  { id: '4', name: 'Mudança', icon: 'cube', color: '#8EC5FC' },
  { id: '5', name: 'Ver tudo', icon: 'grid', color: '#FF9AA2' },
];

const servicesByCategory = {
  '1': [{ id: '1', name: 'Limpeza de casa', rating: 4.8, image: 'https://via.placeholder.com/100' }],
  '2': [{ id: '2', name: 'Reparacoes electricas', rating: 4.5, image: 'https://via.placeholder.com/100' }],
  '3': [{ id: '3', name: 'Jardinagem', rating: 4.6, image: 'https://via.placeholder.com/100' }],
  '4': [{ id: '4', name: 'Mudancas', rating: 4.7, image: 'https://via.placeholder.com/100' }],
};

const { width: viewportWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const carouselRef = useRef(null);

  const handleCategorySelect = (categoryId) => {
    if (categoryId === '5') {
      navigation.navigate('CategoriesScreen');
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const renderOfferItem = ({ item }) => {
    return (
      <View style={styles.offerItem}>
        <Image source={{ uri: item.image }} style={styles.offerImage} />
        <View style={styles.offerTextContainer}>
          <Text style={styles.offerTitle}>{item.title}</Text>
          <Text style={styles.offerDiscount}>{item.discount}</Text>
          <TouchableOpacity style={styles.claimButton}>
            <Text style={styles.claimButtonText}>Claim</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.locationText}>📍 Maputo, Cidade</Text>
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons  name="search" size={20} color="gray" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </TouchableOpacity>
      </View>

      

      <Text style={styles.sectionTitle}>Categorias</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryButton, { backgroundColor: item.color }]}
            onPress={() => handleCategorySelect(item.id)}>
            <MaterialCommunityIcons  name={item.icon} size={24} color="#fff" />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>Servicos populares</Text>
      <FlatList
        data={selectedCategory ? servicesByCategory[selectedCategory] || [] : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.serviceCard}>
            <Image source={{ uri: item.image }} style={styles.serviceImage} />
            <View>
              <Text style={styles.serviceText}>{item.name}</Text>
              <Text style={styles.serviceRating}>⭐ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    paddingTop: 22,
  },
  header: {
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  offerItem: {
    flexDirection: 'row',
    backgroundColor: '#00aeef',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  offerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  offerTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  offerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  offerDiscount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  claimButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  claimButtonText: {
    color: '#00aeef',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoryButton: {
    padding: 12,
    marginRight: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 85,
    height: 85,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceRating: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;