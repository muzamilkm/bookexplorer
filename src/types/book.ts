// TypeScript types for book data from Open Library

export interface Book {
    key: string          // work key e.g. /works/OL45804W
    title: string
    authorName?: string[]
    firstPublishYear?: number
    coverId?: number
    subject?: string[]
    editionCount?: number
}

export interface BookDetail {
    key: string
    title: string
    authors?: { author: { key: string } }[]
    description?: string | { value: string }
    covers?: number[]
    subjects?: string[]
    firstPublishDate?: string
}

export interface AuthorDetail {
    key: string
    name: string
    bio?: string | { value: string }
    photos?: number[]
}

export interface SearchResult {
    numFound: number
    start: number
    docs: Book[]
}
