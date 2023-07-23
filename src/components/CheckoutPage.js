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
        <div className="min-h-screen w-full">
            <img src="https://i.imgur.com/5Vp8fHk.jpeg" alt="Shop Banner" className="w-full h-[70vh] object-cover object-bottom" />
            <div className="pt-6 flex items-start">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow flex-1 mr-4">
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
                <div className="bg-[#D9D9D9] p-6 rounded shadow flex-1 ml-4 py-10">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h1>
                    <div className="flex justify-between my-2 border-b border-black">
                        <p className="font-bold">Product</p>
                        <p className="font-bold">Total</p>
                    </div>
                    {Object.keys(cartItems).map(id => {
                        const item = items.find(item => item.id === parseInt(id));
                        const quantity = cartItems[id];
                        return (
                            <div key={id} className="flex justify-between my-2 border-b border-black">
                                <p>{item.name}</p>
                                <p>${(item.price * quantity).toFixed(2)}</p>
                            </div>
                        )
                    })}

                    <div className="flex justify-between my-2 border-b border-black">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between my-2 border-b border-black">
                        <p>Shipping</p>
                        <p>${shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between my-2 border-b border-black">
                        <p className="font-bold">Total</p>
                        <p className="font-bold">${total.toFixed(2)}</p>
                    </div>
                    <button className="text-black border-black border bg-transparent py-2 px-4 rounded w-full mt-6 hover:bg-gray-500 hover:text-gray-200 hover:shadow-lg">Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
