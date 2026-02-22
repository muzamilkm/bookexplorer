// navigator param list — keeps route params type-safe
export type RootStackParamList = {
    MainTabs: undefined
    BookDetail: { bookKey: string; title: string; coverId?: number }
}

export type BottomTabParamList = {
    Home: undefined
    Search: undefined
}
