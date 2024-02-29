<?php

namespace App\Http\Controllers;

use Illuminate\Console\Application;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Inertia\Inertia;

class FirstPageController extends Controller
{
    public function index()
    {
        return Inertia::render('WellcomePage');
    }
}
