"use client"

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompletedOrders } from '@/store/actions/orderActions';

const CompletedOrders = () => {
  const dispatch = useDispatch();
  const completedOrders = useSelector((state) => state.orders.completedOrders);

  useEffect(() => {
    dispatch(fetchCompletedOrders())
  }, [dispatch]);

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs mt-4">
  <h2 className="text-xl font-semibold text-gray-800 p-4">Completed Orders</h2>
  <div className="w-full overflow-x-auto"> 
    <table className="w-full whitespace-no-wrap">
      <thead>
        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500   
 uppercase border-b bg-gray-50">
          <th className="px-4 py-3">Price</th>   

          <th className="px-4 py-3 text-center">Qty</th> 
        </tr>
      </thead>
      <tbody className="bg-white divide-y">
        {completedOrders.map((order) => (
          <tr key={order._id} className="text-gray-700">
            <td className="px-4 py-3 text-sm">{order.price}</td>
            <td className="px-4 py-3 text-sm text-center">{order.quantity}</td> 
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default CompletedOrders;
