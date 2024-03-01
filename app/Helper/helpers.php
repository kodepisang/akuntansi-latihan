<?php

function ActivityLoginAPi($user)
{
    activity()
        ->useLog('Login')
        ->causedBy($user)
        ->event('verified')
        ->log('login api');
}

function ActivityLoginWeb($request)
{
    $date = date('Y-m-d H:i:s');
    activity()
        ->useLog('Login')
        ->causedBy($request->user())
        ->event('verified')
        ->withProperties(['date' => $date, 'ip' => $request->ip()])
        ->log('login with web');
}
function ActivityRegisterWeb($request)
{
    $date = date('Y-m-d H:i:s');
    activity()
        ->useLog('Register')
        ->causedBy($request->user())
        ->event('Store')
        ->withProperties(['date' => $date, 'name' => $request->name])
        ->log('Register with web');
}
function ActivityLogOutWeb($user, $request)
{

    $date = date('Y-m-d H:i:s');
    activity()
        ->useLog('Logout')
        ->event('destroy')
        ->withProperties(['date' => $date, 'user_name' => $user->name, 'user_id' => $user->id, 'email' => $user->email, 'role' => $user->role, 'ip' => $request->ip()])
        ->log('logout with web');
}
function ActivityTransaksiDebit($user, $request)
{
    $date = date('Y-m-d H:i:s');
    activity()
        ->useLog('Post')
        ->event('store')
        ->withProperties(['date' => $date, 'user_name' => $user->name, 'user_id' => $user->id, 'email' => $user->email, 'role' => $user->role, 'flag' => 'debit', 'description' => $request->description, 'amount' => $request->amount])
        ->log('Transaksi debit, add data');
}
function ActivityTransaksiKredit($user, $request)
{
    $date = date('Y-m-d H:i:s');
    activity()
        ->useLog('Post')
        ->event('store')
        ->withProperties(['date' => $date, 'user_name' => $user->name, 'user_id' => $user->id, 'email' => $user->email, 'role' => $user->role, 'flag' => 'kredit', 'description' => $request->description, 'amount' => $request->amount])
        ->log('Transaksi kredit, add data Api');
}
function ActivityTrasnsaksiListData($user)
{
    $date = date('Y-m-d H:i:s');
    activity()
        ->useLog('Get Data')
        ->event('Get')
        ->withProperties(['date' => $date, 'user_name' => $user->name, 'user_id' => $user->id, 'email' => $user->email, 'role' => $user->role])
        ->log('Api Get Data Transaksi');
}
