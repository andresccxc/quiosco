<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// ruts autenticadas
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //para cerrar sesión se hace detras de la auth de sanctum, de lo contrario habrá error
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/orders', OrderController::class);

    // Route::get('/categories', [CategoryController::class, 'index']);
    //la ruta de abajo es la misma que de de arriba siempre y cuando se mantengan las normas de Laravel (get = index , post = store, etc)
    Route::apiResource('/categories', CategoryController::class);
    Route::apiResource('/products', ProductController::class);
});



//auth endpoints
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// Route::post('/logout', [AuthController::class, 'logout']);
