import React from 'react';
import '../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../values/colors';
import gStyle from '../assets/style';

import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ViewStyle,
  Text,
} from 'react-native';

type LanguageSwitchProps = {
  value: Boolean;
  onValueChanged: () => void;
  onImage: ImageSourcePropType;
  offImage: ImageSourcePropType;
  style?: ViewStyle;
};

const LanguageSwitch = ({
  value,
  onValueChanged,
  onImage,
  offImage,
  style,
}: LanguageSwitchProps): JSX.Element => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      style={[style, styles.container, gStyle.largeButtonContainer]}
      onPress={onValueChanged}>
      <Text style={styles.text}>{t('change-language')}</Text>
      <Image source={value ? onImage : offImage} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.black,
    padding: 5,
    borderRadius: 5,
  },
  image: {
    height: 40,
    width: 40,
  },
  text: {
    color: COLORS.white,
    fontSize: 26,
    marginRight: 10,
  },
});

export default LanguageSwitch;
