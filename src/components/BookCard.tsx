import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/colors'
import { FontSize } from '../constants/typography'
import { getCoverUrl } from '../services/openLibraryService'
import { Book } from '../types/book'

interface BookCardProps {
    book: Book
    onPress: () => void
}

const BookCard = ({ book, onPress }: BookCardProps) => {
    const coverUri = getCoverUrl(book.coverId, 'M')

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            {coverUri ? (
                <Image source={{ uri: coverUri }} style={styles.cover} resizeMode="cover" />
            ) : (
                <View style={[styles.cover, styles.noCover]}>
                    <Text style={styles.noCoverText}>No Cover</Text>
                </View>
            )}
            <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
            <Text style={styles.author} numberOfLines={1}>
                {book.authorName?.[0] || 'Unknown'}
            </Text>
            {book.firstPublishYear && (
                <Text style={styles.year}>{book.firstPublishYear}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 140,
        marginRight: 14,
    },
    cover: {
        width: 140,
        height: 200,
        borderRadius: 12,
        backgroundColor: Colors.searchBg,
    },
    noCover: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    noCoverText: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
    },
    title: {
        fontSize: FontSize.sm,
        fontWeight: '600',
        color: Colors.text,
        marginTop: 8,
    },
    author: {
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    year: {
        fontSize: FontSize.xs,
        color: Colors.textMuted,
        marginTop: 2,
    },
})

export default BookCard
