<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'sub_category_undefined' => 'نامشخص',
    'sub_category_111' => 'ورود موفق به حساب',
    'sub_category_211' => 'ثبت تیکت پشتیبانی',
    'sub_category_212' => 'ثبت تیکت پشتیبانی',
    'sub_category_213' => 'ثبت پیام در تیکت پشتیبانی',
    'sub_category_214' => 'ثبت پیام در تیکت پشتیبانی',
    'sub_category_text_undefined' => 'نامشخص',
    'sub_category_text_111' => 'ورود موفق به حساب کاربری در تاریخ :field1 ساعت :field2 با دستگاه :field3',
    'sub_category_text_121' => 'تایید پست الکترونیک در تاریخ :field1 ساعت :field2',
    'sub_category_text_122' => 'درخواست احراز هویت توسط \':field1 :field2\' [ :field3 ]',
    'sub_category_text_123' => 'تایید احراز هویت در تاریخ :field1 ساعت :field2',
    'sub_category_text_124' => 'رد درخواست احراز هویت به علت \':field1\' در تاریخ :field2 ساعت :field3',
    'sub_category_text_211' => 'ارسال تیکت #:field1 با موضوع \':field2\' توسط \':field3 :field4\' [ :field5 ]',
    'sub_category_text_212' => 'ارسال تیکت #:field1 با موضوع \':field2\' توسط \':field3 :field4\' [ مدیریت ]',
    'sub_category_text_213' => 'ارسال پیام در تیکت #:field1 با موضوع \':field2\' توسط \':field3 :field4\' [ :field5 ]',
    'sub_category_text_214' => 'پاسخ به تیکت #:field1 با موضوع \':field2\' توسط \':field3 :field4\' [ مدیریت ]',
    'category_numeric' => $numericMessage('دسته‌بندی'),
    'category_gte' => $gteNumericMessage('دسته‌بندی', 0),
];
