<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderCollection;
use App\Models\Order;
use App\Models\ProductOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        //return orders
        // return new OrderCollection(Order::where('status', 0)->get());
        return new OrderCollection(Order::with('user')->with('products')->where('status', 0)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        //save orden

        $order = new Order;
        $order->user_id = Auth::user()->id;
        $order->total = $request->total;
        $order->save();

        // get order id
        $id = $order->id;

        //get products of the order
        $products = $request->products;

        //create array with the products and quantities
        $order_product = [];

        foreach ($products as $product) {
            // $order_product[] = array en la ultima posición
            $order_product[] = [
                'order_id' => $id,
                'product_id' => $product['id'],
                'quantity' => $product['quantity'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                //toca agregar fechas porque el save si genera fechas pero el insert no los genera
            ];
        }

        //save in DB
        //este método permite insertar un arreglo en la tabla
        ProductOrder::insert($order_product);

        return ['message' => 'Pedido realizado correctamente, estará listo en unos minutos'];
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $order->status = 1;
        $order->save();
        return [
            'order' => $order,
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
