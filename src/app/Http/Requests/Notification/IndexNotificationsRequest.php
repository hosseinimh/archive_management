<?php

namespace App\Http\Requests\Notification;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class IndexNotificationsRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'category' => 'numeric|gte:0',
        ];
    }

    public function messages()
    {
        return [
            'category.numeric' => __('notification.category_numeric'),
            'category.gte' => __('notification.category_gte'),
        ];
    }
}
