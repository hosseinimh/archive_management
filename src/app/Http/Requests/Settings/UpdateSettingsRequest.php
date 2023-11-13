<?php

namespace App\Http\Requests\Settings;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateSettingsRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'company_name' => 'required|min:2|max:50',
            'serial_no' => 'required|min:1|max:50',
            'registry_book_no' => 'required|min:1|max:50',
            'register_no' => 'required|min:1|max:50',
        ];
    }

    public function messages()
    {
        return [
            'company_name.required' => __('settings.company_name_required'),
            'company_name.min' => __('settings.company_name_min'),
            'company_name.max' => __('settings.company_name_max'),
            'serial_no.required' => __('settings.serial_no_required'),
            'serial_no.min' => __('settings.serial_no_min'),
            'serial_no.max' => __('settings.serial_no_max'),
            'registry_book_no.required' => __('settings.registry_book_no_required'),
            'registry_book_no.min' => __('settings.registry_book_no_min'),
            'registry_book_no.max' => __('settings.registry_book_no_max'),
            'register_no.required' => __('settings.register_no_required'),
            'register_no.min' => __('settings.register_no_min'),
            'register_no.max' => __('settings.register_no_max'),
        ];
    }
}
