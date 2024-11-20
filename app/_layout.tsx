import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from './index';
import AddDishScreen from './AddDishScreen';
import FilterScreen from './FilterScreen';

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddDish" component={AddDishScreen} />
      <Stack.Screen name="Filter" component={FilterScreen} />
    </Stack.Navigator>

  )
}
