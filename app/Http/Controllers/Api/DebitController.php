<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Debit\DebitRequest;
use App\Http\Resources\DebitResource;
use App\Models\Debit;
use App\Models\User;
use Illuminate\Http\Request;

class DebitController extends Controller
{
    public function myDebit()
    {
        $user = auth()->user();
        $user_id = $user->id;
        $result = DebitResource::collection(Debit::where('user_id', $user_id)->with('user')->get())
            ->groupBy('user.id')->map(function ($item) {
                return [
                    'user_id' => $item->first()->user_id,
                    'user_name' => $item->first()->user->name,
                    // 'total_debit' => $item->sum('amount'),
                    'debit' => $item
                ];
            })->first();
        // return response()->json($result, 200);
        return response()->json([
            'message' => 'success',
            'data' => $result
        ]);
    }
    public function allDebit()
    {
        try {
            $user = auth()->user();
            $user_id = $user->id;
            $result = DebitResource::collection(Debit::where('user_id', $user_id)->with('user')->get())
                ->groupBy('user.id')->map(function ($item) {
                    return [
                        'user_id' => $item->first()->user_id,
                        'user_name' => $item->first()->user->name,
                        'total_debit' => $item->sum('amount'),
                        'debit' => $item
                    ];
                })->values();
            // $result = User::find($user_id);
            return response()->json([
                'message' => 'success',
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'error',
                'data' => $e->getMessage()
            ]);
        }
    }
    public function store(DebitRequest $request)
    {
        $user = auth()->user();
        $user_id = $user->id;
        $result = Debit::create([
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
        try {
            $user = auth()->user();
            $user_id = $user->id;
            $result = Debit::Where('id', $id)->where('user_id', $user_id)->exists();
            if (!$result) {
                return response()->json([
                    'message' => 'error',
                    'data' => 'Data not found'
                ]);
            } else {
                $resultData = DebitResource::collection(Debit::Where('id', $id)
                    ->where('user_id', $user_id)->get());
                return response()->json([
                    'message' => 'success get data by id',
                    'data' => $resultData
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'error',
                'data' => $th->getMessage()
            ]);
        }
    }
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'description' => 'required',
            'amount' => 'required'
        ]);
        $result = Debit::find($id);
        $result->update([
            'description' => $request->description,
            'amount' => $request->amount
        ]);
        return response()->json([
            'message' => 'Update success',
            'data' => $result
        ]);
    }
    public function destroy($id)
    {
        try {
            $user = auth()->user();
            $user_id = $user->id;
            $result = Debit::Where('id', $id)->where('user_id', $user_id)->exists();
            if (!$result) {
                return response()->json([
                    'message' => 'error',
                    'data' => 'Data not found'
                ]);
            } else {
                $resultData = Debit::Where('id', $id)->where('user_id', $user_id)->first();
                $resultData->delete();
                return response()->json([
                    'message' => 'Delete success',
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'error',
                'data' => $e->getMessage()
            ]);
        }
    }
}
