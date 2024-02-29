<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiAuthController extends Controller
{
    //
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $user = auth()->user();
        $token = $user->createToken('token')->plainTextToken;
        ActivityLoginApi($user);
        return response()->json([
            'message' => 'success',
            'user' => $user,
            'token' => 'Bearer ' . $token
        ]);
    }
    public function show()
    {
        $user = auth()->user();
        return response()->json([
            'message' => 'success',
            'data' => $user
        ]);
    }
    public function logout()
    {
        $user = auth()->user();
        $user->tokens()->delete();
        activity()
            ->causedBy($user)
            ->event('verified')
            ->log('logout api');
        return response()->json([
            'message' => 'success logout'
        ]);
    }
}
