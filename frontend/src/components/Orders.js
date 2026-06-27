import React, { useEffect, useState } from 'react';
import { ordersApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    ordersApi.list()
      .then(res => setOrders(res.data.results || res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return <p>Войдите, чтобы увидеть заказы</p>;
  if (loading) return <p>Загрузка...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Мои заказы</h2>
      {orders.length === 0 ? <p>Заказов нет</p> : (
        orders.map(order => (
          <div key={order.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
            <p><strong>Заказ #{order.id}</strong> – {order.created_at}</p>
            <p>Статус: {order.status}</p>
            <p>Сумма: {order.total_price} ₽</p>
            <p>Адрес: {order.address}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.product_title} – {item.quantity} шт. × {item.price} ₽</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;