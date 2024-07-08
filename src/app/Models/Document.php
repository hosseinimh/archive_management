<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_documents';
    protected $fillable = [
        'document_year',
        'document_no',
        'document_date',
        'payment_no',
        'payment_date',
        'owner',
        'description',
        'user_id',
    ];
}
