import React, { useState } from 'react'; 
import { View, Text, Button, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, updateProfile } from '../store/actions/userActions';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');
  const [photo, setPhoto] = useState(user?.photo || '');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleUpdateProfile = () => {
    dispatch(updateProfile({ name, location, photo }));
    Alert.alert("Perfil Atualizado!", "Suas informações foram salvas.");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: photo || 'https://via.placeholder.com/150' }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
        />
        <Text>Mudar Foto</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, width: '100%', marginBottom: 10 }}
      />

      <TextInput
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
        style={{ borderBottomWidth: 1, width: '100%', marginBottom: 10 }}
      />

      <Button title="Atualizar Perfil" onPress={handleUpdateProfile} />
      <Button title="Logout" color="red" onPress={handleLogout} />

    
        <View style={{ marginTop: 20 }}>
          <Button title="Gerenciar Categorias" onPress={() => navigation.navigate('ManageCategories')} />
          <Button title="Gerenciar Serviços" onPress={() => navigation.navigate('ManageServices')} style={{ marginTop: 10 }} />
        </View>
    </View>
  );
};

export default ProfileScreen;