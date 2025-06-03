import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  RefreshControl 
} from 'react-native';
import { useEventsStore } from '@/store/eventsStore';
import { EventCard } from '@/components/EventCard';
import { colors } from '@/constants/colors';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  
  const { events, favoriteEventIds, fetchEvents, isLoading } = useEventsStore();
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };
  
  const favoriteEvents = events.filter(event => 
    favoriteEventIds.includes(event.id)
  );
  
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Heart size={64} color={colors.lightGray} />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptyText}>
        Save your favorite events to find them easily later
      </Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteEvents}
        renderItem={({ item }) => (
          <EventCard 
            event={item} 
            isFavorite={true}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    lineHeight: 22,
  },
});