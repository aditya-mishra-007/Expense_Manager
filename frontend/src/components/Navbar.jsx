import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>💰 Expense Manager</h2>
      <div style={styles.right}>
        <span style={styles.welcome}>👋 Hello, {user?.name}</span>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: '#4f46e5',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  logo: { margin: 0, fontSize: '1.4rem', letterSpacing: '0.5px' },
  right: { display: 'flex', alignItems: 'center', gap: '1rem' },
  welcome: { fontSize: '0.95rem', opacity: 0.9 },
  logoutBtn: {
    background: 'white',
    color: '#4f46e5',
    border: 'none',
    padding: '0.4rem 1.1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
};