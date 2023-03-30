import { useState } from 'react';

import './Shop.css';

function Shop(props) {
  const { addToCart } = props;
  const items = [
    { id: 1, name: 'T-shirt', price: 25, image: 'images/Shop/6.png', category: 'clothing' },
    { id: 2, name: 'Patch', price: 10, image: 'images/Shop/4.PNG', category: 'accessories' },
    { id: 3, name: 'Cap', price: 20, image: 'images/Shop/3.png', category: 'accessories' },
    { id: 4, name: 'Bandana', price: 15, image: 'images/Shop/2.png', category: 'accessories' },
    { id: 5, name: 'Bag', price: 20, image: 'images/Shop/1.png', category: 'accessories' },
    { id: 6, name: 'Socks', price: 20, image: 'images/Shop/5.png', category: 'clothing' },
    { id: 7, name: 'Reusable Water Bottle', price: 15, image: 'https://i1.adis.ws/i/jpl/bl_133862_a?w=364&h=364&fmt=webp', category: 'clean-energy' },
    { id: 8, name: 'Bamboo Toothbrush', price: 8, image: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/71B9nG9labL._SL1500_.jpg', category: 'clean-energy' },   
    { id: 9, name: 'Electric Bike', price: 600, category: 'electric', image: 'https://m.media-amazon.com/images/I/61mqKaMzY5L._AC_SX679_.jpg' },
    { id: 10, name: 'Solar-Powered Outdoor Lights', price: 30, category: 'lighting', image: 'https://cdn.shopify.com/s/files/1/0013/9168/9777/products/image_cc01b37f-34b8-457b-abca-78c7f06c1595_750x.jpg?v=1642617993' },
    { id: 11, name: 'Smart Thermostat', price: 80, category: 'heating', image: 'https://www.cnet.com/a/img/resize/07e6f43e250c35b0ab4ced0a8fa28b35101f8319/hub/2021/11/11/95b342b3-bc11-4694-b1dd-b96f8bc6de37/amazon-thermostat-2.jpg?auto=webp&fit=crop&height=362&width=644' },
    { id: 12, name: 'Solar Water Heater', price: 200, category: 'solar', image: 'https://m.media-amazon.com/images/I/61M+8p36PTL._AC_SX342_SY445_.jpg' },
    
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredItems = items.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory === '' || item.category === selectedCategory;
    return nameMatch && categoryMatch;
  });

  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <div className="Shop">
      <h1 className="shop-title">Shopping Page</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search items..."
        />
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="item-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="item">
            <img className="shop-image" src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>£{item.price}</p>
            <button className="shop-button" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
