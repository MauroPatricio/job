import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavegation from './navegation/BottomTabNavegation';
import { store } from './store';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookingScreen from './screens/BookingScreen';
import ServiceDetailsScreen from './screens/ServiceDetailsScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ServicesScreen from './screens/ServicesScreen';
import ManageServices from './components/ManageServices';
import ManageCategories from './components/ManageCategories.jsx';
import CreateCategory from './components/CreateCategory';
import EditCategory from './components/EditCategory';
import EditService from './components/EditService';
import CreateService from './components/CreateService';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="Bottom Navigation"
                component={BottomTabNavegation}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Bookings" component={BookingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Admin" component={ServiceDetailsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ManageCategories" component={ManageCategories} options={{ headerShown: false }} />
              <Stack.Screen name="CreateCategory" component={CreateCategory} options={{ headerShown: false }} />
              <Stack.Screen name="EditCategory" component={EditCategory} options={{ headerShown: false }} />

              <Stack.Screen name="ManageServices" component={ManageServices} options={{ headerShown: false }} />
              <Stack.Screen name="CreateService" component={CreateService} options={{ headerShown: false }} />
              <Stack.Screen name="EditService" component={EditService} options={{ headerShown: false }} />

              <Stack.Screen name="ServicesScreen" component={ServicesScreen} options={{ headerShown: false }} />

              
            </Stack.Navigator>
          </KeyboardAvoidingView>

          <Toast />
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  );
}
