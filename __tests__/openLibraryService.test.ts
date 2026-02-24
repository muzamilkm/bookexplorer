import { searchBooks, getCoverUrl, getBookRatings } from '../src/services/openLibraryService'
import apiClient from '../src/services/apiClient'

jest.mock('../src/services/apiClient')
const mockApiClient = apiClient as jest.MockedFunction<typeof apiClient>

beforeEach(() => {
    jest.clearAllMocks()
})

describe('searchBooks', () => {
    it('maps api response to Book array', async () => {
        mockApiClient.mockResolvedValue({
            numFound: 1,
            start: 0,
            docs: [
                {
                    key: '/works/OL123W',
                    title: 'Test Book',
                    author_name: ['Author One'],
                    first_publish_year: 2020,
                    cover_i: 12345,
                    subject: ['Fiction', 'Drama', 'Adventure'],
                    edition_count: 5,
                },
            ],
        })

        const result = await searchBooks('test')
        expect(result.numFound).toBe(1)
        expect(result.docs).toHaveLength(1)
        expect(result.docs[0]).toEqual({
            key: '/works/OL123W',
            title: 'Test Book',
            authorName: ['Author One'],
            firstPublishYear: 2020,
            coverId: 12345,
            subject: ['Fiction', 'Drama', 'Adventure'],
            editionCount: 5,
        })
    })

    it('handles empty results', async () => {
        mockApiClient.mockResolvedValue({ numFound: 0, start: 0, docs: [] })

        const result = await searchBooks('nonexistent')
        expect(result.docs).toEqual([])
        expect(result.numFound).toBe(0)
    })
})

describe('getCoverUrl', () => {
    it('builds url with cover id and size', () => {
        const url = getCoverUrl(12345, 'M')
        expect(url).toContain('/id/12345-M.jpg')
    })

    it('returns null for undefined cover id', () => {
        expect(getCoverUrl(undefined)).toBeNull()
    })

    it('returns null for zero cover id', () => {
        expect(getCoverUrl(0)).toBeNull()
    })
})

describe('getBookRatings', () => {
    it('returns average and count', async () => {
        mockApiClient.mockResolvedValue({
            summary: { average: 4.2, count: 150 },
        })

        const rating = await getBookRatings('/works/OL123W')
        expect(rating.average).toBe(4.2)
        expect(rating.count).toBe(150)
    })

    it('returns zeros on error', async () => {
        mockApiClient.mockRejectedValue(new Error('network fail'))

        const rating = await getBookRatings('/works/OL999W')
        expect(rating.average).toBe(0)
        expect(rating.count).toBe(0)
    })
})
