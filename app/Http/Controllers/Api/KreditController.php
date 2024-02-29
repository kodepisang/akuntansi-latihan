<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Kredit\KreditRequest;
use App\Http\Resources\KreditResource;
use App\Models\Kredit;
use Illuminate\Http\Request;

class KreditController extends Controller
{
    public function myKredit()
    {
        $user = auth()->user();
        $user_id = $user->id;
        $result = KreditResource::collection(Kredit::where('user_id', $user_id)->with('user')->get())
            ->groupBy('user.id')->map(function ($item) {
                return [
                    'user_id' => $item->first()->user_id,
                    'user_name' => $item->first()->user->name,
                    'kredit' => $item
                ];
            })->first();
        return response()->json([
            'message' => 'success',
            'data' => $result
        ]);
    }
    public function allKredit()
    {
        $user = auth()->user();
        $user_id = $user->id;
        $result = KreditResource::collection(Kredit::where('user_id', $user_id)->with('user')->get())
            ->groupBy('user.id')->map(function ($item) {
                return [
                    'user_id' => $item->first()->user_id,
                    'user_name' => $item->first()->user->name,
                    'total_kredit' => $item->sum('amount'),
                    'kredit' => $item
                ];
            })->values();
        return response()->json([
            'message' => 'success',
            'data' => $result
        ]);
    }
    public function store(KreditRequest $request)
    {
        $user = auth()->user();
        $user_id = $user->id;
        $result = Kredit::create([
            'description' => $request->description,
            'amount' => $request->amount,
            'user_id' => $user_id
        ]);
        return response()->json([
            'message' => 'success',
            'data' => $result
        ]);
    }
    public function show($id)
    {
        $user = auth()->user();
        $user_id = $user->id;

        $kredit = Kredit::where('user_id', $user_id)->find($id);
        // $result = Kredit::Where('id', $id)->where('user_id', $user_id)->exists();
        if (!$kredit) {
            return response()->json([
                'message' => 'error',
                'data' => 'Kredit not found'
            ]);
        }
        return response()->json([
            'message' => 'success',
            'data' => $kredit
        ]);
    }
    public function update(KreditRequest $request, $id)
    {
        $kredit = Kredit::find($id);
        if (!$kredit) {
            return response()->json([
                'message' => 'error',
                'data' => 'Kredit not found'
            ]);
        }
        $kredit->update([
            'description' => $request->description,
            'amount' => $request->amount
        ]);
        return response()->json([
            'message' => 'success',
            'data' => $kredit
        ]);
    }
    public function destroy($id)
    {
        $kredit = Kredit::find($id);
        if (!$kredit) {
            return response()->json([
                'message' => 'error',
                'data' => 'Kredit not found'
            ]);
        }
        $kredit->delete();
        return response()->json([
            'message' => 'success',
            'data' => 'Kredit deleted'
        ]);
    }
}
