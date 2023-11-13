<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DocumentFile extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_document_files';
    protected $fillable = [
        'path',
        'name',
        'description',
        'document_id',
        'user_id',
    ];
}
