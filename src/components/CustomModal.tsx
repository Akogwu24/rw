import React from 'react';
import { Modal, Pressable, useDisclose } from 'native-base';
import { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';

type TCustomModal = {
  triggerButton: string | ReactNode;
  children: ReactNode;
  headerTitle: string;
  buttonProps: {
    [x: string]: any;
  };
  [x: string]: any;
};

export const CustomModal = ({ children, triggerButton, headerTitle, size, buttonProps, ...props }: Partial<TCustomModal>) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  // const insets = useSafeAreaInsets();

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

      <Modal isOpen={isOpen} onClose={onClose} animationPreset='slide' safeArea={true} pb={0} avoidKeyboard justifyContent={'flex-end'} size={size || 'full'} {...props}>
        <Modal.Content borderTopRadius={20}>
          {/* <Modal.CloseButton/> */}
          {headerTitle ? <Modal.Header borderWidth='0'>{headerTitle}</Modal.Header> : null}
          <Modal.Body>{childrenWithProps}</Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
