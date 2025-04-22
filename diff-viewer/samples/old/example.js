/**
 * Calculator module
 * @module Calculator
 */

class Calculator {
  /**
   * Add two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @return {number} Sum of a and b
   */
  add(a, b) {
    return a + b;
  }

  /**
   * Subtract b from a
   * @param {number} a - First number
   * @param {number} b - Second number
   * @return {number} Difference of a and b
   */
  subtract(a, b) {
    return a - b;
  }

  /**
   * Multiply two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @return {number} Product of a and b
   */
  multiply(a, b) {
    return a * b;
  }
}

export default Calculator;
