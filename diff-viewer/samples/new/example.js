/**
 * Enhanced Calculator module
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
    // Added input validation
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
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

  /**
   * Divide a by b
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @return {number} Quotient of a and b
   * @throws {Error} If divisor is zero
   */
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
}
export default Calculator;