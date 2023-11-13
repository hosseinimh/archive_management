<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreUserRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'username' => 'required|unique:tbl_users|min:5|max:50',
            'password' => 'required|confirmed|min:6|max:50',
            'name' => 'required|min:3|max:50',
            'family' => 'required|min:3|max:50',
            'mobile' => 'required|digits:11',
        ];
    }

    public function messages()
    {
        return [
            'username.required' => __('user.username_required'),
            'username.unique' => __('user.username_unique'),
            'username.min' => __('user.username_min'),
            'username.max' => __('user.username_max'),
            'password.required' => __('user.password_required'),
            'password.numeric' => __('user.password_numeric'),
            'password.digits' => __('user.password_digits'),
            'password.confirmed' => __('user.password_confirmed'),
            'name.required' => __('user.name_required'),
            'name.min' => __('user.name_min'),
            'name.max' => __('user.name_max'),
            'family.required' => __('user.family_required'),
            'family.min' => __('user.family_min'),
            'family.max' => __('user.family_max'),
            'mobile.required' => __('user.mobile_required'),
            'mobile.digits' => __('user.mobile_digits'),
        ];
    }
}
