import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  TouchableOpacity 
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Discover Swinger Events',
    description: 'Find the best swinger events near you or anywhere in the world.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '2',
    title: 'Connect with Like-minded People',
    description: 'Meet new people and build connections in a safe and respectful environment.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '3',
    title: 'Host Your Own Events',
    description: 'Create and manage your own events with our easy-to-use tools.',
    image: 'https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.push('/auth/login');
    }
  };
  
  const handleSkip = () => {
    router.push('/auth/login');
  };
  
  const renderItem = ({ item }: { item: typeof slides[0] }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };
  
  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? colors.primary : colors.lightGray }
            ]}
          />
        ))}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />
      
      <View style={styles.footer}>
        {renderDots()}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          
          <Button
            title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  slide: {
    width,
    height,
    justifyContent: 'flex-end',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    padding: 40,
    paddingBottom: 180,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: colors.white,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 40,
    backgroundColor: 'transparent',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
  nextButton: {
    paddingHorizontal: 32,
  },
});