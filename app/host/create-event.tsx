import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Alert,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Users, 
  Tag,
  Plus,
  Camera
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/authStore';

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [images, setImages] = useState<string[]>([]);
  
  const router = useRouter();
  const { user } = useAuthStore();
  
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handlePickImage = async () => {
    // Request permissions
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to upload images');
        return;
      }
    }
    
    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages([...images, result.assets[0].uri]);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handleCreateEvent = () => {
    // Validate form
    if (!title || !description || !date || !time || !locationName || 
        !address || !city || !state || !country || !capacity || 
        (!isFree && !price) || images.length === 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    
    // In a real app, this would send data to the server
    Alert.alert(
      'Success',
      'Your event has been created and is pending approval',
      [
        { 
          text: 'OK', 
          onPress: () => router.replace('/(tabs)')
        }
      ]
    );
  };
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Details</Text>
        
        <Input
          label="Event Title"
          placeholder="Enter event title"
          value={title}
          onChangeText={setTitle}
        />
        
        <Input
          label="Description"
          placeholder="Describe your event"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={styles.textArea}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date & Time</Text>
        
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
          leftIcon={<Calendar size={20} color={colors.darkGray} />}
        />
        
        <Input
          label="Time"
          placeholder="HH:MM - HH:MM"
          value={time}
          onChangeText={setTime}
          leftIcon={<Clock size={20} color={colors.darkGray} />}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        
        <Input
          label="Venue Name"
          placeholder="Enter venue name"
          value={locationName}
          onChangeText={setLocationName}
        />
        
        <Input
          label="Address"
          placeholder="Enter street address"
          value={address}
          onChangeText={setAddress}
          leftIcon={<MapPin size={20} color={colors.darkGray} />}
        />
        
        <View style={styles.row}>
          <Input
            label="City"
            placeholder="City"
            value={city}
            onChangeText={setCity}
            containerStyle={styles.halfInput}
          />
          
          <Input
            label="State"
            placeholder="State"
            value={state}
            onChangeText={setState}
            containerStyle={styles.halfInput}
          />
        </View>
        
        <Input
          label="Country"
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pricing & Capacity</Text>
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Free Event</Text>
          <Switch
            value={isFree}
            onValueChange={setIsFree}
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
        
        {!isFree && (
          <Input
            label="Price ($)"
            placeholder="Enter ticket price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            leftIcon={<DollarSign size={20} color={colors.darkGray} />}
          />
        )}
        
        <Input
          label="Capacity"
          placeholder="Maximum number of attendees"
          value={capacity}
          onChangeText={setCapacity}
          keyboardType="numeric"
          leftIcon={<Users size={20} color={colors.darkGray} />}
        />
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Private Event</Text>
          <Switch
            value={isPrivate}
            onValueChange={setIsPrivate}
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tags</Text>
        <Text style={styles.sectionSubtitle}>
          Add tags to help people find your event
        </Text>
        
        <View style={styles.tagInputContainer}>
          <Input
            placeholder="Add a tag"
            value={newTag}
            onChangeText={setNewTag}
            leftIcon={<Tag size={20} color={colors.darkGray} />}
            containerStyle={styles.tagInput}
          />
          
          <TouchableOpacity 
            style={styles.addTagButton}
            onPress={handleAddTag}
          >
            <Plus size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.tag}
              onPress={() => handleRemoveTag(tag)}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Images</Text>
        <Text style={styles.sectionSubtitle}>
          Add images to showcase your event (at least one required)
        </Text>
        
        <View style={styles.imagesContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image 
                source={{ uri: image }} 
                style={styles.image}
                contentFit="cover"
              />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={() => handleRemoveImage(index)}
              >
                <Text style={styles.removeImageText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity 
            style={styles.addImageButton}
            onPress={handlePickImage}
          >
            <Camera size={24} color={colors.darkGray} />
            <Text style={styles.addImageText}>Add Image</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Button
        title="Create Event"
        onPress={handleCreateEvent}
        style={styles.createButton}
      />
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
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: colors.text,
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tagInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 8,
  },
  addTagButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: colors.text,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 16 / 9,
    marginRight: '4%',
    marginBottom: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  addImageButton: {
    width: '48%',
    aspectRatio: 16 / 9,
    backgroundColor: colors.card,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  addImageText: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 8,
  },
  createButton: {
    marginTop: 8,
    marginBottom: 24,
  },
});