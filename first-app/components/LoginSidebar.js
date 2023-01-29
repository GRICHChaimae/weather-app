import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../src/Home';
import Register from '../src/Register';
import Login from '../src/Login';
import Weather from '../src/Weather';


const Drawer = createDrawerNavigator();

export default function SideBar() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name={localStorage.getItem('jwt') ? "Weather" : '' } component={Weather} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}