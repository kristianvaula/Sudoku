import React from 'react';
import {StyleSheet, View} from 'react-native';
import GridEntry from './GridEntry';

type GridProps = {
  onNumberPress: (row: number, column: number) => void;
  values: number[][];
  marked: number[][];
};

const Grid = ({onNumberPress, values, marked}: GridProps): JSX.Element => {
  const handleNumberPress = (row: number, column: number) => {
    onNumberPress(row, column);
  };

  return (
    <View style={styles.container}>
      {values.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            styles.rowContainer,
            rowIndex % 3 === 0 && styles.borderLeft,
            rowIndex === values.length - 1 && styles.borderRight,
          ]}>
          {row.map((value: number, columnIndex: number) => (
            <GridEntry
              value={value}
              marked={marked && marked[rowIndex][columnIndex] === 1}
              containerStyle={[
                columnIndex % 3 === 0 ? styles.borderTop : {},
                columnIndex === values.length - 1 ? styles.borderBottom : {},
              ]}
              key={columnIndex}
              row={rowIndex}
              column={columnIndex}
              onNumberPress={() => handleNumberPress(rowIndex, columnIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 500,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    margin: 0,
  },
  borderLeft: {
    borderLeftWidth: 2,
  },
  borderRight: {
    borderRightWidth: 2,
  },
  borderTop: {
    borderTopWidth: 2,
  },
  borderBottom: {
    borderBottomWidth: 2,
  },
});

export default Grid;
