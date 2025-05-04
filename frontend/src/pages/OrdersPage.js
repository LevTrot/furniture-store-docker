import React, { useEffect, useState } from 'react';
import { getAll, create, update, remove } from '../api';

const OrdersPage = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customerId: '',
    productIds: '',
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getAll('orders');
    setOrders(data);
  };

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const payload = {
      customerId: newOrder.customerId,
      productIds: newOrder.productIds.split(',').map((id) => id.trim()),
    };
    await create('orders', payload);
    setNewOrder({ customerId: '', productIds: '' });
    loadOrders();
  };

  const handleUpdate = async (id) => {
    const newProductIds = prompt('Введите новые productIds через запятую:');
    if (newProductIds) {
      const payload = {
        productIds: newProductIds.split(',').map((id) => id.trim()),
      };
      await update('orders', id, payload);
      loadOrders();
    }
  };

  const handleDelete = async (id) => {
    await remove('orders', id);
    loadOrders();
  };

  if (!currentUser) {
    return <div className="content">Выберите пользователя</div>;
  }

  const role = currentUser.role.name;
  const canEdit = role === 'write' || role === 'admin';
  const canCreateDelete = role === 'admin';

  return (
    <div className="content">
      <h2>Orders</h2>

      {canCreateDelete && (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="customerId"
            placeholder="Customer ID"
            value={newOrder.customerId}
            onChange={handleChange}
          />
          <input
            type="text"
            name="productIds"
            placeholder="Product IDs (comma separated)"
            value={newOrder.productIds}
            onChange={handleChange}
          />
          <button onClick={handleCreate}>Create Order</button>
        </form>
      )}

      <div className="item-list">
        {orders.map((o) => (
          <div key={o._id} className="item">
            <strong>Order #{o._id}</strong><br />
            Customer: {o.customer?.name || 'Unknown'}<br />
            Products: {o.products.map(p => p?.name || p).join(', ')}<br />

            {canEdit && (
              <button onClick={() => handleUpdate(o._id)} style={{ marginRight: '10px' }} className="button-style">
                Edit
              </button>
            )}
            {canCreateDelete && (
              <button onClick={() => handleDelete(o._id)} className="button-style">
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;