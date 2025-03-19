import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
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
  icon: Yup.string().required('O ícone é obrigatório'),
});

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
  "arrow-redo-sharp", "arrow-undo", "arrow-undo-circle", "arrow-undo-circle-outline", 
  "arrow-undo-circle-sharp", "arrow-undo-outline", "arrow-undo-sharp", 
  "arrow-up-circle-outline", "arrow-up-circle-sharp", "arrow-up-outline", "arrow-up-sharp", 
  "at-circle", "at-circle-outline", "at-circle-sharp", "at-outline", "at-sharp", "attach", 
  "attach-outline", "attach-sharp", "backspace-outline", "backspace-sharp", "bag", 
  "bag-add", "bag-add-outline", "bag-add-sharp", "bag-check", "bag-check-outline", 
  "bag-check-sharp", "bag-handle", "bag-handle-outline", "bag-handle-sharp", "bag-outline", 
  "bag-remove", "bag-remove-outline", "bag-remove-sharp", "bag-sharp", "balloon", 
  "balloon-outline", "balloon-sharp", "ban-outline", "ban-sharp", "bandage-outline", 
  "bandage-sharp", "bar-chart-outline", "bar-chart-sharp", "barbell", "barbell-outline", 
  "barbell-sharp", "barcode-outline", "barcode-sharp", "baseball-outline", "baseball-sharp", 
  "basket", "basket-outline", "basket-sharp", "basketball-outline", "basketball-sharp", 
  "battery-charging-outline", "battery-charging-sharp", "battery-dead", "battery-dead-outline", 
  "battery-dead-sharp", "battery-full-outline", "battery-full-sharp", "battery-half-outline", 
  "battery-half-sharp", "beaker", "beaker-outline", "beaker-sharp", "bed-outline", 
  "bed-sharp", "beer-outline", "beer-sharp", "bicycle-outline", "bicycle-sharp", 
  "bluetooth-outline", "bluetooth-sharp", "boat", "boat-outline", "boat-sharp", 
  "body-outline", "body-sharp", "bonfire", "bonfire-outline", "bonfire-sharp", 
  "book-outline", "book-sharp", "bookmark-outline", "bookmark-sharp", "bookmarks-outline", 
  "bookmarks-sharp", "bowling-ball-outline", "bowling-ball-sharp", "briefcase-outline", 
  "briefcase-sharp", "browsers", "browsers-outline", "browsers-sharp", "brush-outline", 
  "brush-sharp", "bug-outline", "bug-sharp", "build", "build-outline", "build-sharp", 
  "bulb", "bulb-outline", "bulb-sharp", "bus-outline", "bus-sharp", "business", 
  "business-outline", "business-sharp", "cafe", "cafe-outline", "cafe-sharp", 
  "calculator-outline", "calculator-sharp", "calendar-clear", "calendar-clear-outline", 
  "calendar-clear-sharp", "calendar-number", "calendar-number-outline", 
  "calendar-number-sharp", "calendar-outline", "calendar-sharp", "call", "call-outline", 
  "call-sharp", "camera-outline", "camera-reverse", "camera-reverse-outline", 
  "camera-reverse-sharp", "camera-sharp", "car-outline", "car-sharp", "car-sport", 
  "car-sport-outline", "car-sport-sharp", "card", "card-outline", "card-sharp", 
  "caret-back", "caret-back-circle", "caret-back-circle-outline", "caret-back-circle-sharp", 
  "caret-back-outline", "caret-back-sharp", "caret-down-circle", "caret-down-circle-outline", 
  "caret-down-circle-sharp", "caret-down-outline", "caret-down-sharp", "caret-forward", 
  "caret-forward-circle", "caret-forward-circle-outline", "caret-forward-circle-sharp", 
  "caret-forward-outline", "caret-forward-sharp", "caret-up-circle", 
  "caret-up-circle-outline", "caret-up-circle-sharp", "caret-up-outline", "caret-up-sharp", 
  "cart-outline", "cart-sharp", "cash", "cash-outline", "cash-sharp", "cellular", 
  "cellular-outline", "cellular-sharp", "chatbox", "chatbox-ellipses", 
  "chatbox-ellipses-outline", "chatbox-ellipses-sharp", "chatbox-outline", "chatbox-sharp", 
  "chatbubble", "chatbubble-ellipses", "chatbubble-ellipses-outline", 
  "chatbubble-ellipses-sharp", "chatbubble-outline", "chatbubble-sharp", "chatbubbles", 
  "chatbubbles-outline", "chatbubbles-sharp", "checkbox-outline", "checkbox-sharp", 
  "checkmark", "checkmark-circle", "checkmark-circle-outline", "checkmark-circle-sharp", 
  "checkmark-done", "checkmark-done-circle", "checkmark-done-circle-outline", 
  "checkmark-done-circle-sharp", "checkmark-done-outline", "checkmark-done-sharp", 
  "checkmark-outline", "checkmark-sharp", "chevron-back", "chevron-back-circle", 
  "chevron-back-circle-outline", "chevron-back-circle-sharp", "chevron-back-outline", 
  "chevron-back-sharp", "chevron-collapse", "chevron-collapse-outline", 
  "chevron-collapse-sharp", "chevron-down-circle", "chevron-down-circle-outline", 
  "chevron-down-circle-sharp", "chevron-down-outline", "chevron-down-sharp", 
  "chevron-expand", "chevron-expand-outline", "chevron-expand-sharp", "chevron-forward", 
  "chevron-forward-circle", "chevron-forward-circle-outline", "chevron-forward-circle-sharp", 
  "chevron-forward-outline", "chevron-forward-sharp", "chevron-up-circle", 
  "chevron-up-circle-outline", "chevron-up-circle-sharp", "chevron-up-outline", 
  "chevron-up-sharp", "clipboard-outline", "clipboard-sharp", "close-circle", 
  "close-circle-outline", "close-circle-sharp", "close-outline", "close-sharp", 
  "cloud-circle", "cloud-circle-outline", "cloud-circle-sharp", "cloud-done", 
  "cloud-done-outline", "cloud-done-sharp", "cloud-download-outline", 
  "cloud-download-sharp", "cloud-offline", "cloud-offline-outline", "cloud-offline-sharp", 
  "cloud-outline", "cloud-sharp", "cloud-upload-outline", "cloud-upload-sharp", 
  "cloudy-night", "cloudy-night-outline", "cloudy-night-sharp", "cloudy-outline", 
  "cloudy-sharp", "code-download", "code-download-outline", "code-download-sharp", 
  "code-outline", "code-sharp", "code-slash", "code-slash-outline", "code-slash-sharp", 
  "code-working", "code-working-outline", "code-working-sharp", "cog-outline", 
  "cog-sharp", "color-fill", "color-fill-outline", "color-fill-sharp", "color-filter", 
  "color-filter-outline", "color-filter-sharp", "color-palette", "color-palette-outline", 
  "color-palette-sharp", "color-wand", "color-wand-outline", "color-wand-sharp", 
  "compass-outline", "compass-sharp", "construct", "construct-outline", "construct-sharp", 
  "contract", "contract-outline", "contract-sharp", "contrast-outline", "contrast-sharp", 
  "copy-outline", "copy-sharp", "create", "create-outline", "create-sharp", "crop-outline", 
  "crop-sharp", "cube-outline", "cube-sharp", "cut-outline", "cut-sharp", "desktop-outline", 
  "desktop-sharp", "diamond-outline", "diamond-sharp", "dice-outline", "dice-sharp", 
  "disc-outline", "disc-sharp", "document-attach", "document-attach-outline", 
  "document-attach-sharp", "document-lock", "document-lock-outline", "document-lock-sharp", 
  "document-outline", "document-sharp", "document-text", "document-text-outline", 
  "document-text-sharp", "documents-outline", "documents-sharp", "download-outline", 
  "download-sharp", "duplicate", "duplicate-outline", "duplicate-sharp", "ear", 
  "ear-outline", "ear-sharp", "earth-outline", "earth-sharp", "easel", "easel-outline", 
  "easel-sharp", "egg-outline", "egg-sharp", "ellipse-outline", "ellipse-sharp", 
  "ellipsis-horizontal", "ellipsis-horizontal-circle", "ellipsis-horizontal-circle-outline" 
];

const CreateCategory = () => {
  const [image, setImage] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const navigation = useNavigation();

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

  const handleSaveCategory = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('isActive', values.isActive);
    formData.append('icon', values.icon);

    if (values.img) {
      formData.append('img', {
        uri: values.img,
        type: 'image/jpeg',
        name: 'category.jpg',
      });
    }

    try {
      await api.post('/categories/', values);
      Toast.show({
        type: 'success',
        text1: 'Categoria adicionada com sucesso!',
        text1Style: { color: 'green', fontSize: 16 },
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao adicionar categoria',
        text2: error.response?.data?.message || 'Tente novamente mais tarde.',
        text2Style: { color: 'red', fontSize: 16 },
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Adicionar categoria</Text>
        <Formik
          initialValues={{ name: '', description: '', isActive: true, img: null, icon: selectedIcon }}
          validationSchema={validationSchema}
          onSubmit={handleSaveCategory}
        >
          {({ handleChange, handleSubmit, values, setFieldValue, errors, touched, isValid }) => (
            <View style={styles.formWrapper}>
              {/* Nome da categoria */}
              <View style={styles.wrapper}>
                <Text style={styles.label}>Nome da categoria</Text>
                <View style={[styles.inputWrapper, { borderColor: touched.name ? '#2D388A' : '#ccc' }]}>
                  <Ionicons name="pricetag" size={20} color="black" style={styles.iconStyle} />
                  <TextInput
                    placeholder="Nome da categoria"
                    style={styles.input}
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                </View>
                {touched.name && errors.name && <Text style={styles.errorMessage}>{errors.name}</Text>}
              </View>

              {/* Descrição */}
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

              {/* Seletor de ícones */}
              <View style={styles.wrapper}>
                <Text style={styles.label}>Ícone</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {iconList.map((icon) => (
                    <TouchableOpacity
                      key={icon}
                      style={[styles.iconButton, { borderColor: selectedIcon === icon ? '#2D388A' : '#ccc' }]}
                      onPress={() => {
                        setSelectedIcon(icon);
                        setFieldValue('icon', icon);
                      }}
                    >
                      <Ionicons name={icon} size={30} color={selectedIcon === icon ? '#2D388A' : 'black'} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {touched.icon && errors.icon && <Text style={styles.errorMessage}>{errors.icon}</Text>}
              </View>

              {/* Imagem */}
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

              {/* Botão salvar */}
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: isValid ? '#2D388A' : '#ccc' }]}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Ionicons name="save" size={24} color="white" />
                <Text style={styles.saveButtonText}>Salvar categoria</Text>
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
  iconButton: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
  },
});

export default CreateCategory;
