<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransaksiResource;
use App\Models\Debit;
use App\Models\Kredit;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;

class TransaksiController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $user_id = $user->id;
        $collectionDasbord = TransaksiResource::collection(User::where('id', $user_id)->with('kredit')->with('debit')->get())
            ->groupBy('id')->map(function ($item) {
                return [
                    'user_id' => $item->first()->id,
                    'user_name' => $item->first()->name,
                    'total_kredit' => $item->first()->kredit->sum('amount'),
                    'total_debit' => $item->first()->debit->sum('amount'),
                    'total_saldo' => $item->first()->debit->sum('amount') - $item->first()->kredit->sum('amount'),
                    // 'transaksi' => $item->first()->kredit->merge($item->first()->debit)->sortByDesc('created_at')->map(
                    //     function ($item) {
                    //         return [
                    //             'id' => $item->id,
                    //             'description' => $item->description,
                    //             'amount' => $item->amount,
                    //             'created_at' => $item->created_at->format('d F Y'),
                    //             'flag' => $item instanceof Kredit ? 'kredit' : 'debit'
                    //         ];
                    //     }
                    // )->values(),
                ];
            })->first();
        $kedit = Kredit::where('user_id', $user_id)->get();
        $debit = Debit::where('user_id', $user_id)->get();
        $collection = $kedit->merge($debit)->sortByDesc('created_at')->map(function ($item) {
            return [
                'id' => $item->id,
                'description' => $item->description,
                'amount' => $item->amount,
                'created_at' => $item->created_at->format('d F Y'),
                'flag' => $item instanceof Kredit ? 'kredit' : 'debit'
            ];
        })->values();
        $page = request()->get('page', 1); // Get the current page or default to 1
        $perPage = 10;
        $offset = ($page * $perPage) - $perPage;
        $result = new LengthAwarePaginator(
            array_slice($collection->toArray(), $offset, $perPage, true), // Only grab the items we need
            count($collection), // Total items
            $perPage, // Items per page
            $page, // Current page
            ['path' => request()->url(), 'query' => request()->query()] // We need this so we can keep all old query parameters from the url
        );
        return Inertia::render('Transaksi/DashbordPage', [
            'status' => 'success',
            'dasbord' => $collectionDasbord,
            'data' => $result,
        ]);
    }
    public function destroyDebit($id)
    {
        $user = auth()->user();
        $user_id = $user->id;
        $debit = Debit::where('user_id', $user_id)->where('id', $id)->first();
        $debit->delete();
        return redirect()->route('dashboard.index');
    }
    public function destroyKredit($id)
    {
        $user = auth()->user();
        $user_id = $user->id;
        $kredit = Kredit::where('user_id', $user_id)->where('id', $id)->first();
        $kredit->delete();
        return redirect()->route('dashboard.index');
    }
}
