<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    //relacionar usuario con ordenes, es decir añade a la respuesta de cada orden, el usuario repectivo (se hizo por medio de la relación)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //relación de muchos a muchos = belongs to many
    //devolver los productos de una orden (tabla pivote)
    public function products()
    {
        // return $this->belongsToMany(Product::class, 'product_orders');

        //withPivot es usado para obtener los campos de una tabla pivote, la tabla pivote es product_orders (campos: id,order_id,quantity)
        return $this->belongsToMany(Product::class, 'product_orders')->withPivot('quantity');
    }
}
