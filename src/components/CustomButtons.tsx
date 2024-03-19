import React, { ReactNode } from 'react';
import { Button, Text, Pressable } from 'native-base';
import { COLORS, globalStyles } from '../globalStyles';
import { TouchableOpacity } from 'react-native';
// import { Pressable } from 'react-native';

interface IBTNProps {
  children: ReactNode | string;
  onPress: () => void;
  [x: string]: any;
}

// export const PrimaryButton = ({ children = 'Get Started', ...props }: IBTNProps) => {
//   return (
//     <Button style={[globalStyles.button, globalStyles.PrimaryButtonStyles]} {...props}>
//       {children}
//     </Button>

//   );
// };

export const PrimaryButton = ({ children, onPress, ...props }: IBTNProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[globalStyles.button, { backgroundColor: COLORS.primary, ...props }]}>
      <Text color='white'>{children}</Text>
    </TouchableOpacity>
  );
};

export const OutlinedButton = ({ children = 'Get Started', onPress, ...props }: IBTNProps) => {
  return (
    <Pressable onPress={onPress} style={[globalStyles.button, globalStyles.outlinedButtonStyles, { ...props }]}>
      {children}
    </Pressable>
  );
};
