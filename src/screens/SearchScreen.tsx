import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/colors'
import { FontSize } from '../constants/typography'

const SearchScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Search Book</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: FontSize.xl,
        color: Colors.text,
        fontWeight: '700',
    },
    sub: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginTop: 8,
    },
})

export default SearchScreen
