import React from 'react';
import gStyle from '../assets/style';
import {StyleSheet, View} from 'react-native';
import Button from '../components/Button';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../values/colors';
import {Actions} from 'react-native-router-flux';

export function SudokuScreen(): JSX.Element {
  const {t} = useTranslation();

  return (
    <View style={gStyle.root}>
      <View style={gStyle.defaultContainer}>
        <Button
          onPress={Actions.home}
          text={t('return')}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={gStyle.mediumText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '20%',
  },
  button: {
    backgroundColor: COLORS.darkBackground,
  },
});
