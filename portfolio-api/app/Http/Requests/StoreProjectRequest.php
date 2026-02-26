<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
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
            'title' => 'required|string|max:255',

            'description' => 'required|string|min:10',

            'tech_stack' => 'nullable|array',
            'tech_stack.*' => 'string|max:50',

            'github_url' => 'nullable|url|max:255',
            'live_url' => 'nullable|url|max:255',

            'is_published' => 'sometimes|boolean',
        ];
    }
}
