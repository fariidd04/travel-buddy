// ======= Shared: Theme, Data, Context =======
import React from 'react';
import { StyleSheet } from 'react-native';

// ======= THEME =======
export const THEME = {
  primary: '#00b894',
  primaryDark: '#00896e',
  accent: '#fdcb6e',
  bg: '#f8faf9',
  card: '#ffffff',
  textDark: '#1a2e25',
  textMid: '#4a6358',
  textLight: '#8fa89e',
  danger: '#e17055',
};

// ======= DESTINATIONS DATA =======
export const destinations = [
  {
    id: 1,
    name: 'Bali',
    location: 'Bali, Indonesia',
    price: 'Rp 1.500.000 / malam',
    rating: 4.8,
    description:
      'Pulau Dewata dengan pantai eksotis, sawah terasering, dan pura bersejarah. Nikmati sunset di Tanah Lot dan kultur unik Bali yang memukau.',
    image: require('../assets/bali.jpg'),
    category: 'Pantai',
  },
  {
    id: 2,
    name: 'Jakarta',
    location: 'DKI Jakarta, Indonesia',
    price: 'Rp 900.000 / malam',
    rating: 3.9,
    description:
      'Ibu kota Indonesia dengan kehidupan malam seru, kuliner beragam, dan pusat perbelanjaan modern. Kunjungi Kota Tua dan Museum Nasional.',
    image: require('../assets/jakarta.jpg'),
    category: 'Kota',
  },
  {
    id: 3,
    name: 'Yogyakarta',
    location: 'DIY Yogyakarta, Indonesia',
    price: 'Rp 600.000 / malam',
    rating: 4.7,
    description:
      'Kota budaya dengan sejarah panjang. Jelajahi Keraton Yogyakarta, Candi Borobudur, dan Candi Prambanan yang menakjubkan.',
    image: require('../assets/yogyakarta.jpg'),
    category: 'Budaya',
  },
  {
    id: 4,
    name: 'Lombok',
    location: 'NTB, Indonesia',
    price: 'Rp 1.200.000 / malam',
    rating: 4.6,
    description:
      'Surga tersembunyi dengan pantai berpasir putih, Gili Islands yang menawan, dan Gunung Rinjani yang gagah untuk para pendaki.',
    image: require('../assets/lombok.jpg'),
    category: 'Pantai',
  },
  {
    id: 5,
    name: 'Raja Ampat',
    location: 'Papua Barat, Indonesia',
    price: 'Rp 3.000.000 / malam',
    rating: 4.9,
    description:
      'Surga bawah laut terbaik di dunia. Snorkeling dan diving di antara ribuan pulau dengan keanekaragaman hayati laut yang luar biasa.',
    image: require('../assets/rajaampat.jpg'),
    category: 'Alam',
  },
  {
    id: 6,
    name: 'Labuan Bajo',
    location: 'NTT, Indonesia',
    price: 'Rp 1.800.000 / malam',
    rating: 4.7,
    description:
      'Gerbang menuju Taman Nasional Komodo. Saksikan komodo, snorkeling di perairan biru jernih, dan sunset memukau di atas kapal.',
    image: require('../assets/labuanbajo.jpg'),
    category: 'Alam',
  },
  {
    id: 7,
    name: 'Bromo',
    location: 'Jawa Timur, Indonesia',
    price: 'Rp 700.000 / malam',
    rating: 4.5,
    description:
      'Gunung berapi aktif dengan lautan pasir yang epik. Saksikan sunrise spektakuler dari puncak Penanjakan — pengalaman yang tidak terlupakan.',
    image: require('../assets/bromo.jpg'),
    category: 'Petualangan',
  },
  {
    id: 8,
    name: 'Manado',
    location: 'Sulawesi Utara, Indonesia',
    price: 'Rp 1.100.000 / malam',
    rating: 4.4,
    description:
      'Kota di tepi Pasifik dengan Taman Laut Bunaken yang legendaris. Diving world-class, kuliner seafood segar, dan keramahan warga lokal.',
    image: require('../assets/manado.jpg'),
    category: 'Pantai',
  },
  {
    id: 9,
    name: 'Medan',
    location: 'Sumatera Utara, Indonesia',
    price: 'Rp 550.000 / malam',
    rating: 5.0,
    description:
      'Kota terbesar ketiga Indonesia dengan kuliner legendaris seperti Mie Aceh dan Soto Medan. Kunjungi Masjid Raya Al-Mashun yang megah, Istana Maimun, dan nikmati durian Medan yang terkenal di seluruh nusantara.',
    image: require('../assets/medan.jpg'),
    category: 'Kota',
  },
];

// ======= FAVORITES CONTEXT =======
export const FavoritesContext = React.createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = React.useState([]);

  const addFavorite = (destination) => {
    setFavorites((prev) => {
      if (prev.find((f) => f.id === destination.id)) return prev;
      return [...prev, destination];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// ======= SHARED STYLES =======
export const sharedStyles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e0ebe5',
  },
  cardBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#00b894',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  cardBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
  },
  cardName: { fontSize: 17, fontWeight: '700', color: '#1a2e25', marginBottom: 4 },
  cardLocation: { fontSize: 12, color: '#4a6358' },
  cardRight: { alignItems: 'flex-end', minWidth: 110 },
  cardRating: { fontSize: 13, fontWeight: '600', color: '#1a2e25', marginBottom: 4 },
  cardPrice: { fontSize: 11, color: '#00b894', fontWeight: '600', textAlign: 'right' },
  homeHeader: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 8 },
  homeTitle: { fontSize: 26, fontWeight: '800', color: '#1a2e25', marginBottom: 4 },
  homeSubtitle: { fontSize: 14, color: '#4a6358', marginBottom: 8 },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyText: { fontSize: 15, color: '#4a6358', textAlign: 'center', fontWeight: '500' },
});

// ======= DESTINATION CARD COMPONENT =======
import { View, Text, TouchableOpacity, Image } from 'react-native';

// Helper: resolve image source — supports both URI string & local require()
function resolveImageSource(image) {
  return typeof image === 'string' ? { uri: image } : image;
}

export function DestinationCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={sharedStyles.card} activeOpacity={0.85}>
      <Image source={resolveImageSource(item.image)} style={sharedStyles.cardImage} />
      <View style={sharedStyles.cardBadge}>
        <Text style={sharedStyles.cardBadgeText}>{item.category}</Text>
      </View>
      <View style={sharedStyles.cardBody}>
        <View style={{ flex: 1 }}>
          <Text style={sharedStyles.cardName}>{item.name}</Text>
          <Text style={sharedStyles.cardLocation}>📍 {item.location}</Text>
        </View>
        <View style={sharedStyles.cardRight}>
          <Text style={sharedStyles.cardRating}>⭐ {item.rating}</Text>
          <Text style={sharedStyles.cardPrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}