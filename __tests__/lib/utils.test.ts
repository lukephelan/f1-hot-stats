import { formatDateToLocal, generatePagination } from '@/app/lib/utils'

describe('utils', () => {
  describe('formatDateToLocal', () => {
    test('returns a date', () => {
      expect(formatDateToLocal('2017/05/17')).toBe('May 17, 2017')
    })
  })

  describe('generatePagination', () => {
    test('for first page', () => {
      expect(generatePagination(1, 10)).toEqual([1, 2, 3, '...', 9, 10])
    })
    test('for middle page', () => {
      expect(generatePagination(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10])
    })
    test('for last page', () => {
      expect(generatePagination(10, 10)).toEqual([1, 2, '...', 8, 9, 10])
    })
    test('for few pages', () => {
      expect(generatePagination(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
  })
})