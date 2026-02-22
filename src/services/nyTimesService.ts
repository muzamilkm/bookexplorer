import apiClient from './apiClient'
import { NYT_BASE, NYT_API_KEY } from '../constants/api'
import { NYTArticle, NYTSearchResponse } from '../types/nyt'

// search nyt for book reviews
export const getBookReviews = async (title: string): Promise<NYTArticle[]> => {
    const encoded = encodeURIComponent(title)
    const filter = encodeURIComponent('typeOfMaterials:Review AND section.name:Books')
    const url = `${NYT_BASE}/articlesearch.json?q=${encoded}&fq=${filter}&api-key=${NYT_API_KEY}`

    try {
        const data = await apiClient<NYTSearchResponse>(url)
        return data.response?.docs || []
    } catch (err) {
        // not all books have nyt reviews
        return []
    }
}
