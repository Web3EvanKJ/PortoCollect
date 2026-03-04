<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => '2020-01-01'
        ]);
        Category::insert(
            [
                [
                    'name' => 'Company Profile',
                    'slug' => 'company-profile',
                ],
                [
                    'name' => 'Personal Website',
                    'slug' => 'personal-website',
                ],
                [
                    'name' => 'Software As A Service',
                    'slug' => 'software-as-a-service',
                ],
                [
                    'name' => 'Others',
                    'slug' => 'others',
                ],
            ]
        );
    }
}
