import React from 'react';
import '../assets/i18n/i18n';
import {Button as ElementButton} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../values/colors';

import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type ButtonProps = {
  text: string;
  onPress: () => void;
  icon?: string;
  buttonStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
};

const Button = ({
  text,
  onPress,
  icon,
  buttonStyle,
  containerStyle,
  titleStyle,
}: ButtonProps): JSX.Element => {
  return (
    <ElementButton
      onPress={onPress}
      buttonStyle={buttonStyle}
      containerStyle={[containerStyle, styles.button]}
      titleStyle={titleStyle}
      title={text}
      type="solid"
      icon={
        icon ? <Icon name={icon} size={iconSize} color={iconColor} /> : false
      }
    />
  );
};

const iconColor = COLORS.white;
const iconSize = 15;
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.darkBackground,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default Button;
