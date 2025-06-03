import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = () => {
    const stars = [];
    const rating = Math.round(review.rating);
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          size={16}
          color={colors.primary}
          fill={i <= rating ? colors.primary : 'none'}
        />
      );
    }
    
    return stars;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: review.userAvatar }} 
          style={styles.avatar}
          contentFit="cover"
        />
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{review.userName}</Text>
          <Text style={styles.date}>{review.date}</Text>
        </View>
      </View>
      
      <View style={styles.ratingContainer}>
        {renderStars()}
        <Text style={styles.ratingText}>{review.rating.toFixed(1)}</Text>
      </View>
      
      <Text style={styles.comment}>{review.comment}</Text>
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
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: colors.darkGray,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  comment: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
});