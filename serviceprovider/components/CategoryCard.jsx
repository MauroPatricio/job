import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome  } from '@expo/vector-icons';

const CategoryCard = ({ category, onPress }) => {
  const renderIcon = (iconName) => {
      return <Ionicons name={iconName} size={30} color="#fff" />;
  
  };

  return (
    <TouchableOpacity style={[styles.categoryButton, { backgroundColor: category.color }]} onPress={onPress}>
      {renderIcon(category.icon)}
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default CategoryCard;
