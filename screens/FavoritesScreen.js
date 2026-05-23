import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FavoritesContext, DestinationCard, sharedStyles, THEME } from './index';

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFavorite } = React.useContext(FavoritesContext);

  const renderItem = ({ item }) => (
    <View style={{ position: 'relative' }}>
      <DestinationCard
        item={item}
        onPress={() => navigation.navigate('FavDetail', { destination: item })}
      />
      {/* Tombol hapus */}
      <TouchableOpacity
        onPress={() => removeFavorite(item.id)}
        style={styles.removeBtn}
      >
        <Ionicons name="trash-outline" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.bg} />
      {favorites.length === 0 ? (
        <View style={sharedStyles.emptyState}>
          <Text style={{ fontSize: 48 }}>💔</Text>
          <Text style={sharedStyles.emptyText}>Belum ada favorit tersimpan</Text>
          <Text style={styles.hint}>
            Tap ikon hati di halaman detail untuk menyimpan
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={sharedStyles.homeHeader}>
              <Text style={sharedStyles.homeSubtitle}>
                {favorites.length} destinasi tersimpan
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  removeBtn: {
    position: 'absolute',
    top: 12,
    right: 24,
    backgroundColor: THEME.danger,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    color: THEME.textLight,
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
});