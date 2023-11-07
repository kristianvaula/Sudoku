import React from 'react';
import '../assets/i18n/i18n';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../values/colors';

type NumberInterfaceProps = {
  onNumberPress: (number: number) => void;
};

const NumberInterface = ({
  onNumberPress,
}: NumberInterfaceProps): JSX.Element => {
  const handleNumberPress = (number: number) => {
    onNumberPress(number);
  };

  const numbers = Array.from(Array(10).keys());

  return (
    <View style={styles.container}>
      {numbers.map(number => (
        <TouchableOpacity
          style={styles.numberContainer}
          onPress={() => handleNumberPress(number)}
          key={number}>
          <Text style={styles.numberText}>{number}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBackground,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  numberContainer: {
    height: 40,
    borderWidth: 1,
    width: 40,
    backgroundColor: COLORS.white,
  },
  numberText: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
  },
});

export default NumberInterface;
