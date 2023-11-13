<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class ChangePasswordRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'new_password' => 'required|confirmed|min:6|max:50',
        ];
    }

    public function messages()
    {
        return [
            'new_password.required' => __('user.new_password_required'),
            'new_password.min' => __('user.new_password_min'),
            'new_password.max' => __('user.new_password_max'),
            'new_password.confirmed' => __('user.new_password_confirmed'),
        ];
    }
}
