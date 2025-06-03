import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Share,
  Platform
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Heart, 
  Share as ShareIcon, 
  Star,
  ChevronRight
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { MapView } from '@/components/MapView';
import { ReviewCard } from '@/components/ReviewCard';
import { useEventsStore } from '@/store/eventsStore';
import { useAuthStore } from '@/store/authStore';
import { Event } from '@/types';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const { fetchEventById, toggleFavorite, favoriteEventIds } = useEventsStore();
  const { user } = useAuthStore();
  
  const isFavorite = event ? favoriteEventIds.includes(event.id) : false;
  const isHost = user?.id === event?.hostId;
  
  useEffect(() => {
    const loadEvent = async () => {
      if (id) {
        const eventData = await fetchEventById(id as string);
        if (eventData) {
          setEvent(eventData);
        }
        setLoading(false);
      }
    };
    
    loadEvent();
  }, [id]);
  
  const handleFavoritePress = () => {
    if (event) {
      toggleFavorite(event.id);
    }
  };
  
  const handleSharePress = async () => {
    if (event) {
      try {
        await Share.share({
          title: event.title,
          message: `Check out this event: ${event.title} on swingerMaps!`,
          url: `https://swingermaps.com/event/${event.id}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };
  
  const handleBookPress = () => {
    if (event) {
      router.push(`/checkout/${event.id}`);
    }
  };
  
  if (loading || !event) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading event details...</Text>
      </View>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: event.images[0] }} 
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.imageActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleFavoritePress}
          >
            <Heart 
              size={24} 
              color={isFavorite ? colors.primary : colors.white} 
              fill={isFavorite ? colors.primary : 'none'} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleSharePress}
          >
            <ShareIcon size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={18} color={colors.primary} fill={colors.primary} />
          <Text style={styles.rating}>{event.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>
            ({event.reviews.length} {event.reviews.length === 1 ? 'review' : 'reviews'})
          </Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {event.isFree ? 'Free' : `$${event.price.toFixed(2)}`}
          </Text>
          {event.isPrivate && (
            <View style={styles.privateBadge}>
              <Text style={styles.privateBadgeText}>Private</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Calendar size={20} color={colors.darkGray} />
          <Text style={styles.infoText}>{formatDate(event.date)}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Clock size={20} color={colors.darkGray} />
          <Text style={styles.infoText}>{event.time}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MapPin size={20} color={colors.darkGray} />
          <Text style={styles.infoText}>
            {event.location.name}, {event.location.address}, {event.location.city}, {event.location.state}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Users size={20} color={colors.darkGray} />
          <Text style={styles.infoText}>
            {event.attendees} attending • {event.capacity} capacity
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: event.location.coordinates.latitude,
            longitude: event.location.coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          markers={[
            {
              id: event.id,
              coordinate: event.location.coordinates,
              title: event.location.name,
            }
          ]}
        />
      </View>
      
      <View style={styles.section}>
        <View style={styles.hostSection}>
          <Text style={styles.sectionTitle}>Host</Text>
          <TouchableOpacity style={styles.hostContainer}>
            <View style={styles.hostInfo}>
              <Text style={styles.hostName}>{event.hostName}</Text>
              <View style={styles.hostRating}>
                <Star size={16} color={colors.primary} fill={colors.primary} />
                <Text style={styles.hostRatingText}>{event.hostRating.toFixed(1)}</Text>
              </View>
            </View>
            <ChevronRight size={20} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.reviewsHeader}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {event.reviews.length > 0 ? (
          event.reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <Text style={styles.noReviewsText}>No reviews yet</Text>
        )}
      </View>
      
      <View style={styles.footer}>
        {isHost ? (
          <Button
            title="Edit Event"
            onPress={() => router.push(`/host/edit-event/${event.id}`)}
            style={styles.bookButton}
          />
        ) : (
          <Button
            title={event.isFree ? "Reserve Spot" : "Book Now"}
            onPress={handleBookPress}
            style={styles.bookButton}
          />
        )}
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageActions: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  privateBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  privateBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  infoSection: {
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  map: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  hostSection: {
    marginBottom: 8,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  hostRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostRatingText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 4,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  noReviewsText: {
    fontSize: 16,
    color: colors.darkGray,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bookButton: {
    width: '100%',
  },
});