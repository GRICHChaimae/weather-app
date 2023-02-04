import react, { useState,useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../src/Home';
import Register from '../src/Register';
import Login from '../src/Login';
import Weather from '../src/Weather';


const Drawer = createDrawerNavigator();

export default function SideBar() {
  const [loged, setLoged] = useState('jjjjj')

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} options={{ headerTitle: '',     headerStyle: { backgroundColor: 'skyblue', } }}  />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Weather" component={Weather} 
          options={
            localStorage.getItem('jwt') ? { drawerLabel: () => 'weather' } : {
              drawerLabel: () => '',
          }
          }
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}