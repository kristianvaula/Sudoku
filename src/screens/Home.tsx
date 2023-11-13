import React, {useState} from 'react';
import '../assets/i18n/i18n';
import {StyleSheet, View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import LanguageSwitch from '../components/LanguageSwitch';
import Button from '../components/Button';
import gStyle from '../assets/style';
import {RootStackParamList} from '../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {createEmptyBoard} from '../utils/SudokuUtil';
import {useStateValue} from '../utils/StateUtil';
import {getBoards} from '../utils/StorageUtil';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function Home({navigation}: HomeScreenProps): JSX.Element {
  const {t, i18n} = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  const {state} = useStateValue();

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
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <View
        style={[gStyle.fullWidth, gStyle.alignCenter, styles.choiceContainer]}>
        {state.board !== undefined ? (
          <Button
            text={t('continue')}
            containerStyle={gStyle.largeButtonContainer}
            buttonStyle={gStyle.button}
            titleStyle={gStyle.mediumText}
            onPress={() => navigation.navigate('Sudoku', {board: state.board})}
          />
        ) : (
          <></>
        )}
        <Button
          text={t('new_game')}
          containerStyle={gStyle.largeButtonContainer}
          buttonStyle={gStyle.button}
          titleStyle={gStyle.mediumText}
          onPress={() => navigation.navigate('StartMenu')}
        />
        <Button
          text={t('select-board')}
          containerStyle={gStyle.largeButtonContainer}
          buttonStyle={gStyle.button}
          titleStyle={gStyle.mediumText}
          onPress={async () =>
            navigation.navigate('BoardPicker', {boards: await getBoards()})
          }
        />
        <Button
          text={t('create-board')}
          containerStyle={gStyle.largeButtonContainer}
          buttonStyle={gStyle.button}
          titleStyle={gStyle.mediumText}
          onPress={() =>
            navigation.navigate('Create', {board: createEmptyBoard()})
          }
        />
      </View>
      <View style={[gStyle.fullWidth, gStyle.alignCenter]}>
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
  choiceContainer: {
    height: '65%',
  },
  switch: {
    marginTop: '20%',
    border: '2px solid white',
    borderWidth: 5,
    transform: [{scaleX: 2}, {scaleY: 2}],
  },
  languageSwitch: {
    margin: 5,
    width: '75%',
  },
  imageContainer: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 400,
    resizeMode: 'contain',
  },
});
