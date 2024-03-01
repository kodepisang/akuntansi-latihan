<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // public function getActivitylogOptions(): LogOptions
    // {
    //     return LogOptions::defaults()
    //     ->logOnly(['title', 'slug', 'content'])
    //     ->setDescriptionForEvent(fn (string $eventName) => "This model has been {$eventName}")
    //     ->useLogName('Post');
    // }

    public function kredit()
    {
        return $this->hasMany(Kredit::class, 'user_id', 'id');
    }

    public function debit()
    {
        return $this->hasMany(Debit::class, 'user_id', 'id');
    }
}
