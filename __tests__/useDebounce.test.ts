import { renderHook, act } from '@testing-library/react-native'
import useDebounce from '../src/hooks/useDebounce'

jest.useFakeTimers()

describe('useDebounce', () => {
    it('returns initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('hello', 300))
        expect(result.current).toBe('hello')
    })

    it('updates value after delay', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'first' } },
        )

        rerender({ value: 'second' })
        expect(result.current).toBe('first')

        act(() => { jest.advanceTimersByTime(300) })
        expect(result.current).toBe('second')
    })

    it('resets timer on rapid changes', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } },
        )

        rerender({ value: 'ab' })
        act(() => { jest.advanceTimersByTime(100) })
        rerender({ value: 'abc' })
        act(() => { jest.advanceTimersByTime(100) })

        // should still be 'a' since timer keeps resetting
        expect(result.current).toBe('a')

        act(() => { jest.advanceTimersByTime(300) })
        expect(result.current).toBe('abc')
    })
})
