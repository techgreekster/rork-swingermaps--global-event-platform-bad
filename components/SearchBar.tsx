import React from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSubmit,
  onClear,
  placeholder = "Search events...",
  style
}) => {
  const handleClear = () => {
    onChangeText('');
    if (onClear) onClear();
  };
  
  return (
    <View style={[styles.container, style]}>
      <Search size={20} color={colors.darkGray} style={styles.searchIcon} />
      
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor={colors.lightGray}
        returnKeyType="search"
        clearButtonMode="never" // We'll use our own clear button
      />
      
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X size={18} color={colors.darkGray} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
});