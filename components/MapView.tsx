import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/constants/colors';

// This is a mock MapView component since we can't use actual maps in this environment
// In a real app, you would use react-native-maps or expo-location with MapView

interface MapViewProps {
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
  style?: any;
  showsUserLocation?: boolean;
  markers?: Array<{
    id: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
    title?: string;
  }>;
  onMarkerPress?: (markerId: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  initialRegion,
  style,
  showsUserLocation,
  markers,
  onMarkerPress
}) => {
  // In a real app, this would be a real map
  // For now, we'll just show a placeholder image
  
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
        style={styles.mapImage}
        contentFit="cover"
      />
      
      {markers && markers.map((marker) => (
        <View 
          key={marker.id}
          style={styles.marker}
          onTouchEnd={() => onMarkerPress && onMarkerPress(marker.id)}
        >
          <View style={styles.markerPin}>
            <View style={styles.markerDot} />
          </View>
          {marker.title && (
            <View style={styles.markerLabel}>
              <Text style={styles.markerText}>{marker.title}</Text>
            </View>
          )}
        </View>
      ))}
      
      {Platform.OS === 'web' && (
        <Text style={styles.webNotice}>
          Map functionality is limited in web view.
          The full map experience is available in the mobile app.
        </Text>
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    // Random positions for mock markers
    top: '40%',
    left: '50%',
  },
  markerPin: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  markerLabel: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  markerText: {
    fontSize: 12,
    color: colors.text,
  },
  webNotice: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: colors.white,
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
    textAlign: 'center',
  },
});