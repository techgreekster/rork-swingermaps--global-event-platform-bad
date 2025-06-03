import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Event } from '@/types';
import { useEventsStore } from '@/store/eventsStore';

interface EventCardProps {
  event: Event;
  isFavorite?: boolean;
  variant?: 'default' | 'compact';
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  isFavorite = false,
  variant = 'default'
}) => {
  const router = useRouter();
  const { toggleFavorite } = useEventsStore();
  
  const handlePress = () => {
    router.push(`/event/${event.id}`);
  };
  
  const handleFavoritePress = () => {
    toggleFavorite(event.id);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  if (variant === 'compact') {
    return (
      <TouchableOpacity 
        style={styles.compactContainer} 
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: event.images[0] }} 
          style={styles.compactImage}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={1}>{event.title}</Text>
          <Text style={styles.compactDate}>{formatDate(event.date)}</Text>
          <View style={styles.compactFooter}>
            <Text style={styles.compactLocation} numberOfLines={1}>
              {event.location.city}, {event.location.state}
            </Text>
            <Text style={styles.compactPrice}>
              {event.isFree ? 'Free' : `$${event.price}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: event.images[0] }} 
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={handleFavoritePress}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Heart 
          size={24} 
          color={isFavorite ? colors.primary : colors.white} 
          fill={isFavorite ? colors.primary : 'none'} 
        />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
          <Text style={styles.price}>
            {event.isFree ? 'Free' : `$${event.price}`}
          </Text>
        </View>
        
        <View style={styles.details}>
          <Text style={styles.date}>{formatDate(event.date)} • {event.time}</Text>
          <Text style={styles.location}>
            {event.location.city}, {event.location.state}
          </Text>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.hostInfo}>
            <Text style={styles.hostText}>By {event.hostName}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{event.rating.toFixed(1)}</Text>
              <Text style={styles.ratingCount}>({event.reviews.length})</Text>
            </View>
          </View>
          
          <View style={styles.tagsContainer}>
            {event.tags.slice(0, 2).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  details: {
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: colors.darkGray,
  },
  footer: {
    marginTop: 8,
  },
  hostInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hostText: {
    fontSize: 14,
    color: colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  ratingCount: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: colors.darkGray,
  },
  
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    height: 100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  compactImage: {
    width: 100,
    height: '100%',
  },
  compactContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  compactDate: {
    fontSize: 14,
    color: colors.darkGray,
  },
  compactFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactLocation: {
    fontSize: 14,
    color: colors.darkGray,
    flex: 1,
    marginRight: 8,
  },
  compactPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});