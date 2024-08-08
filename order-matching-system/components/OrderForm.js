"use client"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addOrder} from "@/store/actions/orderActions"
const OrderForm = () => {
  const [userType, setUserType] = useState('buyer');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const dispatch =useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addOrder({userType,quantity,price}))
    setQuantity('');
    setPrice('');
    setUserType('buyer');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Place Order</h2>

  <div>
    <label htmlFor="userType" className="block text-gray-700 text-sm font-bold mb-2">User Type:</label>
    <select 
      id="userType" 
      value={userType}
      onChange={(e) => setUserType(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"   

    >
      <option value="buyer">Buyer</option>
      <option value="seller">Seller</option>
    </select>
  </div>

  <div>
    <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
    <input 
      type="number" 
      id="quantity"   
 
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
      required
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight   
 focus:outline-none focus:shadow-outline"
    />
  </div>   


  <div>
    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
    <input 
      type="number" 
      id="price" 
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      required
      className="shadow appearance-none border rounded w-full   
 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"   

    />
  </div>

  <button 
    type="submit" 
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"   

  >
    Submit
  </button>
</form>
  );
};

export default OrderForm;
