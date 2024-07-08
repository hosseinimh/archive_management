<?php

namespace App\Http\Requests\Document;

use App\Constants\Year;
use App\Constants\DocumentNo;
use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class ExcelDocumentsRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'document_year' => 'required|numeric|gte:' . Year::MIN_YEAR . '|lte:' . Year::MAX_YEAR,
            'document_no' => 'sometimes|numeric|gte:' . DocumentNo::MIN_DOCUMENT_NO . '|lte:' . DocumentNo::MAX_DOCUMENT_NO,
            'document_date' => 'sometimes|numeric|gte:14000101',
            'payment_no' => 'max:50',
            'payment_date' => 'sometimes|numeric|gte:14000101',
            'owner' => 'max:50',
        ];
    }

    public function messages()
    {
        return [
            'document_year.required' => __('document.document_year_required'),
            'document_year.numeric' => __('document.document_year_numeric'),
            'document_year.gte' => __('document.document_year_gte'),
            'document_year.lte' => __('document.document_year_lte'),
            'document_no.numeric' => __('document.document_no_numeric'),
            'document_no.gte' => __('document.document_no_gte'),
            'document_no.lte' => __('document.document_no_lte'),
            'document_date.numeric' => __('document.document_date_numeric'),
            'document_date.gte' => __('document.document_date_gte'),
            'payment_no.max' => __('document.payment_no_max'),
            'payment_date.numeric' => __('document.payment_date_numeric'),
            'payment_date.gte' => __('document.payment_date_gte'),
            'owner.max' => __('document.owner_max'),
        ];
    }
}
