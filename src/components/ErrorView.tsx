import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../constants/colors'
import Spacing from '../constants/spacing'
import { FontSize } from '../constants/typography'

interface Props {
    message?: string
    onRetry?: () => void
}

const ErrorView = ({ message = 'Something went wrong', onRetry }: Props) => (
    <View style={styles.container}>
        <Text style={styles.emoji}>📖</Text>
        <Text style={styles.message}>{message}</Text>
        {onRetry ? (
            <TouchableOpacity style={styles.btn} onPress={onRetry} activeOpacity={0.7}>
                <Text style={styles.btnText}>Try Again</Text>
            </TouchableOpacity>
        ) : null}
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
        backgroundColor: Colors.background,
    },
    emoji: {
        fontSize: 48,
        marginBottom: Spacing.md,
    },
    message: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    btn: {
        marginTop: Spacing.lg,
        backgroundColor: Colors.primary,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    btnText: {
        color: Colors.white,
        fontSize: FontSize.sm,
        fontWeight: '600',
    },
})

export default ErrorView
