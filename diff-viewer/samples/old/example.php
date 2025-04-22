<?php

namespace App\Utils;

/**
 * Simple data formatter class
 */
class DataFormatter
{
    /**
     * Format a date string
     *
     * @param string $date The date to format
     * @param string $format The format string
     * @return string Formatted date
     */
    public function formatDate($date, $format = 'Y-m-d')
    {
        return date($format, strtotime($date));
    }

    /**
     * Format a number as currency
     *
     * @param float $amount The amount to format
     * @param string $currency Currency code
     * @return string Formatted currency
     */
    public function formatCurrency($amount, $currency = 'USD')
    {
        return $currency . ' ' . number_format($amount, 2);
    }
}
