import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Colors from '../constants/colors'
import Spacing from '../constants/spacing'
import { FontSize } from '../constants/typography'
import { RootStackParamList } from '../types/navigation'
import { Book } from '../types/book'
import { searchBooks, getCoverUrl } from '../services/openLibraryService'
import useDebounce from '../hooks/useDebounce'

type NavProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>

const SearchScreen = () => {
    const navigation = useNavigation<NavProp>()
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)
    const debouncedQuery = useDebounce(query, 400)

    useEffect(() => {
        if (debouncedQuery.trim().length < 2) {
            setResults([])
            return
        }
        handleSearch(debouncedQuery)
    }, [debouncedQuery])

    const handleSearch = async (q: string) => {
        setLoading(true)
        try {
            const data = await searchBooks(q, 1, 20)
            setResults(data.docs)
        } catch (err) {
            console.log('search error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleBookPress = (book: Book) => {
        navigation.navigate('BookDetail', {
            bookKey: book.key,
            title: book.title,
            coverId: book.coverId,
        })
    }

    const renderItem = ({ item }: { item: Book }) => {
        const coverUri = getCoverUrl(item.coverId, 'S')

        return (
            <TouchableOpacity style={styles.row} onPress={() => handleBookPress(item)}>
                {coverUri ? (
                    <Image source={{ uri: coverUri }} style={styles.thumb} />
                ) : (
                    <View style={[styles.thumb, styles.noThumb]} />
                )}
                <View style={styles.rowInfo}>
                    <Text style={styles.rowTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.rowAuthor} numberOfLines={1}>
                        {item.authorName?.[0] || 'Unknown'}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Search Book</Text>
            <View style={styles.searchBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor={Colors.textMuted}
                    value={query}
                    onChangeText={setQuery}
                    autoCorrect={false}
                />
            </View>

            {loading && (
                <ActivityIndicator style={styles.loader} color={Colors.primary} />
            )}

            <FlatList
                data={results}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        fontSize: FontSize.lg,
        fontWeight: '600',
        color: Colors.text,
        textAlign: 'center',
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.sm,
    },
    searchBox: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
    },
    input: {
        backgroundColor: Colors.searchBg,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: FontSize.md,
        color: Colors.text,
    },
    loader: {
        marginTop: Spacing.md,
    },
    list: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.sm,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.border,
    },
    thumb: {
        width: 40,
        height: 56,
        borderRadius: 4,
        backgroundColor: Colors.searchBg,
    },
    noThumb: {
        borderWidth: 1,
        borderColor: Colors.border,
    },
    rowInfo: {
        flex: 1,
        marginLeft: 12,
    },
    rowTitle: {
        fontSize: FontSize.md,
        fontWeight: '500',
        color: Colors.primary,
    },
    rowAuthor: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginTop: 2,
    },
})

export default SearchScreen
