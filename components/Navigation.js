import { createStackNavigator } from '@react-navigation/stack';
import EplScreen from '../screens/EplScreen';
import OtherScreen from '../screens/OtherScreen';
import Epl from './competitions/epl';

const Stack = createStackNavigator();

export default function Navigatiom() {
  return (
    <Stack.Navigator>
     
      <Stack.Screen name="Epl" component={Epl} />
    </Stack.Navigator>
  );
}