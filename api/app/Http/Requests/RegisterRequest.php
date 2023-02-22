<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password as PasswordRules;

class RegisterRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'email' => ['unique:users,email', 'email', 'required'],
            'password' => ['required', 'confirmed', PasswordRules::min(6)]
            // 'password' => ['required', 'confirmed', PasswordRules::min(8)->letters()->symbols()->numbers()]
        ];
    }

    public function messages()
    {
        return [
            'name' => 'El nombre es obligatorio',
            'email.required' => 'El correo es obligatorio',
            'email.email' => 'El correo no es válido',
            'email.unique' => 'El correo ya está registrado',
            'password' => 'El password debe contener al menos 8 caracteres, un simbolo y un numero'
        ];
    }
}
