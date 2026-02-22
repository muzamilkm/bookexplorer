import apiClient from './apiClient'
import { NYT_BASE, NYT_API_KEY } from '../constants/api'
import { NYTReview, NYTReviewResponse, NYTBestsellerBook } from '../types/nyt'

// reviews by title
export const getBookReviews = async (title: string): Promise<NYTReview[]> => {
    const encoded = encodeURIComponent(title)
    const url = `${NYT_BASE}/reviews.json?title=${encoded}&api-key=${NYT_API_KEY}`

    try {
        const data = await apiClient<NYTReviewResponse>(url)
        return data.results || []
    } catch (err) {
        // not all books have nyt reviews
        return []
    }
}

// bestseller list
export const getBestsellers = async (
    listName = 'hardcover-fiction',
): Promise<NYTBestsellerBook[]> => {
    const url = `${NYT_BASE}/lists/current/${listName}.json?api-key=${NYT_API_KEY}`

    try {
        const data = await apiClient<any>(url)
        return data.results?.books || []
    } catch (err) {
        return []
    }
}

// weekly bestseller overview
export const getBestsellerOverview = async (
    publishedDate?: string,
): Promise<any> => {
    const dateParam = publishedDate ? `&published_date=${publishedDate}` : ''
    const url = `${NYT_BASE}/lists/overview.json?api-key=${NYT_API_KEY}${dateParam}`

    try {
        const data = await apiClient<any>(url)
        return data.results?.lists || []
    } catch (err) {
        return []
    }
}
