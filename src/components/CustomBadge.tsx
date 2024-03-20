import { Badge, Text } from 'native-base';
import React from 'react';

type TCustomBadgeProps = {
  color: string;
  bg: string;
  text: string;
};
export const CustomBadge = ({ color, bg, text }: TCustomBadgeProps) => {
  return (
    <Badge h={'35px'} borderRadius={10} bg={bg || 'rgba(219, 112, 5, 0.1)'}>
      <Text fontSize={12} fontWeight={700} color={color || '#DB7005'}>
        {text || 'Robbery'}
      </Text>
    </Badge>
  );
};
