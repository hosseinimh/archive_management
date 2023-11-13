<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_notifications';

    protected $fillable = [
        'type',
        'category',
        'sub_category',
        'message_fields',
        'priority',
        'user_id',
        'seen_at',
    ];
}
