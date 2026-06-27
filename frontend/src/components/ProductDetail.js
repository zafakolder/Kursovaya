import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api, { cartApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      alert('Войдите, чтобы добавить товар в корзину');
      return;
    }
    try {
      await cartApi.add(id, 1);
      alert('Товар добавлен в корзину');
    } catch (e) {
      alert('Ошибка добавления');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Удалить товар?')) {
      await api.delete(`products/${id}/`);
      navigate('/');
    }
  };

  if (!product) return <p>Загрузка...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>{product.title}</h1>
      {/* ВОТ ЗДЕСЬ ДОБАВЛЯЕМ ИЗОБРАЖЕНИЕ */}
      {product.image && (
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '16px' }} 
        />
      )}
      <p><strong>Цена:</strong> {product.price} ₽</p>
      <p><strong>Категория:</strong> {product.category?.title}</p>
      <p><strong>Описание:</strong> {product.description}</p>
      <p><strong>Автор:</strong> {product.author}</p>
      <p><strong>В наличии:</strong> {product.is_available ? 'Да' : 'Нет'}</p>
      <button onClick={addToCart} className="btn-primary" style={{ marginTop: '10px' }}>В корзину</button>
      {user && user.is_staff && (
        <div style={{ marginTop: '20px' }}>
          <Link to={`/edit/${product.id}`} className="btn-primary" style={{ marginRight: '10px' }}>Редактировать</Link>
          <button onClick={handleDelete} className="btn-primary" style={{ background: '#d32f2f' }}>Удалить</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;