import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ticket as TicketIcon } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { TicketCard } from '@/components/TicketCard';
import { RequestCard } from '@/components/RequestCard';
import { useTicketsStore } from '@/store/ticketsStore';
import { useAuthStore } from '@/store/authStore';

export default function TicketsScreen() {
  const [activeTab, setActiveTab] = useState<'attending' | 'hosting'>('attending');
  const [refreshing, setRefreshing] = useState(false);
  
  const router = useRouter();
  const { user } = useAuthStore();
  const { 
    tickets, 
    hostRequests, 
    fetchUserTickets, 
    fetchHostRequests, 
    isLoading 
  } = useTicketsStore();
  
  useEffect(() => {
    if (user) {
      fetchUserTickets(user.id);
      if (user.isHost) {
        fetchHostRequests(user.id);
      }
    }
  }, [user]);
  
  const onRefresh = async () => {
    setRefreshing(true);
    if (user) {
      if (activeTab === 'attending') {
        await fetchUserTickets(user.id);
      } else {
        await fetchHostRequests(user.id);
      }
    }
    setRefreshing(false);
  };
  
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <TicketIcon size={64} color={colors.lightGray} />
      <Text style={styles.emptyTitle}>
        {activeTab === 'attending' ? 'No Tickets Yet' : 'No Hosting Requests'}
      </Text>
      <Text style={styles.emptyText}>
        {activeTab === 'attending' 
          ? "You haven't purchased any tickets yet" 
          : "You don't have any pending requests"}
      </Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      {user?.isHost && (
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'attending' && styles.activeTab
            ]}
            onPress={() => setActiveTab('attending')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'attending' && styles.activeTabText
            ]}>
              Attending
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'hosting' && styles.activeTab
            ]}
            onPress={() => setActiveTab('hosting')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'hosting' && styles.activeTabText
            ]}>
              Hosting
            </Text>
          </TouchableOpacity>
        </View>
      )}
      
      {activeTab === 'attending' ? (
        <FlatList
          data={tickets}
          renderItem={({ item }) => <TicketCard ticket={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderEmptyState}
        />
      ) : (
        <FlatList
          data={hostRequests}
          renderItem={({ item }) => <RequestCard request={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.darkGray,
  },
  activeTabText: {
    color: colors.primary,
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