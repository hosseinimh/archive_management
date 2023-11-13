<?php

namespace Database\Seeders;

use App\Constants\Role;
use App\Constants\Status;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create(['username' => 'admin', 'name' => 'مصطفی', 'family' => 'اکبری', 'mobile' => '09151260936', 'role' => Role::ADMINISTRATOR, 'is_active' => Status::ACTIVE]);
    }
}
