import React, {useEffect} from 'react';
import {Home} from './src/screens/Home';
import {SudokuScreen} from './src/screens/SudokuScreen';
import {CreateScreen} from './src/screens/CreateScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/types/types';
import {COLORS} from './src/values/colors';
import {BoardChooser} from './src/screens/BoardChooser';
import {initDefaultBoards} from './src/utils/StorageUtil';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  useEffect(() => {
    initDefaultBoards();
  });

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
          options={{
            title: '',
            headerStyle: {
              backgroundColor: COLORS.lightBackground,
            },
          }}>
          {({route}) => <SudokuScreen board={route.params.board} />}
        </RootStack.Screen>
        <RootStack.Screen
          name="BoardChooser"
          component={BoardChooser}
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
          options={{
            title: '',
            headerStyle: {
              backgroundColor: COLORS.lightBackground,
            },
          }}>
          {({route, navigation}) => (
            <CreateScreen board={route.params.board} navigation={navigation} />
          )}
        </RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
