import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, 
  Alert, StyleSheet, SafeAreaView, RefreshControl 
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import api from '../hooks/createConnectionApi';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get('/categories');
      setCategories(response.data?.categories || []);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as categorias');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  const handleDeleteCategory = async (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir esta categoria?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          onPress: async () => {
            try {
              await api.delete(`/categories/${id}`);
              Alert.alert("Sucesso", "Categoria removida!");
              fetchCategories();
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível excluir a categoria.");
            }
          }
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCategories();
  };

  const renderIcon = (iconName) => {
    // Check if the icon name is valid, if not fallback to a default icon
    try {
      return <Ionicons name={iconName} size={24} color="white" />;
    } catch (error) {
      console.error('Invalid icon name', iconName);
      return <Ionicons name="help-circle" size={24} color="white" />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Gerenciar Categorias</Text>
        </View>

        {/* Carregamento */}
        {loading ? (
          <ActivityIndicator size="large" color="#2D388A" />
        ) : (
          <View style={styles.tableContainer}>
            {/* Cabeçalho da Tabela */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>Icon</Text>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>Nome</Text>
              <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "center" }]}>Ações</Text>
            </View>

            {/* Lista de Categorias */}
            <FlatList
              data={categories}
              keyExtractor={(item) => item._id}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 2 }]}>
                  <Ionicons name={item.icon} size={20} color="black" style={{ marginHorizontal: 10 }} />

                  </Text>

                  <Text style={[styles.tableCell, { flex: 2 }]}>{item.name}</Text>
                  
                  <View style={[styles.tableCell, { flex: 1, flexDirection: 'row', justifyContent: "center" }]}>
                    {/* Botão Editar */}
                    <TouchableOpacity onPress={() => navigation.navigate('EditCategory', { category: item })}>
                      <Ionicons name="pencil" size={20} color="green" style={{ marginHorizontal: 10 }} />
                    </TouchableOpacity>

                    {/* Botão Excluir */}
                    <TouchableOpacity onPress={() => handleDeleteCategory(item._id)}>
                      <Ionicons name="trash" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        )}

        {/* Botão de Adicionar Nova Categoria */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateCategory')}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>Adicionar categoria</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D388A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D388A',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2D388A',
    padding: 10,
    borderRadius: 5,
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 16,
    paddingHorizontal: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D388A',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default ManageCategories;
