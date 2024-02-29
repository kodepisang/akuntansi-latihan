<?php

namespace App\Http\Requests\Transaksi;

use Illuminate\Foundation\Http\FormRequest;

class TransaksiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'flag' => 'required|in:debit,kredit',
        ];
    }
    public function messages()
    {
        return [
            'description.required' => 'Description is required',
            'amount.required' => 'Amount is required',
            'amount.numeric' => 'Amount must be a number',
            'flag.required' => 'Flag is required',
            'flag.in' => 'Flag must be debit or kredit',
        ];
    }
}
