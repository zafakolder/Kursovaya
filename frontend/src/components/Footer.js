import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      background: '#000', 
      color: '#fff', 
      textAlign: 'center', 
      padding: '20px 0', 
      marginTop: 'auto',
      borderRadius: '12px 12px 0 0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p>&copy; 2026 Сувенирная лавка. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;