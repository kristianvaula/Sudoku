import React from 'react';
import {Home} from './src/screens/Home';
import {SudokuScreen} from './src/screens/SudokuScreen';
import {CreateScreen} from './src/screens/CreateScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/types/types';
import {COLORS} from './src/values/colors';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: COLORS.lightBackground,
            },
            headerTintColor: COLORS.white,
          }}
        />
        <RootStack.Screen
          name="Sudoku"
          component={SudokuScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: COLORS.lightBackground,
            },
            headerTintColor: COLORS.white,
          }}
        />
        <RootStack.Screen
          name="Create"
          component={CreateScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: COLORS.lightBackground,
            },
            headerTintColor: COLORS.white,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
