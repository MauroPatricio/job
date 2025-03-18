import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, addService } from '../store/actions/adminActions';

const AdminScreen = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.admin.categories);
  const services = useSelector((state) => state.admin.services);

  const [newCategory, setNewCategory] = useState('');
  const [newService, setNewService] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;
    dispatch(addCategory(newCategory));
    setNewCategory('');
    Alert.alert('Categoria Adicionada!');
  };

  const handleAddService = () => {
    if (!selectedCategory || newService.trim() === '') return;
    dispatch(addService(selectedCategory, newService));
    setNewService('');
    Alert.alert('Serviço Adicionado!');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Adicionar Categoria</Text>
      <TextInput
        placeholder="Nome da Categoria"
        value={newCategory}
        onChangeText={setNewCategory}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Adicionar Categoria" onPress={handleAddCategory} />

      <Text>Selecionar Categoria</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Button title={item} onPress={() => setSelectedCategory(item)} color={selectedCategory === item ? 'blue' : 'gray'} />
        )}
      />

      {selectedCategory && (
        <>
          <Text>Adicionar Serviço para {selectedCategory}</Text>
          <TextInput
            placeholder="Nome do Serviço"
            value={newService}
            onChangeText={setNewService}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <Button title="Adicionar Serviço" onPress={handleAddService} />
        </>
      )}
    </View>
  );
};

export default AdminScreen;
