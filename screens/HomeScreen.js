import React from 'react';
import { View, Text, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { destinations, DestinationCard, sharedStyles, THEME } from './index';

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <DestinationCard
      item={item}
      onPress={() => navigation.navigate('Detail', { destination: item })}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.bg} />
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={sharedStyles.homeHeader}>
            <Text style={sharedStyles.homeTitle}>Jelajahi Indonesia 🇮🇩</Text>
            <Text style={sharedStyles.homeSubtitle}>
              {destinations.length} destinasi menakjubkan
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}