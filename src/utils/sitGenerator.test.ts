import { describe, it, expect } from 'vitest'
import { luhnCheck, pickRandom } from './sitGenerator'

describe('luhnCheck', () => {
  it('should validate a correct Luhn card number', () => {
    // 49927398716 is a valid Luhn number
    expect(luhnCheck('49927398716')).toBe(true)
  })

  it('should invalidate an incorrect Luhn card number', () => {
    // 49927398717 is an invalid Luhn number
    expect(luhnCheck('49927398717')).toBe(false)
  })
})

describe('pickRandom', () => {
  it('should return an item from the array', () => {
    const arr = ['apple', 'banana', 'cherry']
    const picked = pickRandom(arr)
    expect(arr).toContain(picked)
  })
})
