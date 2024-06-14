<?php

namespace App\Http\Requests\Document;

use App\Constants\DocumentNo;
use App\Constants\ErrorCode;
use App\Constants\Year;
use Closure;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class IndexDocumentsRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'document_no' => [function (string $attribute, mixed $value, Closure $fail) {
                if ($value === null) {
                    $fail(__('document.document_no_required'));
                }
                $items = explode('/', $value);
                if (count($items) !== 2) {
                    $fail(__('document.document_no_valid'));
                    return;
                }
                $year = intval($items[0]);
                $documentNo = intval($items[1]);
                if ($year < Year::MIN_YEAR || $year > Year::MAX_YEAR || $documentNo < 0 || $documentNo > DocumentNo::MAX_DOCUMENT_NO) {
                    $fail(__('document.document_no_valid'));
                    return;
                }
            },],
            'document_date' => 'sometimes|numeric|gte:14000101',
            'payment_no' => 'max:50',
            'payment_date' => 'sometimes|numeric|gte:14000101',
            'owner' => 'max:50',
        ];
    }

    public function messages()
    {
        return [
            'document_date.numeric' => __('document.document_date_numeric'),
            'document_date.gte' => __('document.document_date_gte'),
            'payment_no.max' => __('document.payment_no_max'),
            'payment_date.numeric' => __('document.payment_date_numeric'),
            'payment_date.gte' => __('document.payment_date_gte'),
            'owner.max' => __('document.owner_max'),
        ];
    }
}
