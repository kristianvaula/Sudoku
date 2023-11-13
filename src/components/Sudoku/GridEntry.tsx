import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {COLORS} from '../../values/colors';

type GridEntryProps = {
  marked: boolean;
  value: number;
  row: number;
  column: number;
  onNumberPress: (row: number, column: number) => void;
  containerStyle?: ViewStyle[];
};

const GridEntry = ({
  marked,
  value,
  row,
  column,
  onNumberPress,
  containerStyle,
}: GridEntryProps): JSX.Element => {
  const handleNumberPress = () => {
    onNumberPress(row, column);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        marked ? styles.containerMarked : styles.containerUnmarked,
        containerStyle,
      ]}
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
  },
  containerUnmarked: {
    backgroundColor: COLORS.white,
  },
  containerMarked: {
    backgroundColor: COLORS.red,
  },
  numberText: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
  },
});

export default GridEntry;
