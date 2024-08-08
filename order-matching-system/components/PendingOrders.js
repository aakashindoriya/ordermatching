"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingOrders } from '@/store/actions/orderActions';

const PendingOrders = () => {
  const dispatch = useDispatch();
  const pendingOrders = useSelector((state) => state.orders.pendingOrders);
  console.log(pendingOrders)
  useEffect(() => {
    dispatch(fetchPendingOrders())
  }, [dispatch]);

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs"> 
  <h2 className="text-xl font-semibold text-gray-800 p-4">Pending Orders</h2>
  <div className="w-full overflow-x-auto">
    <table className="w-full whitespace-no-wrap">
      <thead>
        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500   
 uppercase border-b bg-gray-50">
          <th className="px-4 py-3">Buyer   Qty</th>
          <th className="px-4 py-3">Buyer Price</th>
          <th className="px-4 py-3">Seller Price</th>
          <th className="px-4 py-3">Seller Qty</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y">
        {pendingOrders.map((order) => (
          <tr key={order._id} className="text-gray-700">
            <td className="px-4 py-3 text-sm">
              {order.userType === 'buyer' ? order.quantity : ''}
            </td>
            <td className="px-4 py-3 text-sm">
              {order.userType === 'buyer' ? order.price : ''}
            </td>
            <td className="px-4 py-3 text-sm">
              {order.userType === 'seller' ? order.price : ''}
            </td>
            <td className="px-4 py-3 text-sm">
              {order.userType === 'seller' ? order.quantity : ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default PendingOrders;
