<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'company_name_required' => $requiredMessage('نام شرکت'),
    'company_name_min' => $minStringMessage('نام شرکت', 2),
    'company_name_max' => $maxStringMessage('نام شرکت', 50),
    'serial_no_required' => $requiredMessage('شماره مسلسل'),
    'serial_no_min' => $minStringMessage('شماره مسلسل', 1),
    'serial_no_max' => $maxStringMessage('شماره مسلسل', 50),
    'registry_book_no_required' => $requiredMessage('شماره دفتر سهام‌داران'),
    'registry_book_no_min' => $minStringMessage('شماره دفتر سهام‌داران', 1),
    'registry_book_no_max' => $maxStringMessage('شماره دفتر سهام‌داران', 50),
    'register_no_required' => $requiredMessage('شماره ثبت شرکت'),
    'register_no_min' => $minStringMessage('شماره ثبت شرکت', 1),
    'register_no_max' => $maxStringMessage('شماره ثبت شرکت', 50),
];
