import apiClient from './apiClient'
import { OPEN_LIBRARY_BASE, OPEN_LIBRARY_COVERS } from '../constants/api'
import { Book, BookDetail, AuthorDetail, SearchResult } from '../types/book'

// search books
export const searchBooks = async (
    query: string,
    page = 1,
    limit = 20,
): Promise<SearchResult> => {
    const encoded = encodeURIComponent(query)
    const fields = 'key,title,author_name,first_publish_year,cover_i,subject,edition_count'
    const url = `${OPEN_LIBRARY_BASE}/search.json?q=${encoded}&fields=${fields}&page=${page}&limit=${limit}`

    const data = await apiClient<any>(url)

    const books: Book[] = (data.docs || []).map((doc: any) => ({
        key: doc.key,
        title: doc.title,
        authorName: doc.author_name,
        firstPublishYear: doc.first_publish_year,
        coverId: doc.cover_i,
        subject: doc.subject?.slice(0, 5),
        editionCount: doc.edition_count,
    }))

    return {
        numFound: data.numFound,
        start: data.start,
        docs: books,
    }
}

// fetch work details by key
export const getBookDetail = async (workKey: string): Promise<BookDetail> => {
    // strip leading slash if needed
    const key = workKey.startsWith('/') ? workKey : `/${workKey}`
    const url = `${OPEN_LIBRARY_BASE}${key}.json`
    return apiClient<BookDetail>(url)
}

// author details
export const getAuthorDetail = async (authorKey: string): Promise<AuthorDetail> => {
    const key = authorKey.startsWith('/') ? authorKey : `/${authorKey}`
    const url = `${OPEN_LIBRARY_BASE}${key}.json`
    return apiClient<AuthorDetail>(url)
}

// cover image url
export const getCoverUrl = (coverId: number | undefined, size: 'S' | 'M' | 'L' = 'M'): string | null => {
    if (!coverId) return null
    return `${OPEN_LIBRARY_COVERS}/id/${coverId}-${size}.jpg`
}

// trending books by subject
export const getTrendingBooks = async (
    subject = 'fiction',
    limit = 20,
): Promise<Book[]> => {
    const url = `${OPEN_LIBRARY_BASE}/subjects/${subject}.json?limit=${limit}`
    const data = await apiClient<any>(url)

    return (data.works || []).map((work: any) => ({
        key: work.key,
        title: work.title,
        authorName: work.authors?.map((a: any) => a.name),
        firstPublishYear: work.first_publish_year,
        coverId: work.cover_id,
        editionCount: work.edition_count,
    }))
}
