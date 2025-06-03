import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Share,
  Platform,
  Alert
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  Share as ShareIcon, 
  CheckCircle,
  XCircle,
  Clock3
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { useTicketsStore } from '@/store/ticketsStore';
import { Ticket } from '@/types';
import { mockTickets } from '@/mocks/tickets';

export default function TicketDetailScreen() {
  const { id } = useLocalSearchParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const { generateTicketQR, isLoading } = useTicketsStore();
  
  useEffect(() => {
    const loadTicket = async () => {
      if (id) {
        // In a real app, this would fetch from API
        const ticketData = mockTickets.find(t => t.id === id);
        if (ticketData) {
          setTicket(ticketData);
        }
        setLoading(false);
      }
    };
    
    loadTicket();
  }, [id]);
  
  const handleSharePress = async () => {
    if (ticket) {
      try {
        await Share.share({
          title: 'My Ticket',
          message: `I'm attending ${ticket.eventTitle} on ${ticket.eventDate}!`,
          url: `https://swingermaps.com/ticket/${ticket.id}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };
  
  const handleDownloadTicket = () => {
    Alert.alert(
      "Download Ticket",
      "This would download a PDF ticket in a real app.",
      [{ text: "OK" }]
    );
  };
  
  const handleGenerateQR = async () => {
    if (ticket) {
      try {
        const qrCode = await generateTicketQR(ticket.id);
        // In a real app, this would update the ticket with the QR code
        setTicket({ ...ticket, qrCode });
      } catch (error) {
        Alert.alert("Error", "Failed to generate QR code. Please try again.");
      }
    }
  };
  
  const getStatusIcon = () => {
    switch (ticket?.status) {
      case 'approved':
        return <CheckCircle size={24} color={colors.success} />;
      case 'rejected':
        return <XCircle size={24} color={colors.error} />;
      case 'pending':
        return <Clock3 size={24} color={colors.secondary} />;
      default:
        return null;
    }
  };
  
  const getStatusText = () => {
    switch (ticket?.status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'pending':
        return 'Pending Approval';
      case 'attended':
        return 'Attended';
      default:
        return 'Unknown';
    }
  };
  
  if (loading || !ticket) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading ticket details...</Text>
      </View>
    );
  }
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{ticket.eventTitle}</Text>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleSharePress}
          >
            <ShareIcon size={20} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.statusContainer}>
          {getStatusIcon()}
          <Text style={[
            styles.statusText,
            ticket.status === 'approved' && styles.approvedText,
            ticket.status === 'rejected' && styles.rejectedText,
            ticket.status === 'pending' && styles.pendingText,
          ]}>
            {getStatusText()}
          </Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Calendar size={20} color={colors.darkGray} />
            <Text style={styles.infoText}>{ticket.eventDate}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={20} color={colors.darkGray} />
            <Text style={styles.infoText}>{ticket.eventTime}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MapPin size={20} color={colors.darkGray} />
            <Text style={styles.infoText}>{ticket.eventLocation}</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Ticket Price</Text>
          <Text style={styles.price}>${ticket.price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.purchaseInfo}>
          <Text style={styles.purchaseDate}>Purchased on {ticket.purchaseDate}</Text>
          <Text style={styles.ticketId}>Ticket ID: {ticket.id}</Text>
        </View>
      </View>
      
      {ticket.status === 'approved' && (
        <View style={styles.qrSection}>
          <Text style={styles.qrTitle}>Ticket QR Code</Text>
          <Text style={styles.qrSubtitle}>
            Present this QR code at the event entrance
          </Text>
          
          {ticket.qrCode ? (
            <View style={styles.qrContainer}>
              <Image 
                source={{ uri: ticket.qrCode }} 
                style={styles.qrCode}
                contentFit="contain"
              />
            </View>
          ) : (
            <Button
              title="Generate QR Code"
              onPress={handleGenerateQR}
              loading={isLoading}
              style={styles.generateButton}
            />
          )}
        </View>
      )}
      
      <View style={styles.actions}>
        <Button
          title="Download Ticket"
          onPress={handleDownloadTicket}
          variant="outline"
          icon={<Download size={20} color={colors.primary} />}
          style={styles.downloadButton}
        />
        
        <Button
          title="View Event"
          onPress={() => router.push(`/event/${ticket.eventId}`)}
          style={styles.viewEventButton}
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
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  shareButton: {
    padding: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  approvedText: {
    color: colors.success,
  },
  rejectedText: {
    color: colors.error,
  },
  pendingText: {
    color: colors.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  infoSection: {
    marginBottom: 16,
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
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    color: colors.text,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  purchaseInfo: {
    marginBottom: 8,
  },
  purchaseDate: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 4,
  },
  ticketId: {
    fontSize: 14,
    color: colors.darkGray,
  },
  qrSection: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  qrSubtitle: {
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 16,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
  },
  generateButton: {
    minWidth: 200,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downloadButton: {
    flex: 1,
    marginRight: 8,
  },
  viewEventButton: {
    flex: 1,
    marginLeft: 8,
  },
});