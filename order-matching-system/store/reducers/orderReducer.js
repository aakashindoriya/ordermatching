const initialState = {
  pendingOrders: [],
  completedOrders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PENDING_ORDERS':
      return {
        ...state,
        pendingOrders: action.payload,
      };
    case 'FETCH_COMPLETED_ORDERS':
      return {
        ...state,
        completedOrders: action.payload,
      };
    case 'ADD_ORDER': {
      const { newOrder, completedOrders, updatedPendingOrders } = action.payload;

      // Remove completed orders from pending orders
      const updatedPending = state.pendingOrders.filter(order => 
        !completedOrders.some(completed => completed._id === order._id)
      );

      // Add new or updated pending orders
      const finalPendingOrders = newOrder ? [...updatedPending, newOrder] : updatedPending;

      return {
        ...state,
        pendingOrders: finalPendingOrders,
        completedOrders: [...state.completedOrders, ...completedOrders],
      };
    }
    default:
      return state;
  }
};

export default orderReducer;
