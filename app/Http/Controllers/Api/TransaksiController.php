<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\TransaksiRequest;
use App\Http\Resources\TransaksiResource;
use App\Models\Debit;
use App\Models\Kredit;
use App\Models\User;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function allTransaksi()
    {
        $result = TransaksiResource::collection(User::with('kredit')->with('debit')->get())
            ->groupBy('id')->map(function ($item) {
                return [
                    'user_id' => $item->first()->id,
                    'user_name' => $item->first()->name,
                    'total_kredit' => $item->first()->kredit->sum('amount'),
                    'total_debit' => $item->first()->debit->sum('amount'),
                    'total_saldo' => $item->first()->debit->sum('amount') - $item->first()->kredit->sum('amount'),
                    'transaksi' => $item->first()->kredit->merge($item->first()->debit)->sortByDesc('created_at')->map(
                        function ($item) {
                            return [
                                'id' => $item->id,
                                'description' => $item->description,
                                'amount' => $item->amount,
                                'created_at' => $item->created_at->format('d F Y'),
                                'flag' => $item instanceof Kredit ? 'kredit' : 'debit'
                            ];
                        }
                    )->values(),
                ];
            })->values();
        return response()->json([
            'status' => 'success',
            'data' => $result
        ]);
    }
    public function myTransaksi()
    {
        $user = auth()->user();
        $user_id = $user->id;
        $result = TransaksiResource::collection(User::where('id', $user_id)->with('kredit')->with('debit')->get())
            ->groupBy('id')->map(function ($item) {
                return [
                    'user_id' => $item->first()->id,
                    'user_name' => $item->first()->name,
                    'total_kredit' => $item->first()->kredit->sum('amount'),
                    'total_debit' => $item->first()->debit->sum('amount'),
                    'total_saldo' => $item->first()->debit->sum('amount') - $item->first()->kredit->sum('amount'),
                    'transaksi' => $item->first()->kredit->merge($item->first()->debit)->sortByDesc('created_at')->map(
                        function ($item) {
                            return [
                                'id' => $item->id,
                                'description' => $item->description,
                                'amount' => $item->amount,
                                'created_at' => $item->created_at->format('d F Y'),
                                'flag' => $item instanceof Kredit ? 'kredit' : 'debit'
                            ];
                        }
                    )->values(),
                ];
            })->first();
        return response()->json([
            'status' => 'success',
            'data' => $result
        ]);
    }
    public function index()
    {
        $user = auth()->user();
        $user_id = $user->id;
        $result = TransaksiResource::collection(User::where('id', $user_id)->with('kredit')->with('debit')->get())
            ->groupBy('id')->map(function ($item) {
                return [
                    'user_id' => $item->first()->id,
                    'user_name' => $item->first()->name,
                    // 'total_kredit' => $item->first()->kredit->sum('amount'),
                    // 'total_debit' => $item->first()->debit->sum('amount'),
                    // 'total_saldo' => $item->first()->debit->sum('amount') - $item->first()->kredit->sum('amount'),
                    'transaksi' => $item->first()->kredit->merge($item->first()->debit)->sortByDesc('created_at')->map(
                        function ($item) {
                            return [
                                'id' => $item->id,
                                'description' => $item->description,
                                'amount' => $item->amount,
                                'created_at' => $item->created_at->format('d F Y'),
                                'flag' => $item instanceof Kredit ? 'kredit' : 'debit'
                            ];
                        }
                    )->values(),
                    // 'transaksi' => $item->first()->kredit->merge($item->first()->debit)->sortByDesc('created_at')->values(),
                    // 'kredit' => $item->first()->kredit,
                    // 'debit' => $item->first()->debit
                ];
            })->first();
        return response()->json([
            'status' => 'success',
            'data' => $result
        ]);
    }
    public function store(TransaksiRequest $request)
    {
        $user = auth()->user();
        $user_id = $user->id;
        if ($request->flag == 'debit') {
            $result = Debit::create([
                'description' => $request->description,
                'amount' => $request->amount,
                'user_id' => $user_id
            ]);
            ActivityTransaksiDebit($user, $request);
            return response()->json([
                'message' => 'success',
                'data' => $result
            ]);
        } else {
            $result = Kredit::create([
                'description' => $request->description,
                'amount' => $request->amount,
                'user_id' => $user_id
            ]);
            ActivityTransaksiKredit($user, $request);
            return response()->json([
                'message' => 'success',
                'data' => $result
            ]);
        }
    }
}
