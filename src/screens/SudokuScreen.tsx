import React from 'react';
import gStyle from '../assets/style';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Entypo';
import {COLORS} from '../values/colors';
import NumberInterface from '../components/NumberInterface';
import Grid from '../components/Grid';

export function SudokuScreen(): JSX.Element {
  const {t} = useTranslation();
  const handleNumberPress = (number: number) => {
    console.log(number);
  };
  const handleGridPress = (row: number, column: number) => {
    console.log(row, column);
  };

  return (
    <View style={gStyle.root}>
      <View style={gStyle.defaultContainer}>
        <Grid onNumberPress={handleGridPress} />
      </View>
      <NumberInterface onNumberPress={handleNumberPress} />
      <View style={styles.choiceContainer}>
        <Button
          icon={<Icon name="eraser" size={25} color="white" />}
          title={t('erase')}
          style={gStyle.button}
          containerStyle={gStyle.mediumButtonContainer}
          buttonStyle={gStyle.buttonDark}
          titleStyle={gStyle.mediumText}
        />
        <Button
          icon={<Icon name="edit" size={25} color="white" />}
          title={t('notes')}
          style={gStyle.button}
          containerStyle={gStyle.mediumButtonContainer}
          buttonStyle={gStyle.buttonDark}
          titleStyle={gStyle.mediumText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sudokuContainer: {
    width: '100%',
    height: 500,
    marginTop: 50,
    padding: 10,
  },
  numberContainer: {
    backgroundColor: COLORS.darkBackground,
    height: 100,
    width: '100%',
    padding: 10,
  },
  choiceContainer: {
    backgroundColor: COLORS.darkBackground,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
