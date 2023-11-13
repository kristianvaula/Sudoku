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
    borderRadius: 5,
    margin: 20,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  mediumButtonContainer: {
    width: '40%',
    borderRadius: 5,
    margin: 20,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  smallButtonContainer: {
    width: '25%',
    margin: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: COLORS.black,
  },
  buttonDark: {
    backgroundColor: COLORS.black,
  },
  difficultyPickerContainer: {
    width: '100%',
    margin: 10,
    marginTop: 15,
    borderRadius: 5,
  },
  difficultyPickerText: {
    fontSize: 15,
    color: COLORS.white,
  },
  difficultyPickerButtons: {
    backgroundColor: COLORS.black,
  },
});
