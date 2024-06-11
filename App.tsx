import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import CustomIcon from './src/components/CustomIcon';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigator from './src/navigators/TabNavigator';

import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

const App = () => {


  useEffect(()=>{
    SplashScreen.hide();
  },[])


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>

        <Stack.Screen name='TabNavigator' component={TabNavigator} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name='Details' component={DetailsScreen} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name='Payment' component={PaymentScreen} options={{animation:'slide_from_bottom'}} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App
