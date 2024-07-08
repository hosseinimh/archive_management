<?php

use App\Constants\Year;
use App\Constants\DocumentNo;

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'document_year_required' => $requiredMessage('سال مالی سند'),
    'document_year_numeric' => $numericMessage('سال مالی سند'),
    'document_year_gte' => $gteNumericMessage('سال مالی سند', Year::MIN_YEAR),
    'document_year_lte' => $lteNumericMessage('سال مالی سند', Year::MAX_YEAR),
    'document_no_required' => $requiredMessage('شماره سند'),
    'document_no_numeric' => $numericMessage('شماره سند'),
    'document_no_gte' => $gteNumericMessage('شماره سند', DocumentNo::MIN_DOCUMENT_NO),
    'document_no_lte' => $lteNumericMessage('شماره سند', DocumentNo::MAX_DOCUMENT_NO),
    'document_no_unique' => 'شماره سند تکراری است.',
    'document_date_numeric' => $numericMessage('تاریخ سند'),
    'document_date_gte' => 'مقدار فیلد تاریخ سند باید برابر یا بزرگ‌تر از 1400/01/01 باشد.',
    'payment_no_max' => $maxStringMessage('شناسه پرداخت سند', 50),
    'payment_date_numeric' => $numericMessage('تاریخ پرداخت سند'),
    'payment_date_gte' => 'مقدار فیلد تاریخ پرداخت سند باید برابر یا بزرگ‌تر از 1400/01/01 باشد.',
    'owner_max' => $maxStringMessage('صاحب سند', 50),
    'description_max' => $maxStringMessage('توضیحات', 1000),
    'documents' => 'اسناد',
    'excel_document_no' => 'شماره سند',
    'excel_document_date' => 'تاریخ سند',
    'excel_payment_no' => 'شناسه پرداخت سند',
    'excel_payment_date' => 'تاریخ پرداخت سند',
    'excel_owner' => 'صاحب سند',
    'excel_description' => 'توضیحات',
];
