<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'document_no_required' => $requiredMessage('صاحب سند'),
    'document_no_unique' => 'این شماره سند تکراری است',
    'document_date_numeric' => $numericMessage('تاریخ سند'),
    'document_date_gte' => 'مقدار فیلد تاریخ سند باید برابر یا بزرگ‌تر از 1400/01/01 باشد.',
    'payment_no_max' => $maxStringMessage('شناسه پرداخت سند', 50),
    'payment_date_numeric' => $numericMessage('تاریخ پرداخت سند'),
    'payment_date_gte' => 'مقدار فیلد تاریخ پرداخت سند باید برابر یا بزرگ‌تر از 1400/01/01 باشد.',
    'owner_max' => $maxStringMessage('صاحب سند', 50),
    'description_max' => $maxStringMessage('توضیحات', 1000),
];
