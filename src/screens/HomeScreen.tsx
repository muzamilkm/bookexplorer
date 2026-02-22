import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Colors from '../constants/colors'
import Spacing from '../constants/spacing'
import { FontSize } from '../constants/typography'
import { RootStackParamList } from '../types/navigation'
import { Book } from '../types/book'
import { getTrendingBooks } from '../services/openLibraryService'
import BookCard from '../components/BookCard'

type NavProp = StackNavigationProp<RootStackParamList, 'MainTabs'>

const HomeScreen = () => {
    const navigation = useNavigation<NavProp>()
    const [featured, setFeatured] = useState<Book[]>([])
    const [popular, setPopular] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadBooks()
    }, [])

    const loadBooks = async () => {
        try {
            const [fictionBooks, scienceBooks] = await Promise.all([
                getTrendingBooks('fiction', 10),
                getTrendingBooks('science', 10),
            ])
            setFeatured(fictionBooks)
            setPopular(scienceBooks)
        } catch (err) {
            console.log('failed to load books:', err)
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

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Book Explorer</Text>

            {/* featured section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Featured Fiction</Text>
                <FlatList
                    data={featured}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={styles.horizontalList}
                    renderItem={({ item }) => (
                        <BookCard book={item} onPress={() => handleBookPress(item)} />
                    )}
                />
            </View>

            {/* popular section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular in Science</Text>
                <FlatList
                    data={popular}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={styles.horizontalList}
                    renderItem={({ item }) => (
                        <BookCard book={item} onPress={() => handleBookPress(item)} />
                    )}
                />
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
    header: {
        fontSize: FontSize.xxl,
        fontWeight: '700',
        color: Colors.text,
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.xl,
        paddingBottom: Spacing.sm,
    },
    section: {
        marginTop: Spacing.lg,
    },
    sectionTitle: {
        fontSize: FontSize.lg,
        fontWeight: '600',
        color: Colors.text,
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
    },
    horizontalList: {
        paddingHorizontal: Spacing.lg,
    },
})

export default HomeScreen
