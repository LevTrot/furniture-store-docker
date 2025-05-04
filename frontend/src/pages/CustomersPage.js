import React, { useEffect, useState } from 'react';
import { getAll, create, update, remove } from '../api';

const CustomersPage = ({ currentUser }) => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    console.log('Current user:', currentUser);
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const data = await getAll('customers');
    setCustomers(data);
  };

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await create('customers', newCustomer);
    setNewCustomer({ name: '', email: '' });
    loadCustomers();
  };

  const handleDelete = async (id) => {
    await remove('customers', id);
    loadCustomers();
  };

  const handleUpdate = async (id) => {
    const updated = prompt('Введите новое имя клиента:');
    if (updated) {
      await update('customers', id, { name: updated });
      loadCustomers();
    }
  };

  if (!currentUser) {
    return <div className="content">Выберите пользователя</div>;
  }

  const role = currentUser.role?.name || currentUser.role;
  const canEdit = role === 'admin' || role === 'write';
  const canCreateDelete = role === 'admin';

  return (
    <div className="content">
      <h2>Customers</h2>

      {canCreateDelete && (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newCustomer.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={handleChange}
          />
          <button onClick={handleCreate}>Create Customer</button>
        </form>
      )}

      <div className="item-list">
        {customers.map((c) => (
          <div key={c._id} className="item">
            <strong>{c.name}</strong> — {c.email}<br />
            {canEdit && (
              <button onClick={() => handleUpdate(c._id)} style={{ marginRight: '10px' }} className="button-style">
                Edit
              </button>
            )}
            {canCreateDelete && (
              <button onClick={() => handleDelete(c._id)} className="button-style">Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;