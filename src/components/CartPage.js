import React from 'react';
import { Link } from 'react-router-dom';
import items from './items.js';
import { Card, Button, Empty } from 'antd';
import { Row, Col } from 'antd';

const CartPage = ({ cartItems, updateCart }) => {
    const cartItemIds = Object.keys(cartItems || {});

    const totalPrice = cartItemIds.reduce((total, id) => {
        const item = items.find(item => item.id === parseInt(id));
        const itemTotal = item.price * (cartItems[id] || 0);
        return total + itemTotal;
    }, 0);

    return (
        <div className="container mx-auto pt-36 px-4 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cartItemIds.length > 0 ? (
                <div>
                    {cartItemIds.map(id => {
                        const item = items.find(item => item.id === parseInt(id));
                        return (
                            <Card
                                key={id}
                                className="mb-4"
                            >
                                <Row>
                                    <Col span={16}>
                                        <h2>{item.title}</h2>
                                        <p>Quantity: {cartItems[id]}</p>
                                        <p>Price: ${item.price}</p>
                                        <p>Total: ${item.price * cartItems[id]}</p>
                                    </Col>
                                    <Col span={8} className="flex items-center justify-end">
                                        <Button danger onClick={() => updateCart(prevCartItems => {
                                            const updatedCartItems = { ...prevCartItems };
                                            delete updatedCartItems[id];
                                            return updatedCartItems;
                                        })}>Remove</Button>
                                    </Col>
                                </Row>
                            </Card>
                        );
                    })}
                    <div className="flex justify-end mt-6">
                        <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
                    </div>
                </div>
            ) : (
                <Empty
                    description={
                        <span>
                            Your shopping cart is empty. <Link to="/shop">Go shopping</Link>
                        </span>
                    }
                />
            )}
        </div>
    );
};

export default CartPage;
