/**
 * Enhanced Calculator Class
 * Provides basic arithmetic operations with advanced features
 */
class Calculator {
    constructor() {
        this.result = 0;
        this.history = [];
        this.precision = 2;
    }

    add(a, b) {
        const result = parseFloat((a + b).toFixed(this.precision));
        this.history.push({
            operation: 'addition',
            operands: [a, b],
            result: result,
            timestamp: new Date().toISOString()
        });
        return result;
    }

    subtract(a, b) {
        const result = parseFloat((a - b).toFixed(this.precision));
        this.history.push({
            operation: 'subtraction',
            operands: [a, b],
            result: result,
            timestamp: new Date().toISOString()
        });
        return result;
    }

    multiply(a, b) {
        const result = parseFloat((a * b).toFixed(this.precision));
        this.history.push({
            operation: 'multiplication',
            operands: [a, b],
            result: result,
            timestamp: new Date().toISOString()
        });
        return result;
    }

    divide(a, b) {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        const result = parseFloat((a / b).toFixed(this.precision));
        this.history.push({
            operation: 'division',
            operands: [a, b],
            result: result,
            timestamp: new Date().toISOString()
        });
        return result;
    }

    power(a, b) {
        const result = parseFloat(Math.pow(a, b).toFixed(this.precision));
        this.history.push({
            operation: 'power',
            operands: [a, b],
            result: result,
            timestamp: new Date().toISOString()
        });
        return result;
    }

    getHistory() {
        return this.history;
    }

    clearHistory() {
        this.history = [];
    }

    setPrecision(precision) {
        this.precision = Math.max(0, Math.min(10, precision));
    }

    getStatistics() {
        const operations = this.history.map(h => h.operation);
        const stats = {};
        operations.forEach(op => {
            stats[op] = (stats[op] || 0) + 1;
        });
        return stats;
    }
}

module.exports = Calculator;
