import React, { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';
import { Button, Actionsheet, useDisclose, KeyboardAvoidingView } from 'native-base';
import { Pressable } from 'react-native';

type ICustomActionSheet = {
  triggerButton: string | ReactNode;
  children: ReactNode;
  buttonProps: {
    [x: string]: any;
  };
  [x: string]: any;
};
export default function CustomActionSheet({ triggerButton, children, buttonProps, ...props }: Partial<ICustomActionSheet>) {
  const { isOpen, onOpen, onClose } = useDisclose();

  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, { onClose });
    }
    return child;
  });

  return (
    <>
      <Pressable onPress={onOpen} {...buttonProps}>
        {triggerButton}
      </Pressable>
      <Actionsheet justifyContent='flex-end' flex={1} isOpen={isOpen} onClose={onClose} hideDragIndicator={true} {...props}>
        <Actionsheet.Content>{childrenWithProps}</Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
