import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp
} from 'react-native';
import { colors } from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon
}) => {
  const getButtonStyle = () => {
    let buttonStyle: StyleProp<ViewStyle> = [styles.button];
    
    // Add size styles
    switch (size) {
      case 'small':
        buttonStyle = [...buttonStyle, styles.buttonSmall];
        break;
      case 'large':
        buttonStyle = [...buttonStyle, styles.buttonLarge];
        break;
      default:
        buttonStyle = [...buttonStyle, styles.buttonMedium];
    }
    
    // Add variant styles
    switch (variant) {
      case 'secondary':
        buttonStyle = [...buttonStyle, styles.buttonSecondary];
        break;
      case 'outline':
        buttonStyle = [...buttonStyle, styles.buttonOutline];
        break;
      case 'text':
        buttonStyle = [...buttonStyle, styles.buttonText];
        break;
      default:
        buttonStyle = [...buttonStyle, styles.buttonPrimary];
    }
    
    // Add disabled style
    if (disabled) {
      buttonStyle = [...buttonStyle, styles.buttonDisabled];
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleArray: StyleProp<TextStyle> = [styles.textStyle];
    
    // Add size styles
    switch (size) {
      case 'small':
        textStyleArray = [...textStyleArray, styles.textSmall];
        break;
      case 'large':
        textStyleArray = [...textStyleArray, styles.textLarge];
        break;
      default:
        textStyleArray = [...textStyleArray, styles.textMedium];
    }
    
    // Add variant styles
    switch (variant) {
      case 'primary':
        textStyleArray = [...textStyleArray, styles.textPrimary];
        break;
      case 'secondary':
        textStyleArray = [...textStyleArray, styles.textSecondary];
        break;
      case 'outline':
        textStyleArray = [...textStyleArray, styles.textOutline];
        break;
      case 'text':
        textStyleArray = [...textStyleArray, styles.textText];
        break;
    }
    
    // Add disabled style
    if (disabled) {
      textStyleArray = [...textStyleArray, styles.textDisabled];
    }
    
    return textStyleArray;
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? colors.white : colors.primary} 
          size="small" 
        />
      ) : (
        <>
          {icon && icon}
          <Text style={[getTextStyle(), textStyle, icon && { marginLeft: 8 }]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonMedium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
  textStyle: {
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  textPrimary: {
    color: colors.white,
  },
  textSecondary: {
    color: colors.white,
  },
  textOutline: {
    color: colors.primary,
  },
  textText: {
    color: colors.primary,
  },
  textDisabled: {
    color: colors.darkGray,
  },
});