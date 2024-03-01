<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Activity;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index()
    {
        $result = Activity::with('user')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Activity/ActivityPage', [
            'status' => 'success',
            'data' => $result
        ]);
    }
}
