import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{ 
      background: '#e0e0e0', 
      padding: '16px 20px', 
      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      borderRadius: '0 0 12px 12px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#000', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Сувениры
        </Link>
        <nav>
          <Link to="/" style={{ margin: '0 12px', color: '#000', textDecoration: 'none' }}>Главная</Link>
          {user && (
            <>
              <Link to="/cart" style={{ margin: '0 12px', color: '#000', textDecoration: 'none' }}>Корзина</Link>
              <Link to="/orders" style={{ margin: '0 12px', color: '#000', textDecoration: 'none' }}>Заказы</Link>
            </>
          )}
          {user && user.is_staff && (
            <Link to="/create" style={{ margin: '0 12px', color: '#000', textDecoration: 'none' }}>Добавить</Link>
          )}
          {user ? (
            <>
              <span style={{ margin: '0 12px' }}>{user.username}</span>
              <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #555', padding: '4px 12px', borderRadius: '8px', cursor: 'pointer' }}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ margin: '0 12px', color: '#000', textDecoration: 'none' }}>Вход</Link>
              <Link to="/register" style={{ margin: '0 12px', color: '#000', textDecoration: 'none' }}>Регистрация</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;