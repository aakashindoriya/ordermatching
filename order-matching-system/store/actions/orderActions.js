import axios from 'axios';

export const fetchPendingOrders = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/orders');
    dispatch({ type: 'FETCH_PENDING_ORDERS', payload: response.data });
  } catch (error) {
    console.error('Failed to fetch pending orders:', error);
    alert('Failed to fetch pending orders. Please try again later.');
  }
};

export const fetchCompletedOrders = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/completedOrders');
    dispatch({ type: 'FETCH_COMPLETED_ORDERS', payload: response.data });
  } catch (error) {
    console.error('Failed to fetch completed orders:', error);
    alert('Failed to fetch completed orders. Please try again later.');
  }
};

export const addOrder = (order) => async (dispatch) => {
  try {
    await axios.post('/api/orders', order);
    
    await dispatch(fetchPendingOrders());
    await dispatch(fetchCompletedOrders());

    alert('Order added successfully!');
  } catch (error) {
    console.error('Failed to add order:', error);
    alert('Failed to add order. Please try again later.');
  }
};

