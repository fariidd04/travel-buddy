import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SearchScreen from './screens/SearchScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import FavoritesScreen from './screens/FavoritesScreen';

// Shared: Context & Theme
import { FavoritesProvider, FavoritesContext, THEME } from './screens/index';

// ======= Navigators =======
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Header options yang konsisten
const headerOptions = {
  headerStyle: { backgroundColor: THEME.primary },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' },
};

// ======= Home Stack =======
function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Travel Buddy 🌏' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Destinasi' }} />
    </Stack.Navigator>
  );
}

// ======= Search Stack =======
function SearchStackNavigator() {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Cari Destinasi 🔍' }} />
      <Stack.Screen name="SearchResultDetail" component={SearchResultScreen} options={{ title: 'Detail Destinasi' }} />
    </Stack.Navigator>
  );
}

// ======= Favorites Stack =======
function FavoritesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorit Saya ❤️' }} />
      <Stack.Screen name="FavDetail" component={DetailScreen} options={{ title: 'Detail Destinasi' }} />
    </Stack.Navigator>
  );
}

// ======= Bottom Tab Navigator =======
function TabNavigator() {
  const { favorites } = React.useContext(FavoritesContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = 'home';
          if (route.name === 'SearchTab') iconName = 'search';
          if (route.name === 'FavoritesTab') iconName = 'heart';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: THEME.primary,
        tabBarInactiveTintColor: THEME.textLight,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e8f0ec',
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="SearchTab" component={SearchStackNavigator} options={{ title: 'Cari' }} />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStackNavigator}
        options={{
          title: 'Favorit',
          tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
          tabBarBadgeStyle: { backgroundColor: THEME.danger, color: '#fff', fontSize: 10 },
        }}
      />
    </Tab.Navigator>
  );
}

// ======= Root App =======
export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
}