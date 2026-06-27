import React, { useEffect, useState } from 'react';
import { cartApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], total_cost: 0 });
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await cartApi.get();
      setCart(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadCart();
    else setLoading(false);
  }, [user]);

  const handleAdd = async (productId) => {
    await cartApi.add(productId, 1);
    loadCart();
  };

  const handleRemove = async (productId) => {
    await cartApi.remove(productId);
    loadCart();
  };

  const handleCheckout = async () => {
    if (!address) {
      alert('Введите адрес доставки');
      return;
    }
    try {
      await cartApi.checkout(address);
      alert('Заказ оформлен!');
      loadCart();
      setAddress('');
    } catch (e) {
      alert('Ошибка оформления заказа');
    }
  };

  if (!user) return <p>Войдите, чтобы увидеть корзину</p>;
  if (loading) return <p>Загрузка...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Корзина</h2>
      {cart.items.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.items.map(item => (
              <li key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <strong>{item.product_title}</strong> – {item.quantity} шт. × {item.product_price} ₽ = {item.total} ₽
                <button onClick={() => handleAdd(item.product)} style={{ marginLeft: '10px' }}>+</button>
                <button onClick={() => handleRemove(item.product)} style={{ marginLeft: '5px' }}>−</button>
              </li>
            ))}
          </ul>
          <h3>Итого: {cart.total_cost} ₽</h3>
          <div style={{ marginTop: '20px' }}>
            <textarea
              placeholder="Адрес доставки"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="form-control"
              style={{ width: '100%', padding: '8px', borderRadius: '8px' }}
            />
            <button onClick={handleCheckout} className="btn-primary" style={{ marginTop: '10px' }}>
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;