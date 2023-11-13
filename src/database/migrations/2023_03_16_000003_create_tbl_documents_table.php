<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_documents', function (Blueprint $table) {
            $table->id();
            $table->string('document_no')->unique();
            $table->string('document_date')->nullable();
            $table->string('payment_no')->nullable();
            $table->string('payment_date')->nullable();
            $table->string('owner')->nullable();
            $table->string('description')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('tbl_users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_documents', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
