<?php

use App\Constants\NotificationPriority;
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
        Schema::create('tbl_notifications', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedTinyInteger('type');
            $table->unsignedTinyInteger('category');
            $table->unsignedTinyInteger('sub_category');
            $table->string('message_fields');
            $table->unsignedTinyInteger('priority')->default(NotificationPriority::NORMAL);
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamp('seen_at')->nullable();
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
        Schema::table('tbl_notifications', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
