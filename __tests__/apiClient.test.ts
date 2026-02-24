import apiClient from '../src/services/apiClient'

// mock fetch globally
global.fetch = jest.fn()

beforeEach(() => {
    jest.clearAllMocks()
})

describe('apiClient', () => {
    it('returns parsed json on success', async () => {
        const mockData = { title: 'test book' }
            ; (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockData),
            })

        const result = await apiClient('https://example.com/api')
        expect(result).toEqual(mockData)
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('throws on non-ok response', async () => {
        ; (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 404,
        })

        await expect(apiClient('https://example.com/api')).rejects.toEqual({
            message: 'Request failed with status 404',
            status: 404,
        })
    })

    it('throws timeout error on abort', async () => {
        ; (fetch as jest.Mock).mockImplementation(() =>
            new Promise((_, reject) => {
                const err = new Error('Aborted')
                err.name = 'AbortError'
                setTimeout(() => reject(err), 50)
            }),
        )

        await expect(apiClient('https://example.com/api', 10)).rejects.toEqual({
            message: 'Request timed out',
        })
    })
})
