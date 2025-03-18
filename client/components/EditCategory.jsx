import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../hooks/createConnectionApi';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  isActive: Yup.boolean(),
  img: Yup.string(),
  icon: Yup.string(),
});

const EditCategory = () => {
  const [image, setImage] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params; // Get category from navigation parameters

  useEffect(() => {
    if (category?.img) {
      setImage(category.img); // Set the existing image if there is one
    }
    if (category?.icon) {
      setSelectedIcon(category.icon); // Set the existing icon if there is one
    }
  }, [category]);

  const pickImage = async (setFieldValue) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFieldValue('img', result.assets[0].uri);
    }
  };

  const handleUpdateCategory = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('isActive', values.isActive);

    if (values.img) {
      formData.append('img', {
        uri: values.img,
        type: 'image/jpeg',
        name: 'category.jpg',
      });
    }
    
    if (values.icon) {
      formData.append('icon', values.icon);
    }

    try {
      await api.put(`/categories/${category.id}`, formData); // Assuming the category has an `id`
      Toast.show({
        type: 'success',
        text1: 'Categoria atualizada com sucesso!',
        text1Style: { color: 'green', fontSize: 16 },
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar categoria',
        text2: error.response?.data?.message || 'Tente novamente mais tarde.',
        text2Style: { color: 'red', fontSize: 16 },
      });
    }
  };

  const iconList = [ 
        "link", "search", "image", "text", "alert", "checkbox", "menu", "radio", "timer", "close", 
        "book", "pause", "mail", "home", "laptop", "star", "filter", "save", "cloud", "eye", 
        "camera", "enter", "heart", "calculator", "download", "play", "calendar", "barcode", 
        "hourglass", "key", "flag", "car", "man", "gift", "wallet", "woman", "earth", "wifi", 
        "sync", "warning", "archive", "arrow-down", "arrow-up", "bookmark", "bookmarks", 
        "briefcase", "brush", "bug", "chevron-down", "chevron-up", "clipboard", "code", "cog", 
        "compass", "copy", "crop", "document", "documents", "flash", "flashlight", "flower", 
        "folder", "funnel", "game-controller", "globe", "grid", "help", "images", "language", 
        "layers", "leaf", "list", "location", "lock-open", "log-out", "magnet", "map", "medal", 
        "megaphone", "mic", "moon", "notifications-off", "paper-plane", "pencil", "pie-chart", 
        "pin", "print", "rocket", "share", "shield", "shuffle", "stopwatch", "thermometer", 
        "thumbs-down", "thumbs-up", "ticket", "trash", "trophy", "tv", "water", "cart", "refresh", 
        "alert-circle", "aperture", "arrow-down-circle", "arrow-up-circle", "bar-chart", 
        "battery-charging", "bluetooth", "disc", "eye-off", "film", "git-branch", "git-commit", 
        "git-merge", "git-pull-request", "help-circle", "log-in", "mic-off", "move", "pause-circle", 
        "play-circle", "power", "repeat", "send", "server", "settings", "square", "stop-circle", 
        "terminal", "trending-down", "trending-up", "triangle", "umbrella", "watch", "remove", 
        "volume-off", "stop", "ban", "expand", "folder-open", "star-half", "flask", "cut", 
        "caret-down", "caret-up", "cloud-download", "cloud-upload", "medkit", "beer", "desktop", 
        "unlink", "female", "male", "paw", "cube", "at", "bicycle", "bus", "diamond", "transgender", 
        "bed", "train", "subway", "battery-full", "battery-half", "id-card", "body", "time", 
        "ellipse", "newspaper", "backspace", "bowling-ball", "dice", "egg", "fish", "glasses", 
        "hammer", "headset", "ice-cream", "receipt", "ribbon", "school", "shapes", "skull", 
        "volume-mute", "bandage", "baseball", "basketball", "ellipsis-vertical", "football", 
        "person", "shirt", "volume-high", "volume-low", "navigate", "cloudy", "snow", "pulse", 
        "contrast", "male-female", "tablet-landscape", "tablet-portrait", "accessibility", 
        "accessibility-outline", "accessibility-sharp", "add", "add-circle", "add-circle-outline", 
        "add-circle-sharp", "add-outline", "add-sharp", "airplane", "airplane-outline", 
        "airplane-sharp", "alarm", "alarm-outline", "alarm-sharp", "albums", "albums-outline", 
        "albums-sharp", "alert-circle-outline", "alert-circle-sharp", "alert-outline", 
        "alert-sharp", "american-football", "american-football-outline", "american-football-sharp", 
        "analytics", "analytics-outline", "analytics-sharp", "aperture-outline", "aperture-sharp", 
        "apps", "apps-outline", "apps-sharp", "archive-outline", "archive-sharp", "arrow-back", 
        "arrow-back-circle", "arrow-back-circle-outline", "arrow-back-circle-sharp", 
        "arrow-back-outline", "arrow-back-sharp", "arrow-down-circle-outline", 
        "arrow-down-circle-sharp", "arrow-down-outline", "arrow-down-sharp", "arrow-forward", 
        "arrow-forward-circle", "arrow-forward-circle-outline", "arrow-forward-circle-sharp", 
        "arrow-forward-outline", "arrow-forward-sharp", "arrow-redo", "arrow-redo-circle", 
        "arrow-redo-circle-outline", "arrow-redo-circle-sharp", "arrow-redo-outline", 
        "arrow-redo-sharp", "arrow-undo", "arrow-undo-circle", "arrow-undo-circle-outline"
  ];
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Categoria</Text>
        <Formik
          initialValues={{
            name: category.name,
            description: category.description,
            isActive: category.isActive,
            img: category.img,
            icon: category.icon || '', // Add icon as part of initial values
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdateCategory}
        >
          {({ handleChange, handleSubmit, values, setFieldValue, errors, touched, isValid }) => (
            <View style={styles.formWrapper}>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Nome da Categoria</Text>
                <View style={[styles.inputWrapper, { borderColor: touched.name ? '#2D388A' : '#ccc' }]}>
                  <Ionicons name="pricetag" size={20} color="black" style={styles.iconStyle} />
                  <TextInput
                    placeholder="Nome da Categoria"
                    style={styles.input}
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                </View>
                {touched.name && errors.name && <Text style={styles.errorMessage}>{errors.name}</Text>}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Descrição</Text>
                <View style={[styles.inputWrapper, { borderColor: touched.description ? '#2D388A' : '#ccc' }]}>
                  <Ionicons name="document-text" size={20} color="black" style={styles.iconStyle} />
                  <TextInput
                    placeholder="Descrição"
                    style={[styles.input, { height: 80 }]}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    multiline
                  />
                </View>
                {touched.description && errors.description && <Text style={styles.errorMessage}>{errors.description}</Text>}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Imagem</Text>
                <TouchableOpacity
                  style={[styles.inputWrapper, { borderColor: touched.img ? '#2D388A' : '#ccc' }]}
                  onPress={() => pickImage(setFieldValue)}
                >
                  <Ionicons name="image" size={20} color="black" style={styles.iconStyle} />
                  <Text style={styles.imageUploadText}>Selecionar Imagem</Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Ícone</Text>
                <FlatList
                  data={iconList}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[styles.iconButton, { borderColor: selectedIcon === item ? '#2D388A' : '#ccc' }]}
                      onPress={() => {
                        setSelectedIcon(item);
                        setFieldValue('icon', item);
                      }}
                    >
                      <Ionicons name={item} size={30} color={selectedIcon === item ? '#2D388A' : 'black'} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item}
                  contentContainerStyle={styles.iconList}
                />
                {touched.icon && errors.icon && <Text style={styles.errorMessage}>{errors.icon}</Text>}
              </View>

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: isValid ? '#2D388A' : '#ccc' }]}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Ionicons name="save" size={24} color="white" />
                <Text style={styles.saveButtonText}>Atualizar Categoria</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#2D388A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  formWrapper: {
    width: '100%',
  },
  inputWrapper: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    elevation: 5,
  },
  input: {
    flex: 1,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  imageUploadText: {
    flex: 1,
    color: '#2D388A',
    textAlign: 'center',
    paddingVertical: 15,
  },
  iconList: {
    marginTop: 10,
    marginBottom: 20,
  },
  iconButton: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});

export default EditCategory;
