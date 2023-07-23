import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import items from './items.js';

const CheckoutPage = ({ cartItems }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => console.log(data);

    const subtotal = Object.keys(cartItems).reduce((total, id) => {
        const item = items.find(item => item.id === parseInt(id));
        const quantity = cartItems[id];
        return total + quantity * item.price;
    }, 0);
    const shipping = subtotal * 0.05;
    const total = subtotal + shipping;
    console.log("Cart items:", cartItems);
    console.log("Total price:", total);

    return (
        <div className="container mx-auto pt-36 px-4 min-h-screen grid grid-cols-2 gap-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Billing Details</h1>
                <div className="grid grid-cols-2 gap-4">
                    <input {...register("firstName")} placeholder="First name" className="bg-gray-200 p-2 rounded" />
                    <input {...register("lastName")} placeholder="Last name" className="bg-gray-200 p-2 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input {...register("country")} placeholder="Country" className="bg-gray-200 p-2 rounded" />
                    <input {...register("zipCode")} placeholder="Zip code" className="bg-gray-200 p-2 rounded" />
                </div>
                <input {...register("address")} placeholder="Address" className="bg-gray-200 p-2 rounded w-full" />
                <div className="grid grid-cols-2 gap-4">
                    <input {...register("phone")} placeholder="Phone" className="bg-gray-200 p-2 rounded" />
                    <input {...register("email")} placeholder="Email" className="bg-gray-200 p-2 rounded" />
                </div>
                <input {...register("orderNotes")} placeholder="Order notes" className="bg-gray-200 p-2 rounded w-full" />
            </form>
            <div className="bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h1>
                {Object.keys(cartItems).map(id => {
                    const item = items.find(item => item.id === parseInt(id));
                    const quantity = cartItems[id];
                    return (
                        <div key={id} className="flex justify-between my-2">
                            <p>{item.name}</p>
                            <p>${(item.price * quantity).toFixed(2)}</p>
                        </div>
                    )
                })}

                <hr className="my-4" />
                <div className="flex justify-between my-2">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between my-2">
                    <p>Shipping</p>
                    <p>${shipping.toFixed(2)}</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between my-2">
                    <p className="font-bold">Total</p>
                    <p className="font-bold">${total.toFixed(2)}</p>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-6">Place Order</button>
            </div>
        </div>
    );
};

export default CheckoutPage;
