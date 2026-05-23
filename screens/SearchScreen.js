import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { destinations, DestinationCard, sharedStyles, THEME } from './index';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [searched, setSearched] = React.useState(false);

  const handleSearch = (query) => {
    const q = query.toLowerCase().trim();
    setSearchQuery(query);
    if (q.length > 0) {
      const filtered = destinations.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q)
      );
      setResults(filtered);
      setSearched(true);
    } else {
      setResults([]);
      setSearched(false);
    }
  };

  const renderItem = ({ item }) => (
    <DestinationCard
      item={item}
      onPress={() => navigation.navigate('SearchResultDetail', { destination: item })}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.bg} />

      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={THEME.textLight} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Cari nama, lokasi, atau kategori..."
            placeholderTextColor={THEME.textLight}
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.searchInput}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={18} color={THEME.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* States */}
      {!searched ? (
        <View style={sharedStyles.emptyState}>
          <Text style={{ fontSize: 48 }}>🗺️</Text>
          <Text style={sharedStyles.emptyText}>Ketik nama destinasi untuk mulai mencari</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={sharedStyles.emptyState}>
          <Text style={{ fontSize: 48 }}>😕</Text>
          <Text style={sharedStyles.emptyText}>Tidak ada hasil untuk "{searchQuery}"</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={
            <Text style={styles.resultCount}>{results.length} hasil ditemukan</Text>
          }
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchHeader: { padding: 16, paddingTop: 20 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 14, color: THEME.textDark, padding: 0 },
  resultCount: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    fontSize: 13,
    color: THEME.textMid,
    fontWeight: '600',
  },
});