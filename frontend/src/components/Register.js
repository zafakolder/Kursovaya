import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '', first_name: '', last_name: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Имя пользователя" value={form.username} onChange={handleChange} required className="form-control" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="form-control" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input name="first_name" placeholder="Имя" value={form.first_name} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input name="last_name" placeholder="Фамилия" value={form.last_name} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required className="form-control" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input name="password2" type="password" placeholder="Повторите пароль" value={form.password2} onChange={handleChange} required className="form-control" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;