import React, { useState } from 'react';

const Analytics = () => {
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');
  const [ordersData, setOrdersData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [ordersPerCustomerData, setOrdersPerCustomerData] = useState([]);
  const [totalSpentPerCustomerData, setTotalSpentPerCustomerData] = useState([]);
  const [ordersByDateData, setOrdersByDateData] = useState([]);

  // Обработчики изменения данных в input
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

  // Запросы на сервер для отчетов
  const fetchOrdersPerCustomer = async () => {
    const result = await fetch('http://localhost:3000/reports/orders-per-customer');
    const data = await result.json();
    setOrdersPerCustomerData(data);
  };

  const fetchTotalSpentPerCustomer = async () => {
    const result = await fetch('http://localhost:3000/reports/total-spend-per-customer');
    const data = await result.json();
    setTotalSpentPerCustomerData(data);
  };

  const fetchOrdersByDate = async () => {
    const result = await fetch('http://localhost:3000/reports/orders-by-date');
    const data = await result.json();
    setOrdersByDateData(data);
  };

  const fetchOrdersByEmail = async () => {
    const result = await fetch(`http://localhost:3000/reports/orders-by-email?email=${email}`);
    const data = await result.json();
    setOrdersData(data);
  };

  const fetchProductsOverPrice = async () => {
      const numericPrice = Number(price);
     
      if (isNaN(numericPrice)) {
        alert("Введите корректное число!");
        return;
      }
    
      try {
        const response = await fetch(`http://localhost:3000/reports/products-over-price?price=${numericPrice}`);
    
        if (!response.ok) {
         throw new Error("Ошибка запроса");
        }
    
        const data = await response.json();
        setProductsData(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        alert("Произошла ошибка при запросе");
      }
    };

  return (
    <div className="analytics">
      <h2>Отчеты</h2>

      {/* Кнопки для отчетов без дополнительных фильтров */}
      <div className="button-group">
        <button className="button-style" style={{ marginRight: '10px' }} onClick={fetchOrdersPerCustomer}>Количество заказов по клиенту</button>
        <button className="button-style" style={{ marginRight: '10px' }} onClick={fetchTotalSpentPerCustomer}>Общая сумма заказов по клиенту</button>
        <button className="button-style" style={{ marginRight: '10px' }} onClick={fetchOrdersByDate}>Количество заказов по дате</button>
      </div>

      {/* Форма для поиска заказов по email */}
      <div className="input-group">
        <label style={{ marginRight: '10px' }} >Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Введите email"
        />
        <button className="button-style" style={{ marginLeft: '10px' }} onClick={fetchOrdersByEmail}>Поиск заказов по email</button>
      </div>

      {/* Форма для поиска продуктов по цене */}
      <div className="input-group">
        <label style={{ marginRight: '10px' }}>Минимальная цена</label>
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          placeholder="Введите цену"
        />
        <button className="button-style" style={{ marginLeft: '10px' }} onClick={fetchProductsOverPrice}>Поиск продуктов по цене</button>
      </div>

      {/* Результаты для количества заказов по клиенту */}
      <h3>Количество заказов по клиенту</h3>
      <div className="item">
        {ordersPerCustomerData.length > 0 ? (
          <ul>
            {ordersPerCustomerData.map((data) => (
              <li key={data._id}>
                {data.customerName}: {data.totalOrders} заказов
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет данных для количества заказов по клиенту.</p>
        )}
      </div>

      {/* Результаты для общей суммы заказов по клиенту */}
      <h3>Общая сумма заказов по клиенту</h3>
      <div className="item">
        {totalSpentPerCustomerData.length > 0 ? (
          <ul>
            {totalSpentPerCustomerData.map((data) => (
              <li key={data._id}>
                {data.customerName}: {data.totalSpent} rubbles.
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет данных для общей суммы заказов по клиенту.</p>
        )}
      </div>

      {/* Результаты для количества заказов по дате */}
      <h3>Количество заказов по дате</h3>
      <div className="item">
        {ordersByDateData.length > 0 ? (
          <ul>
            {ordersByDateData.map((data) => (
              <li key={'${data._id.year}-${data._id.month}-${data._id.day}'}>
                {data._id.year}-{data._id.month}-{data._id.day}: {data.count} заказов
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет данных для количества заказов по дате.</p>
        )}
      </div>

      {/* Результаты для заказов по email */}
      <h3>Результаты поиска заказов по email</h3>
      <div className="item">
        {ordersData.length > 0 ? (
          <ul>
            {ordersData.map((order) => (
              <li key={order._id}>Order ID: {order._id}, Date: {order.date}</li>
            ))}
          </ul>
        ) : (
          <p>Нет заказов для указанного email.</p>
        )}
      </div>

      {/* Результаты для продуктов по цене */}
      <h3>Продукты дороже {price}</h3>
      <div className="item">
        {productsData.length > 0 ? (
          <ul>
            {productsData.map((product) => (
              <li key={product._id}>
                {product.name} - {product.price} руб.
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет продуктов с такой ценой.</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;

//className="button-style" style={{ marginRight: '10px' }}