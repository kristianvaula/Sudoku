import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../values/colors';

type GridEntryProps = {
  marked: boolean;
  value: number;
  row: number;
  column: number;
  onNumberPress: (row: number, column: number) => void;
};

const GridEntry = ({
  marked,
  value,
  row,
  column,
  onNumberPress,
}: GridEntryProps): JSX.Element => {
  const handleNumberPress = () => {
    onNumberPress(row, column);
  };

  return (
    <TouchableOpacity
      style={marked ? styles.containerMarked : styles.container}
      onPress={handleNumberPress}
      key={column}>
      <Text style={styles.numberText}>{value === 0 ? '' : value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 0.5,
    backgroundColor: COLORS.white,
  },
  containerMarked: {
    height: 50,
    borderWidth: 0.5,
    backgroundColor: COLORS.red,
  },
  numberText: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
  },
});

export default GridEntry;
