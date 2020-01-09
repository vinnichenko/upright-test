import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MainScreen, DetailsScreen } from '../screens';

export default createAppContainer(createStackNavigator({
  Home: {
    screen: MainScreen
  },
  Details: {
    screen: DetailsScreen
  }
}));
