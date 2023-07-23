import React from 'react';
import { Link } from 'react-router-dom';
import items from './items.js';
import { Card, Button, Empty, Divider, Modal } from 'antd';
import { Row, Col, Typography, Space } from 'antd';
import { TagsOutlined, DollarOutlined, ArrowsAltOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const QuantityInput = ({ defaultValue, onChange }) => (
    <Space>
        <Button onClick={() => onChange(Math.max(0, defaultValue - 1))}>-</Button>
        <div>{defaultValue}</div>
        <Button onClick={() => onChange(defaultValue + 1)}>+</Button>
    </Space>
);

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
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <img src={item.image} alt={item.title} style={{ maxWidth: '100%' }} />
                                    </Col>
                                    <Col span={8}>
                                        <Space direction="vertical" size="middle">
                                            <Title level={4}>{item.title}</Title>
                                            <Text><TagsOutlined /> Color: {item.color}</Text>
                                            <Text><ArrowsAltOutlined /> Size: {item.size}</Text>
                                            <Text type="secondary"><DollarOutlined /> Price: ${item.price}</Text>
                                        </Space>
                                    </Col>
                                    <Col span={4} className="flex flex-col items-center justify-center">
                                        <QuantityInput
                                            defaultValue={cartItems[id]}
                                            onChange={value => {
                                                if (value === 0) {
                                                    Modal.confirm({
                                                        title: 'Do you want to remove this item from your cart?',
                                                        onOk: () => updateCart(prevCartItems => {
                                                            const updatedCartItems = { ...prevCartItems };
                                                            delete updatedCartItems[id];
                                                            return updatedCartItems;
                                                        }),
                                                    });
                                                } else {
                                                    updateCart(prevCartItems => ({ ...prevCartItems, [id]: value }))
                                                }
                                            }}
                                        />
                                    </Col>
                                    <Col span={6} className="flex flex-col items-end justify-around">
                                        <Space direction="vertical" size="middle">
                                            <Text strong>Total: ${item.price * cartItems[id]}</Text>
                                            <Button danger onClick={() => updateCart(prevCartItems => {
                                                const updatedCartItems = { ...prevCartItems };
                                                delete updatedCartItems[id];
                                                return updatedCartItems;
                                            })}>Remove</Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </Card>
                        );
                    })}
                    <Divider />
                    <Row justify="end" gutter={16}>
                        <Col>
                            <Link to="/shop">
                                <Button>Continue Shopping</Button>
                            </Link>
                        </Col>
                        <Col>
                            <Text strong className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</Text>
                        </Col>
                        <Col>
                            <Link to="/checkout">
                                <Button type="primary" size="large">Checkout</Button>
                            </Link>
                        </Col>
                    </Row>
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
