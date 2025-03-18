import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookingScreen from '../screens/BookingScreen';

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70,
        backgroundColor: "#fff"
    }
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? "home" : "home-outline"} size={24} color={focused ? '#2D388A' : "black"} />
        ) }}
      />

      <Tab.Screen name="Explore" component={ExploreScreen}
        options={{ tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? "compass" : "compass-outline"} size={24} color={focused ? '#2D388A' : "black"} />
        ) }}
      />

      <Tab.Screen name="Bookings" component={BookingScreen}
        options={{ tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? "calendar" : "calendar-outline"} size={24} color={focused ? '#2D388A' : "black"} />
        ) }}
      />

      <Tab.Screen name="Notifications" component={NotificationsScreen}
        options={{ tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? "notifications" : "notifications-outline"} size={24} color={focused ? '#2D388A' : "black"} />
        ) }}
      />

      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{ tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? "person" : "person-outline"} size={24} color={focused ? '#2D388A' : "black"} />
        ) }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
