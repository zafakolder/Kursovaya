import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
    is_available: true,
    stock: 0,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Проверка прав – только админы
    if (!user || !user.is_staff) {
      navigate('/');
      return;
    }
    api.get('categories/')
      .then(res => setCategories(res.data.results || res.data))
      .catch(err => console.error(err));
    if (id) {
      api.get(`products/${id}/`)
        .then(res => {
          const p = res.data;
          setForm({
            title: p.title,
            description: p.description,
            price: p.price,
            category: p.category.id,
            image: null,
            is_available: p.is_available,
            stock: p.stock,
          });
        });
    }
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) {
      if (form[key] !== null && form[key] !== undefined) {
        data.append(key, form[key]);
      }
    }
    try {
      if (id) {
        await api.put(`products/${id}/`, data);
      } else {
        await api.post('products/', data);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>{id ? 'Редактировать' : 'Добавить'} товар</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: '12px' }}>
          <label>Название</label>
          <input name="title" value={form.title} onChange={handleChange} required className="form-control" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Описание</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="form-control" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Цена</label>
          <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required className="form-control" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Категория</label>
          <select name="category" value={form.category} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '8px' }}>
            <option value="">Выберите</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Изображение</label>
          <input type="file" name="image" onChange={handleChange} className="form-control" style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>
            <input type="checkbox" name="is_available" checked={form.is_available} onChange={handleChange} />
            В наличии
          </label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Количество</label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" className="btn-primary">{id ? 'Обновить' : 'Создать'}</button>
      </form>
    </div>
  );
};

export default ProductForm;