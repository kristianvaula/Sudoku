import React, {useEffect} from 'react';
import {Home} from './src/screens/Home';
import {SudokuScreen} from './src/screens/SudokuScreen';
import {CreateScreen} from './src/screens/CreateScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, SudokuBoard} from './src/types/types';
import {COLORS} from './src/values/colors';
import {StartMenu} from './src/screens/StartMenu';
import {initDefaultBoards} from './src/utils/StorageUtil';
import {BoardProvider} from './src/utils/StateUtil';
import {BoardPicker} from './src/screens/BoardPicker';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  useEffect(() => {
    initDefaultBoards();
  }, []);

  const initialState = {
    board: undefined,
  };

  const reducer = (
    state: SudokuBoard,
    action: {type: string; payload: SudokuBoard},
  ) => {
    switch (action.type) {
      case 'SET_BOARD':
        return {
          ...state,
          board: action.payload,
        };
      default:
        return state;
    }
  };

  return (
    <BoardProvider initialState={initialState} reducer={reducer}>
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
              headerTintColor: COLORS.white,
            }}>
            {({route, navigation}) => (
              <SudokuScreen
                board={route.params.board}
                navigation={navigation}
              />
            )}
          </RootStack.Screen>
          <RootStack.Screen
            name="StartMenu"
            component={StartMenu}
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
              headerTintColor: COLORS.white,
            }}>
            {({route, navigation}) => (
              <CreateScreen
                board={route.params.board}
                navigation={navigation}
              />
            )}
          </RootStack.Screen>
          <RootStack.Screen
            name="BoardPicker"
            options={{
              title: '',
              headerStyle: {
                backgroundColor: COLORS.lightBackground,
              },
              headerTintColor: COLORS.white,
            }}>
            {({route, navigation}) => (
              <BoardPicker
                boards={route.params.boards}
                navigation={navigation}
              />
            )}
          </RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
    </BoardProvider>
  );
}

export default App;
