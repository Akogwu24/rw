import { Toast } from 'react-native-toast-notifications';

export const successToast = (msg?: string) => {
  Toast.show(msg || 'Operation Successfull', {
    type: 'success',
    textStyle: { flexWrap: 'wrap', fontSize: 17, color: 'rgba(119, 139, 110, 1)' },
  });
};

export const errorToast = (msg?: string) => {
  Toast.show(msg || 'Failed Check your connection', {
    type: 'danger',
    textStyle: { flexWrap: 'wrap', fontSize: 17, color: 'rgba(202, 103, 103, 1)' },
  });
};

export const wariningToast = (msg?: string) => {
  Toast.show(msg || 'Invalid Operation', {
    type: 'warning',
    textStyle: { flexWrap: 'wrap', fontSize: 17, color: 'rgba(138, 102, 77, 1)' },
  });
};
