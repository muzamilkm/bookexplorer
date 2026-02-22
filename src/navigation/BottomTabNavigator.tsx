import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import Colors from '../constants/colors'
import { BottomTabParamList } from '../types/navigation'

const Tab = createBottomTabNavigator<BottomTabParamList>()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.white,
                    borderTopColor: Colors.border,
                    borderTopWidth: 0.5,
                    elevation: 8,
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textMuted,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📚</Text>,
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🔍</Text>,
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator
