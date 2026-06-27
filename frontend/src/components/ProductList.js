import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchProducts = (url = 'products/') => {
    setLoading(true);
    api.get(url)
      .then(res => {
        setProducts(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Все сувениры</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '20px', marginTop: '20px' }}>
        {products.map(p => (
          <div key={p.id} className="product-card">
            {/* ВОТ ЗДЕСЬ ДОБАВЛЯЕМ ИЗОБРАЖЕНИЕ */}
            {p.image && (
              <img 
                src={p.image} 
                alt={p.title} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
              />
            )}
            <h3><Link to={`/product/${p.id}`} style={{ color: '#000', textDecoration: 'none' }}>{p.title}</Link></h3>
            <p>{p.price} ₽</p>
            <p style={{ fontSize: '0.9rem', color: '#777' }}>Автор: {p.author_name}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {prevPage && <button onClick={() => fetchProducts(prevPage)} className="btn-outline">Назад</button>}
        {nextPage && <button onClick={() => fetchProducts(nextPage)} className="btn-primary">Вперед</button>}
      </div>
    </div>
  );
};

export default ProductList;