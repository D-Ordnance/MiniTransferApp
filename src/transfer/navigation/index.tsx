import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/home'
import History from '../screen/history'
import HistoryDetails from '../screen/historyDetails'

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import { saveItem } from '../../util/storage';
import { BALANCE } from '../../util/constant';

const AppContainer = () => {
  const Stack = createNativeStackNavigator();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return(
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{headerShown: false}}/>
          <Stack.Screen
          name='History'
          component={History}
          options={{headerShown: false}}/>
          <Stack.Screen
          name='History Details'
          component={HistoryDetails}
          options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
  
};

export default AppContainer;
