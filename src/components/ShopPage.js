import React, { useState, useEffect } from "react";
import axios from "axios";

const ShopPage = () => {
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    color: "",
    size: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/items");
        console.log("Items fetched from API:", res.data); // Add this line
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterOptions({ ...filterOptions, [e.target.name]: e.target.value });
  };

  const filterItems = () => {
    return items.filter((item) => {
      const { color, size, price, category } = filterOptions;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      const matchesColor = !color || item.color === color;
      const matchesSize = !size || item.size === size;
      const matchesPrice = !price || item.price <= price;
      const matchesCategory = !category || item.category === category;

      return (
        matchesSearch &&
        matchesColor &&
        matchesSize &&
        matchesPrice &&
        matchesCategory
      );
    });
  };

  const filteredItems = filterItems();

  return (
    <div className="w-full">
      <img
        src="https://i.imgur.com/5Vp8fHk.jpeg"
        alt="Shop Banner"
        className="w-full h-80 object-cover"
      />
      <div className="w-full flex justify-start mb-6 bg-gray-300">
        <select
          name="color"
          className="border rounded-lg border-gray-300 p-2 ml-4 bg-gray-300 text-left"
          onChange={handleFilterChange}
        >
          <option value="">Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="yellow">Yellow</option>
          <option value="white">White</option>
          <option value="pink">Pink</option>
          <option value="purple">Purple</option>
        </select>
        <select
          name="size"
          className="border-0 rounded-lg border-gray-300 p-2 bg-gray-300 text-left"
          onChange={handleFilterChange}
        >
          <option value="">Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <select
          name="price"
          className="border-0 rounded-lg border-gray-300 bg-gray-300 text-center"
          onChange={handleFilterChange}
        >
          <option value="">Price</option>
          <option value="10">Up to $10</option>
          <option value="20">Up to $20</option>
          <option value="50">Up to $50</option>
          <option value="100">Up to $100</option>
          <option value="150">Up to $150</option>
        </select>
        <select
          name="category"
          className="border-0 rounded-lg border-gray-300 bg-gray-300 text-center"
          onChange={handleFilterChange}
        >
          <option value="">Category</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>
      <div className="w-full flex flex-wrap justify-center">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-5/6 h-4/5 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-lg font-bold">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
