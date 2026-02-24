import { getBookReviews } from '../src/services/nyTimesService'
import apiClient from '../src/services/apiClient'

jest.mock('../src/services/apiClient')
const mockApiClient = apiClient as jest.MockedFunction<typeof apiClient>

beforeEach(() => {
    jest.clearAllMocks()
})

describe('getBookReviews', () => {
    it('returns articles from nyt', async () => {
        const mockArticle = {
            headline: { main: 'Great Book Review' },
            abstract: 'A review of a great book',
            byline: { original: 'By Someone' },
            web_url: 'https://nyt.com/review',
            pub_date: '2024-01-01',
        }
        mockApiClient.mockResolvedValue({
            status: 'OK',
            response: { docs: [mockArticle] },
        })

        const reviews = await getBookReviews('Great Book')
        expect(reviews).toHaveLength(1)
        expect(reviews[0].headline.main).toBe('Great Book Review')
    })

    it('returns empty array on error', async () => {
        mockApiClient.mockRejectedValue(new Error('401'))

        const reviews = await getBookReviews('Anything')
        expect(reviews).toEqual([])
    })

    it('handles missing docs', async () => {
        mockApiClient.mockResolvedValue({
            status: 'OK',
            response: { docs: [] },
        })

        const reviews = await getBookReviews('Unknown Book')
        expect(reviews).toEqual([])
    })
})
