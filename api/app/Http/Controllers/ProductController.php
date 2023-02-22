<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return new ProductCollection(Product::all());

        // filter by condition
        return new ProductCollection(Product::where('available', 1)->get());

        // paginate results
        // return new ProductCollection(Product::orderBy('created_at', 'ASC')->paginate(10));

        //order by creation date
        // return new ProductCollection(Product::orderBy('created_at', 'ASC')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $product->available = 0;
        $product->save();
        return ['product' => $product];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
