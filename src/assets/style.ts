import {StyleSheet} from 'react-native';
import {COLORS} from '../values/colors';

export default StyleSheet.create({
  root: {
    backgroundColor: COLORS.lightBackground,
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: '20%',
  },
  fullWidth: {
    width: '100%',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  darkBackground: {
    backgroundColor: COLORS.darkBackground,
  },
  defaultContainer: {
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    borderRadius: 5,
    flexDirection: 'column',
    backgroundColor: COLORS.darkBackground,
    padding: 5,
  },
  largeText: {
    color: COLORS.white,
    marginTop: '25%',
    fontSize: 50,
  },
  mediumText: {
    color: COLORS.white,
    fontSize: 30,
  },
  smallText: {
    color: COLORS.white,
    fontSize: 20,
    borderWidth: 3,
  },
  largeButtonContainer: {
    width: '75%',
    margin: 20,
  },
  mediumButtonContainer: {
    width: '40%',
    margin: 20,
  },
  smallButtonContainer: {
    width: '25%',
    margin: 20,
  },
  button: {
    backgroundColor: COLORS.darkBackground,
  },
  buttonDark: {
    backgroundColor: COLORS.black,
  },
});
