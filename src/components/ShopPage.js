import React, { useState, useEffect } from "react";
import items from './items.js';
import { Card, Button, Input, Spin, Empty, notification, Select } from 'antd';
import { LoadingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { SearchOutlined, StarOutlined, HeartOutlined } from '@ant-design/icons';

const { Option } = Select;

const ShopPage = ({ updateCart }) => {
  const [shopItems, setShopItems] = useState(
    items.map(item => ({
      ...item,
      rating: Math.round((Math.random() * 4 + 1) * 10) / 10
    }))
  );
  const [searchInput, setSearchInput] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    color: "",
    size: "",
    price: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (value, prop) => {
    setFilterOptions({ ...filterOptions, [prop]: value });
  };

  const clearFilters = () => {
    setFilterOptions({
      color: "",
      size: "",
      price: "",
      category: "",
    });
  };

  const addToCart = (item) => {
    // Get the current quantity of the item in the cart
    const currentQuantity = cartItems[item.id] || 0;

    updateCart(prevCartItems => {
      const currentQuantity = prevCartItems[item.id] || 0;
      return {
        ...prevCartItems,
        [item.id]: currentQuantity + 1,
      };
    });

    // Handle add to cart logic here
    notification.open({
      message: 'Item Added to Cart',
      description: `You have added ${item.title} to your cart.`,
      icon: <ShoppingCartOutlined style={{ color: '#108ee9' }} />,
    });
  };



  const filterItems = () => {
    setLoading(true);
    // Simulate a delay for loading
    setTimeout(() => {
      setLoading(false);
    }, 500);

    return shopItems.filter((item) => {
      const { color, size, price, category } = filterOptions;
      const matchesSearch = item.title.toLowerCase().includes(searchInput.toLowerCase());
      const matchesColor = !color || item.color === color;
      const matchesSize = !size || item.size === size;
      const matchesPrice = !price || item.price <= price;
      const matchesCategory = !category || item.category === category;

      return matchesSearch && matchesColor && matchesSize && matchesPrice && matchesCategory;
    });
  };

  useEffect(() => {
    setFilteredItems(filterItems());
  }, [searchInput, filterOptions]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <img src="https://i.imgur.com/5Vp8fHk.jpeg" alt="Shop Banner" className="w-full h-80 object-cover" />
      <div className="flex flex-wrap items-center justify-around w-full p-4 bg-gray-300 ">
        {/* Search Input */}
        <Input
          className="my-2 sm:my-0 mx-2 flex-1"
          placeholder="Search items..."
          value={searchInput}
          onChange={handleSearchInputChange}
          size="large"
          suffix={<SearchOutlined style={{ fontSize: '1.5em' }} />}
        />

        {/* Color Filter */}
        <Select
          className="mt-4 sm:mt-0 sm:ml-4"
          placeholder="Color"
          onChange={(value) => handleFilterChange(value, "color")}
        >
          <Option value="">All</Option>
          <Option value="red">Red</Option>
          <Option value="blue">Blue</Option>
          <Option value="green">Green</Option>
          <Option value="black">Black</Option>
          <Option value="yellow">Yellow</Option>
          <Option value="white">White</Option>
          <Option value="pink">Pink</Option>
          <Option value="purple">Purple</Option>
        </Select>
        {/* Size Filter */}
        <Select
          className="mt-4 sm:mt-0 sm:ml-4"
          placeholder="Size"
          onChange={(value) => handleFilterChange(value, "size")}
        >
          <Option value="">All</Option>
          <Option value="S">S</Option>
          <Option value="M">M</Option>
          <Option value="L">L</Option>
          <Option value="XL">XL</Option>
        </Select>
        {/* Price Filter */}
        <Select
          className="mt-4 sm:mt-0 sm:ml-4"
          placeholder="Price"
          onChange={(value) => handleFilterChange(value, "price")}
        >
          <Option value="">All</Option>
          <Option value="10">Up to $10</Option>
          <Option value="20">Up to $20</Option>
          <Option value="50">Up to $50</Option>
          <Option value="100">Up to $100</Option>
          <Option value="150">Up to $150</Option>
        </Select>
        {/* Category Filter */}
        <Select
          className="mt-4 sm:mt-0 sm:ml-4"
          placeholder="Category"
          onChange={(value) => handleFilterChange(value, "category")}
        >
          <Option value="">All</Option>
          <Option value="clothing">Clothing</Option>
          <Option value="accessories">Accessories</Option>
          <Option value="shoes">Shoes</Option>
        </Select>
        {/* Clear Filters Button */}
        <Button className="my-2 sm:my-0 mx-2" onClick={clearFilters}>Clear Filters</Button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4 overflow-hidden">
        {loading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              hoverable
              style={{ width: 240, margin: '15px' }}
              cover={<img alt={item.title} src={item.image} className="h-48 object-cover" />}
            >
              <Card.Meta
                title={
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <div className="text-gray-500">
                      {item.rating.toFixed(1)} <StarOutlined />
                    </div>
                  </div>
                }
                description={
                  <div className="mb-2">
                    <p className="text-lg font-bold">${item.price}</p>
                    <p className="text-sm text-gray-500">{item.availability}</p>
                  </div>
                }
              />
              <Button
                icon={<ShoppingCartOutlined />}
                block
                onClick={() => addToCart(item)}
                className="mt-2 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors duration-300 py-2"
              >
                {cartItems[item.id] ? `In Cart: ${cartItems[item.id]}` : 'Add to Cart'}
              </Button>
              <div className="flex justify-end mt-2">
                <HeartOutlined className="text-red-500 hover:text-red-600 cursor-pointer" />
              </div>
            </Card>

          ))

        ) : (
          <Empty description="No items match your search and filter criteria." />
        )}
      </div>
    </div>
  );
};

export default ShopPage;
