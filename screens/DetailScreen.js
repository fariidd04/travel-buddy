import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FavoritesContext, THEME } from './index';

export default function DetailScreen({ route }) {
  const { destination } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = React.useContext(FavoritesContext);
  const favorited = isFavorite(destination.id);

  // Supports URI string & local require()
  const imageSource =
    typeof destination.image === 'string'
      ? { uri: destination.image }
      : destination.image;

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(destination.id);
    } else {
      addFavorite(destination);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.bg }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image source={imageSource} style={styles.hero} />

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{destination.name}</Text>
              <Text style={styles.location}>📍 {destination.location}</Text>
            </View>
            <TouchableOpacity
              onPress={toggleFavorite}
              style={[styles.favBtn, favorited && styles.favBtnActive]}
            >
              <Ionicons
                name={favorited ? 'heart' : 'heart-outline'}
                size={24}
                color={favorited ? '#fff' : THEME.danger}
              />
            </TouchableOpacity>
          </View>

          {/* Rating & Price */}
          <View style={styles.metaRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>⭐ {destination.rating} Rating</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: '#fff9e6' }]}>
              <Text style={[styles.chipText, { color: '#b7860b' }]}>
                💰 {destination.price}
              </Text>
            </View>
          </View>

          {/* Category */}
          <View style={[styles.chip, { alignSelf: 'flex-start', marginBottom: 16 }]}>
            <Text style={styles.chipText}>🏷️ {destination.category}</Text>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Tentang Destinasi</Text>
          <Text style={styles.description}>{destination.description}</Text>

          {/* CTA Button */}
          <TouchableOpacity
            onPress={toggleFavorite}
            style={[styles.ctaBtn, favorited && styles.ctaBtnActive]}
          >
            <Ionicons
              name={favorited ? 'heart-dislike-outline' : 'heart-outline'}
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.ctaBtnText}>
              {favorited ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { width: '100%', height: 280, backgroundColor: '#e0ebe5' },
  content: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  name: { fontSize: 26, fontWeight: '800', color: THEME.textDark, marginBottom: 6 },
  location: { fontSize: 14, color: THEME.textMid },
  favBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffe8e4',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  favBtnActive: { backgroundColor: THEME.danger },
  metaRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  chip: {
    backgroundColor: '#e8f7f3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: { color: THEME.primaryDark, fontSize: 13, fontWeight: '600' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.textDark,
    marginBottom: 8,
    marginTop: 8,
  },
  description: { fontSize: 14, color: THEME.textMid, lineHeight: 22, marginBottom: 24 },
  ctaBtn: {
    backgroundColor: THEME.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
  },
  ctaBtnActive: { backgroundColor: THEME.danger },
  ctaBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});