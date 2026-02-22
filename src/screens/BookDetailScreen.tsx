import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../types/navigation'
import { BookDetail } from '../types/book'
import { getBookDetail, getCoverUrl } from '../services/openLibraryService'
import Colors from '../constants/colors'
import Spacing from '../constants/spacing'
import { FontSize } from '../constants/typography'

type DetailRoute = RouteProp<RootStackParamList, 'BookDetail'>

const BookDetailScreen = () => {
    const { params } = useRoute<DetailRoute>()
    const [book, setBook] = useState<BookDetail | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDetail()
    }, [])

    const fetchDetail = async () => {
        try {
            const data = await getBookDetail(params.bookKey)
            setBook(data)
        } catch (err) {
            console.log('detail fetch failed:', err)
        } finally {
            setLoading(false)
        }
    }

    // description can be string or { value: string }
    const getDescription = (): string => {
        if (!book?.description) return ''
        if (typeof book.description === 'string') return book.description
        return book.description.value || ''
    }

    const coverUri = getCoverUrl(params.coverId, 'L')

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.coverWrap}>
                {coverUri ? (
                    <Image source={{ uri: coverUri }} style={styles.cover} resizeMode="contain" />
                ) : (
                    <View style={[styles.cover, styles.noCover]}>
                        <Text style={styles.noCoverText}>No Cover</Text>
                    </View>
                )}
            </View>

            <View style={styles.info}>
                <Text style={styles.title}>{params.title}</Text>

                {book?.authors && book.authors.length > 0 ? (
                    <Text style={styles.author}>
                        {book.authors.map(a => a.author.key.split('/').pop()).join(', ')}
                    </Text>
                ) : null}

                {book?.firstPublishDate ? (
                    <Text style={styles.year}>{book.firstPublishDate}</Text>
                ) : null}

                {book?.subjects && book.subjects.length > 0 ? (
                    <View style={styles.tags}>
                        {book.subjects.slice(0, 5).map((s, i) => (
                            <View key={i} style={styles.tag}>
                                <Text style={styles.tagText}>{s}</Text>
                            </View>
                        ))}
                    </View>
                ) : null}

                {getDescription() ? (
                    <Text style={styles.description}>{getDescription()}</Text>
                ) : null}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    coverWrap: {
        alignItems: 'center',
        paddingVertical: Spacing.xl,
        backgroundColor: Colors.surface,
    },
    cover: {
        width: 180,
        height: 270,
        borderRadius: 12,
    },
    noCover: {
        backgroundColor: Colors.searchBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    noCoverText: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
    },
    info: {
        padding: Spacing.lg,
    },
    title: {
        fontSize: FontSize.xl,
        fontWeight: '700',
        color: Colors.text,
    },
    author: {
        fontSize: FontSize.md,
        color: Colors.primary,
        marginTop: 6,
    },
    year: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: Spacing.md,
        gap: 6,
    },
    tag: {
        backgroundColor: Colors.searchBg,
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    tagText: {
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
    },
    description: {
        fontSize: FontSize.md,
        color: Colors.text,
        lineHeight: 24,
        marginTop: Spacing.lg,
    },
})

export default BookDetailScreen
