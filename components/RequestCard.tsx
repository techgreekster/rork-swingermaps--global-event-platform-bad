import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Image } from 'expo-image';
import { Calendar, Clock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { HostRequest } from '@/types';
import { Button } from './Button';
import { useTicketsStore } from '@/store/ticketsStore';

interface RequestCardProps {
  request: HostRequest;
}

export const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
  const { approveRequest, rejectRequest, isLoading } = useTicketsStore();
  
  const handleApprove = () => {
    Alert.alert(
      "Approve Request",
      "Are you sure you want to approve this request?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Approve", 
          onPress: () => approveRequest(request.id)
        }
      ]
    );
  };
  
  const handleReject = () => {
    Alert.alert(
      "Reject Request",
      "Are you sure you want to reject this request?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reject", 
          style: "destructive",
          onPress: () => rejectRequest(request.id)
        }
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: request.userAvatar }} 
            style={styles.avatar}
            contentFit="cover"
          />
          <Text style={styles.userName}>{request.userName}</Text>
        </View>
        <Text style={styles.date}>{request.requestDate}</Text>
      </View>
      
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{request.eventTitle}</Text>
      </View>
      
      {request.status === 'pending' ? (
        <View style={styles.actions}>
          <Button 
            title="Approve" 
            onPress={handleApprove} 
            variant="primary"
            size="small"
            style={styles.approveButton}
            loading={isLoading}
          />
          <Button 
            title="Reject" 
            onPress={handleReject} 
            variant="outline"
            size="small"
            style={styles.rejectButton}
            loading={isLoading}
          />
        </View>
      ) : (
        <View style={[
          styles.statusBadge, 
          { 
            backgroundColor: request.status === 'approved' 
              ? colors.success 
              : colors.error 
          }
        ]}>
          <Text style={styles.statusText}>
            {request.status === 'approved' ? 'Approved' : 'Rejected'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  date: {
    fontSize: 14,
    color: colors.darkGray,
  },
  eventInfo: {
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  approveButton: {
    marginRight: 8,
    flex: 1,
  },
  rejectButton: {
    flex: 1,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
});