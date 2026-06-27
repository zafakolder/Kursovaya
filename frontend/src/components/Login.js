import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      alert('Ошибка входа');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Имя пользователя" value={username} onChange={e => setUsername(e.target.value)} required className="form-control" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required className="form-control" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Войти</button>
      </form>
    </div>
  );
};

export default Login;