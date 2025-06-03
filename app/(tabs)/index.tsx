import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, Filter } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { SearchBar } from '@/components/SearchBar';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/Button';
import { useEventsStore } from '@/store/eventsStore';
import { useAuthStore } from '@/store/authStore';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  const router = useRouter();
  const { events, favoriteEventIds, fetchEvents, isLoading } = useEventsStore();
  const { user } = useAuthStore();
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };
  
  const featuredEvents = events.slice(0, 2);
  const upcomingEvents = events.slice(0, 3);
  const popularEvents = [...events].sort((a, b) => b.attendees - a.attendees).slice(0, 3);
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search',
        params: { query: searchQuery }
      });
    }
  };
  
  const handleCreateEvent = () => {
    router.push('/host/create-event');
  };
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] || 'there'}!</Text>
        <Text style={styles.subtitle}>Find your next swinger event</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
          style={styles.searchBar}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      {user?.isHost && (
        <View style={styles.hostSection}>
          <Button
            title="Create New Event"
            onPress={handleCreateEvent}
            icon={<Plus size={20} color={colors.white} />}
          />
        </View>
      )}
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Events</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {featuredEvents.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            isFavorite={favoriteEventIds.includes(event.id)}
          />
        ))}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {upcomingEvents.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            variant="compact"
            isFavorite={favoriteEventIds.includes(event.id)}
          />
        ))}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Events</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {popularEvents.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            variant="compact"
            isFavorite={favoriteEventIds.includes(event.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.darkGray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    marginRight: 12,
  },
  filterButton: {
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
  hostSection: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
});