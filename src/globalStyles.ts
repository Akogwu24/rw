import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

export const COLORS = {
  primary: '#2E007F',
};
export const globalStyles = StyleSheet.create({
  button: { height: scale(40), width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginVertical: verticalScale(5) },
  PrimaryButtonStyles: {
    backgroundColor: COLORS.primary,
  },
  textStyles: {
    color: 'white',
    fontWeight: '500',
  },

  outlinedButtonStyles: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  sidePaddings: {
    paddingHorizontal: 5,
  },
  small: {
    fontSize: scale(12),
  },
});

export const headingStyles = { mb: 3, color: COLORS.primary, size: 'sm' };

export const inputStyles = { fontSize: scale(13), borderRadius: 8, bg: 'white', h: scale(38), size: 'md' };

export const labelStyles = { mt: 5 };
