<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'document_file' => 'پیوست',
    'document_id_required' => $requiredMessage('شماره سند'),
    'document_id_numeric' => $numericMessage('شماره سند'),
    'document_id_gt' => $gtNumericMessage('شماره سند', 0),
    'description_max' => $maxStringMessage('توضیحات', 1000),
];
