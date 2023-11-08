import React, {useState} from 'react';
import '../assets/i18n/i18n';
import {StyleSheet, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import LanguageSwitch from '../components/LanguageSwitch';
import Button from '../components/Button';
import gStyle from '../assets/style';
import {RootStackParamList} from '../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function Home({navigation}: HomeScreenProps): JSX.Element {
  const {t, i18n} = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');

  const changeLanguage = (value: string) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  const toggleSwitch = () => {
    const nextLanguage = currentLanguage === 'en' ? 'no' : 'en';
    changeLanguage(nextLanguage);
  };

  return (
    <View style={[gStyle.root, gStyle.fullWidth, gStyle.alignCenter]}>
      <Text style={gStyle.largeText}>{t('sudoku')}</Text>
      <View style={[gStyle.fullWidth, gStyle.alignCenter]}>
        <Button
          text={t('start')}
          containerStyle={gStyle.largeButtonContainer}
          buttonStyle={gStyle.button}
          titleStyle={gStyle.mediumText}
          onPress={() => navigation.navigate('BoardChooser')}
        />
        <Button
          text={t('create-board')}
          containerStyle={gStyle.largeButtonContainer}
          buttonStyle={gStyle.button}
          titleStyle={gStyle.mediumText}
          onPress={() => navigation.navigate('Create')}
        />
      </View>
      <View style={[styles.languageBox, gStyle.fullWidth, gStyle.alignCenter]}>
        <LanguageSwitch
          value={currentLanguage === 'en'}
          onValueChanged={toggleSwitch}
          offImage={require('../assets/icons/flag_norway.png')}
          onImage={require('../assets/icons/flag_united_kingdom.png')}
          style={styles.languageSwitch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  switch: {
    marginTop: '20%',
    border: '2px solid white',
    borderWidth: 5,
    transform: [{scaleX: 2}, {scaleY: 2}],
  },
  languageBox: {
    marginTop: '25%',
  },
  languageSwitch: {
    margin: 5,
    width: '75%',
  },
});
