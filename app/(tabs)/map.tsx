import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { List, MapPin } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { MapView } from '@/components/MapView';
import { SearchBar } from '@/components/SearchBar';
import { EventCard } from '@/components/EventCard';
import { useEventsStore } from '@/store/eventsStore';

const { width } = Dimensions.get('window');

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  
  const router = useRouter();
  const { events, favoriteEventIds, fetchEvents } = useEventsStore();
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const handleMarkerPress = (eventId: string) => {
    setSelectedEventId(eventId);
  };
  
  const handleEventPress = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };
  
  const handleSearch = () => {
    // In a real app, this would filter events on the map
    console.log('Search for:', searchQuery);
  };
  
  const selectedEvent = events.find(event => event.id === selectedEventId);
  
  const mapMarkers = events.map(event => ({
    id: event.id,
    coordinate: event.location.coordinates,
    title: event.title,
  }));
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
          placeholder="Search locations..."
          style={styles.searchBar}
        />
        <TouchableOpacity style={styles.listButton}>
          <List size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        markers={mapMarkers}
        onMarkerPress={handleMarkerPress}
      />
      
      {selectedEvent && (
        <TouchableOpacity 
          style={styles.eventPreview}
          onPress={() => handleEventPress(selectedEvent.id)}
          activeOpacity={0.9}
        >
          <EventCard 
            event={selectedEvent} 
            variant="compact"
            isFavorite={favoriteEventIds.includes(selectedEvent.id)}
          />
        </TouchableOpacity>
      )}
      
      {Platform.OS === 'web' && (
        <View style={styles.webNotice}>
          <MapPin size={20} color={colors.white} />
          <Text style={styles.webNoticeText}>
            Full map functionality is available in the mobile app
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  searchBar: {
    flex: 1,
    marginRight: 12,
  },
  listButton: {
    backgroundColor: colors.white,
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  map: {
    flex: 1,
  },
  eventPreview: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  webNotice: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webNoticeText: {
    color: colors.white,
    marginLeft: 8,
    fontSize: 14,
  },
});