<?php

namespace App\Services;

use App\Constants\Role;
use App\Models\User as Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(string|null $username, string|null $name, string|null $family, int $page, int $pageItems): mixed
    {
        return Model::where('username', 'LIKE', '%' . $username . '%')->where('name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->orderBy('family', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $username, string $password, string $name, string $family, string $mobile, int $role, int $isActive): mixed
    {
        $role = ($role >= Role::USER && $role <= Role::ADMINISTRATOR) ? $role : Role::USER;
        $isActive = $isActive > 0 ? 1 : 0;
        $data = [
            'username' => $username,
            'password' => $password,
            'name' => $name,
            'family' => $family,
            'mobile' => $mobile,
            'role' => $role,
            'is_active' => $isActive,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $name, string $family, string $mobile, int $role, int $isActive): bool
    {
        $role = ($role >= Role::USER && $role <= Role::ADMINISTRATOR) ? $role : Role::USER;
        $isActive = $isActive > 0 ? 1 : 0;
        $data = [
            'name' => $name,
            'family' => $family,
            'mobile' => $mobile,
            'role' => $role,
            'is_active' => $isActive,
        ];

        return $model->update($data);
    }

    public function changePassword(Model $user, string $password): bool
    {
        $password = Hash::make($password);

        return DB::statement("UPDATE `tbl_users` SET `password`='$password' WHERE `id`=$user->id");
    }

    public function count(string|null $username, string|null $name, string|null $family): int
    {
        return Model::where('username', 'LIKE', '%' . $username . '%')->where('name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->count();
    }

    public function countAll(): int
    {
        return Model::count();
    }
}
