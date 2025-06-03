import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  Plus,
  CheckCircle
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { useEventsStore } from '@/store/eventsStore';
import { useTicketsStore } from '@/store/ticketsStore';
import { useAuthStore } from '@/store/authStore';
import { Event } from '@/types';

export default function CheckoutScreen() {
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  
  const router = useRouter();
  const { fetchEventById } = useEventsStore();
  const { requestTicket, isLoading } = useTicketsStore();
  const { user } = useAuthStore();
  
  useEffect(() => {
    const loadEvent = async () => {
      if (eventId) {
        const eventData = await fetchEventById(eventId as string);
        if (eventData) {
          setEvent(eventData);
        }
        setLoading(false);
      }
    };
    
    loadEvent();
  }, [eventId]);
  
  const handlePaymentMethodSelect = (id: string) => {
    setSelectedPaymentMethod(id);
  };
  
  const handleAddPaymentMethod = () => {
    router.push('/settings/payment/add');
  };
  
  const handleRequestTicket = async () => {
    if (!event || !user) return;
    
    if (!event.isFree && !selectedPaymentMethod) {
      Alert.alert("Error", "Please select a payment method");
      return;
    }
    
    try {
      await requestTicket(event.id, user.id);
      
      Alert.alert(
        "Request Submitted",
        "Your ticket request has been submitted and is pending approval from the host.",
        [
          { 
            text: "OK", 
            onPress: () => router.replace('/tickets')
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to request ticket. Please try again.");
    }
  };
  
  if (loading || !event) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading checkout...</Text>
      </View>
    );
  }
  
  // Mock payment methods
  const paymentMethods = [
    {
      id: 'card1',
      type: 'card',
      last4: '4242',
      expiryDate: '04/25',
      isDefault: true,
    },
    {
      id: 'card2',
      type: 'card',
      last4: '1234',
      expiryDate: '12/26',
      isDefault: false,
    },
  ];
  
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
      <View style={styles.eventCard}>
        <Image 
          source={{ uri: event.images[0] }} 
          style={styles.eventImage}
          contentFit="cover"
        />
        
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          
          <View style={styles.infoRow}>
            <Calendar size={16} color={colors.darkGray} />
            <Text style={styles.infoText}>{formatDate(event.date)}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={16} color={colors.darkGray} />
            <Text style={styles.infoText}>{event.time}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MapPin size={16} color={colors.darkGray} />
            <Text style={styles.infoText} numberOfLines={2}>
              {event.location.name}, {event.location.city}
            </Text>
          </View>
        </View>
      </View>
      
      {!event.isFree && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity 
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedPaymentMethod === method.id && styles.selectedPaymentMethod
              ]}
              onPress={() => handlePaymentMethodSelect(method.id)}
            >
              <View style={styles.paymentMethodInfo}>
                <CreditCard size={20} color={colors.text} />
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodText}>
                    •••• {method.last4}
                  </Text>
                  <Text style={styles.paymentMethodExpiry}>
                    Expires {method.expiryDate}
                  </Text>
                </View>
              </View>
              
              {selectedPaymentMethod === method.id && (
                <CheckCircle size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity 
            style={styles.addPaymentMethod}
            onPress={handleAddPaymentMethod}
          >
            <Plus size={20} color={colors.primary} />
            <Text style={styles.addPaymentMethodText}>Add Payment Method</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Details</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Ticket Price</Text>
          <Text style={styles.priceValue}>
            {event.isFree ? 'Free' : `$${event.price.toFixed(2)}`}
          </Text>
        </View>
        
        {!event.isFree && (
          <>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Service Fee</Text>
              <Text style={styles.priceValue}>$5.00</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ${(event.price + 5).toFixed(2)}
              </Text>
            </View>
          </>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Important Information</Text>
        <Text style={styles.infoText}>
          Your ticket request will be sent to the host for approval. 
          You will receive a notification once your request has been processed.
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Button
          title={event.isFree ? "Request to Attend" : "Request to Purchase"}
          onPress={handleRequestTicket}
          loading={isLoading}
          style={styles.requestButton}
        />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventDetails: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 8,
    flex: 1,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedPaymentMethod: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodDetails: {
    marginLeft: 12,
  },
  paymentMethodText: {
    fontSize: 16,
    color: colors.text,
  },
  paymentMethodExpiry: {
    fontSize: 14,
    color: colors.darkGray,
  },
  addPaymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  addPaymentMethodText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: colors.text,
  },
  priceValue: {
    fontSize: 16,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  footer: {
    marginTop: 8,
  },
  requestButton: {
    width: '100%',
  },
});