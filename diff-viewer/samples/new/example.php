<?php

namespace App\Utils;

/**
 * Enhanced data formatter class
 */
class DataFormatter
{
    /**
     * @var string Default currency symbol
     */
    private $defaultCurrency = 'USD';

    /**
     * Format a date string
     *
     * @param string $date The date to format
     * @param string $format The format string
     * @return string Formatted date
     * @throws \InvalidArgumentException If date is invalid
     */
    public function formatDate($date, $format = 'Y-m-d')
    {
        $timestamp = strtotime($date);
        if ($timestamp === false) {
            throw new \InvalidArgumentException('Invalid date format');
        }
        return date($format, $timestamp);
    }

    /**
     * Format a number as currency
     *
     * @param float $amount The amount to format
     * @param string $currency Currency code
     * @return string Formatted currency
     */
    public function formatCurrency($amount, $currency = null)
    {
        $currency = $currency ?? $this->defaultCurrency;
        $symbols = [
            'USD' => '$',
            'EUR' => '€',
            'GBP' => '£'
        ];

        $symbol = $symbols[$currency] ?? $currency . ' ';
        return $symbol . number_format($amount, 2);
    }

    /**
     * Set the default currency
     *
     * @param string $currency Currency code
     * @return void
     */
    public function setDefaultCurrency($currency)
    {
        $this->defaultCurrency = $currency;
    }
}
