import { Platform, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 35 : 0,
  },
  camera: {
    flex: 1,
    backgroundColor: 'black',

    // aspectRatio: 9 / 16,
    justifyContent: 'center',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: Dimensions.get('window').width,
    gap: 50,
  },
  recordButtonContainer: {
    // marginHorizontal: 30,
    alignItems: 'center',
  },
  recordButton: {
    borderWidth: 8,
    borderColor: 'rgba(161, 47, 47, 1)',
    backgroundColor: 'rgba(255, 64, 64,1)',
    borderRadius: 100,
    height: 75,
    width: 75,
    flex: 1,
  },
  sideBarContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 100,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideBarButton: {
    // alignItems: 'center',
  },
  flashContainer: {
    position: 'absolute',
    margin: 30,
    right: 0,
  },
  closeCamera: {
    width: 45,
    height: 45,
    justifyContent: 'center',
  },

  //incident summary share button styles
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.8, // For iOS shadow
    shadowRadius: 2, // For iOS shadow
  },
});
