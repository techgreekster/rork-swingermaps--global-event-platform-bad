// App color scheme
export const colors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  background: '#FFFFFF',
  card: '#F8F9FA',
  text: '#212529',
  border: '#E9ECEF',
  notification: '#FF6B6B',
  error: '#FF4757',
  success: '#4CD964',
  darkGray: '#6C757D',
  lightGray: '#CED4DA',
  black: '#000000',
  white: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// Theme configuration
export const theme = {
  light: {
    text: colors.text,
    background: colors.background,
    tint: colors.primary,
    tabIconDefault: colors.lightGray,
    tabIconSelected: colors.primary,
  },
};

export default theme;