import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from './BottomTabNavigator'
import BookDetailScreen from '../screens/BookDetailScreen'
import Colors from '../constants/colors'
import { RootStackParamList } from '../types/navigation'

const Stack = createStackNavigator<RootStackParamList>()

const RootNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.white,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0.5,
                    borderBottomColor: Colors.border,
                },
                headerTintColor: Colors.text,
                headerTitleStyle: { fontWeight: '600', fontSize: 18 },
                cardStyle: { backgroundColor: Colors.background },
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
