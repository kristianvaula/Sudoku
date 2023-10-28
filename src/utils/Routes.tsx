import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {Home} from '../screens/Home';
import {CreateScreen} from '../screens/CreateScreen';
import {SudokuScreen} from '../screens/SudokuScreen';

const Routes: React.FC = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" title="Home" component={Home} initial={true} />
        <Scene
          key="create_screen"
          title="CreateScreen"
          component={CreateScreen}
        />
        <Scene key="sudoku" title="Sudoku" component={SudokuScreen} />
      </Scene>
    </Router>
  );
};

export default Routes;
