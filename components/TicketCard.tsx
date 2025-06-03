import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Ticket } from '@/types';

interface TicketCardProps {
  ticket: Ticket;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/ticket/${ticket.id}`);
  };
  
  const getStatusColor = () => {
    switch (ticket.status) {
      case 'approved':
        return colors.success;
      case 'pending':
        return colors.secondary;
      case 'rejected':
        return colors.error;
      case 'attended':
        return colors.darkGray;
      default:
        return colors.darkGray;
    }
  };
  
  const getStatusText = () => {
    switch (ticket.status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending Approval';
      case 'rejected':
        return 'Rejected';
      case 'attended':
        return 'Attended';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{ticket.eventTitle}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Calendar size={16} color={colors.darkGray} />
          <Text style={styles.infoText}>{ticket.eventDate}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Clock size={16} color={colors.darkGray} />
          <Text style={styles.infoText}>{ticket.eventTime}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MapPin size={16} color={colors.darkGray} />
          <Text style={styles.infoText} numberOfLines={1}>{ticket.eventLocation}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.price}>${ticket.price.toFixed(2)}</Text>
        <Text style={styles.purchaseDate}>Purchased: {ticket.purchaseDate}</Text>
      </View>
      
      {ticket.status === 'approved' && ticket.qrCode && (
        <View style={styles.qrPreviewContainer}>
          <Image 
            source={{ uri: ticket.qrCode }} 
            style={styles.qrPreview}
            contentFit="contain"
          />
          <Text style={styles.qrText}>Tap to view ticket</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    padding: 16,
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
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  purchaseDate: {
    fontSize: 14,
    color: colors.darkGray,
  },
  qrPreviewContainer: {
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  qrPreview: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },
  qrText: {
    fontSize: 12,
    color: colors.darkGray,
  },
});