import React, { useEffect, useState } from 'react';
import { getAll, create, update, remove } from '../api';

const ProductsPage = ({ currentUser }) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getAll('products');
    setProducts(data);
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await create('products', newProduct);
    setNewProduct({ name: '', price: '', description: '' });
    loadProducts();
  };

  const handleDelete = async (id) => {
    await remove('products', id);
    loadProducts();
  };

  const handleUpdate = async (id) => {
    const updated = prompt('Введите новое имя продукта:');
    if (updated) {
      await update('products', id, { name: updated });
      loadProducts();
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
      <h2>Products</h2>

      {canCreateDelete && (
          <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
          />
          <button onClick={handleCreate}>Create</button>
          </form>
      )}

      <div className="item-list">
        {products.map((p) => (
          <div key={p._id} className="item">
            <strong>{p.name}</strong> — {p.price}<br />
              <>
              {canEdit && (
                <button onClick={() => handleUpdate(p._id)}  style={{ marginRight: '10px' }} className="button-style">
                  Edit
                </button>
              )}
              {canCreateDelete && (
                <button onClick={() => handleDelete(p._id)} className="button-style">Delete</button>
              )}
              </>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;