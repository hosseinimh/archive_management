<?php

namespace App\Http\Controllers\User;

use App\Constants\ErrorCode;
use App\Constants\Status;
use App\Facades\Notification;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\LoginUserRequest as LoginRequest;
use App\Http\Requests\User\RequestTokenUserRequest;
use App\Packages\JsonResponse;
use App\Services\UserService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    public function __construct(JsonResponse $response, public UserService $service)
    {
        parent::__construct($response);
    }

    public function showAuth(): HttpJsonResponse
    {
        return $this->onItem($this->service->get(auth()->user()->id));
    }

    public function changePassword(ChangePasswordRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->changePassword(auth()->user(), $request->new_password));
    }

    public function login(LoginRequest $request): HttpJsonResponse
    {
        return $this->handleLogin(['username' => $request->username, 'password' => $request->password, 'is_active' => Status::ACTIVE]);
    }

    public function loginByGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function requestToken(RequestTokenUserRequest $request): HttpJsonResponse
    {
        $token = auth()->user()->createToken($request->token)->accessToken->token;
        if ($token) {
            return $this->onItem($token);
        }
        return $this->onError();
    }

    public function logout(): HttpJsonResponse
    {
        auth()->logout();
        return $this->onOk();
    }

    private function handleLogin(array $data): HttpJsonResponse
    {
        if (!auth()->attempt($data)) {
            return $this->onError(['_error' => __('user.user_not_found'), '_errorCode' => ErrorCode::USER_NOT_FOUND]);
        }
        Notification::onLoginSuccess(auth()->user());
        return $this->onItem($this->service->get(auth()->user()->id));
    }
}
