// fetch wrapper with timeout
const DEFAULT_TIMEOUT = 10000

interface ApiError {
    message: string
    status?: number
}

const apiClient = async <T>(url: string, timeout = DEFAULT_TIMEOUT): Promise<T> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
            const error: ApiError = {
                message: `Request failed with status ${response.status}`,
                status: response.status,
            }
            throw error
        }

        const data = await response.json()
        return data as T
    } catch (err: any) {
        if (err.name === 'AbortError') {
            throw { message: 'Request timed out' } as ApiError
        }
        throw err
    } finally {
        clearTimeout(timeoutId)
    }
}

export default apiClient
export type { ApiError }
