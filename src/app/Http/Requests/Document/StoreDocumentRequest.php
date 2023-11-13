<?php

namespace App\Http\Requests\Document;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreDocumentRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'document_no' => 'required|unique:tbl_documents',
            'document_date' => 'sometimes|numeric|gte:14000101',
            'payment_no' => 'max:50',
            'payment_date' => 'sometimes|numeric|gte:14000101',
            'owner' => 'max:50',
            'description' => 'max:1000',
        ];
    }

    public function messages()
    {
        return [
            'document_no.required' => __('document.document_no_required'),
            'document_no.unique' => __('document.document_no_unique'),
            'document_date.numeric' => __('document.document_date_numeric'),
            'document_date.gte' => __('document.document_date_gte'),
            'payment_no.max' => __('document.payment_no_max'),
            'payment_date.numeric' => __('document.payment_date_numeric'),
            'payment_date.gte' => __('document.payment_date_gte'),
            'owner.max' => __('document.owner_max'),
            'description.max' => __('document.description_max'),
        ];
    }
}
