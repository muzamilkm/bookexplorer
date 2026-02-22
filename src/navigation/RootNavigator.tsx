import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from './BottomTabNavigator'
import BookDetailScreen from '../screens/BookDetailScreen'
import Colors from '../constants/colors'
import { RootStackParamList } from '../types/navigation'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.white,
                },
                headerShadowVisible: false,
                headerTintColor: Colors.text,
                headerTitleStyle: { fontWeight: '600', fontSize: 18 },
                contentStyle: { backgroundColor: Colors.background },
            }}
        >
            <Stack.Screen
                name="MainTabs"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BookDetail"
                component={BookDetailScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
        </Stack.Navigator>
    )
}

export default RootNavigator
