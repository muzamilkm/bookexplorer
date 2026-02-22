import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../types/navigation'
import Colors from '../constants/colors'
import { FontSize } from '../constants/typography'

type BookDetailRouteProp = RouteProp<RootStackParamList, 'BookDetail'>

const BookDetailScreen = () => {
    const { params } = useRoute<BookDetailRouteProp>()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{params.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    title: {
        fontSize: FontSize.lg,
        color: Colors.text,
        fontWeight: '700',
        textAlign: 'center',
    },
    sub: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginTop: 8,
    },
})

export default BookDetailScreen
