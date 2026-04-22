import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const CATEGORIES = ['All', 'Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Other'];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', amount: '', category: 'Food', date: '' });
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const { data } = await API.get('/expenses');
      setExpenses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Add expense
  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    setError('');
    try {
      await API.post('/expense', form);
      setForm({ title: '', amount: '', category: 'Food', date: '' });
      fetchExpenses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
    } finally {
      setAdding(false);
    }
  };

  // Delete expense
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await API.delete(`/expense/${id}`);
      setExpenses(expenses.filter(e => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  // Filter expenses
  const filtered = filter === 'All' ? expenses : expenses.filter(e => e.category === filter);

  // Total
  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  const categoryColors = {
    Food: '#ff6b6b', Travel: '#4ecdc4', Bills: '#ffe66d',
    Shopping: '#a29bfe', Health: '#55efc4', Entertainment: '#fd79a8', Other: '#b2bec3'
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>💰 Expense Manager</h2>
        <div style={styles.navRight}>
          <span style={styles.welcome}>👋 {user?.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div style={styles.container}>
        {/* Add Expense Form */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>➕ Add New Expense</h3>
          {error && <div style={styles.error}>{error}</div>}
          <form onSubmit={handleAdd} style={styles.form}>
            <input style={styles.input} type="text" name="title" placeholder="Title (e.g. Lunch)" value={form.title} onChange={handleChange} required />
            <input style={styles.input} type="number" name="amount" placeholder="Amount (₹)" value={form.amount} onChange={handleChange} required min="1" />
            <select style={styles.input} name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input style={styles.input} type="date" name="date" value={form.date} onChange={handleChange} required />
            <button style={styles.addBtn} type="submit" disabled={adding}>
              {adding ? 'Adding...' : 'Add Expense'}
            </button>
          </form>
        </div>

        {/* Summary */}
        <div style={styles.summaryRow}>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Total Expenses</p>
            <p style={styles.summaryAmount}>₹{total.toLocaleString()}</p>
          </div>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>No. of Entries</p>
            <p style={styles.summaryAmount}>{filtered.length}</p>
          </div>
        </div>

        {/* Filter */}
        <div style={styles.filterRow}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              style={{ ...styles.filterBtn, background: filter === cat ? '#4f46e5' : '#e0e0e0', color: filter === cat ? 'white' : '#333' }}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Expense List */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📋 Your Expenses</h3>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No expenses found.</p>
          ) : (
            filtered.map(exp => (
              <div key={exp._id} style={styles.expenseItem}>
                <div style={styles.expLeft}>
                  <span style={{ ...styles.catBadge, background: categoryColors[exp.category] || '#b2bec3' }}>
                    {exp.category}
                  </span>
                  <div>
                    <p style={styles.expTitle}>{exp.title}</p>
                    <p style={styles.expDate}>{new Date(exp.date).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
                <div style={styles.expRight}>
                  <span style={styles.expAmount}>₹{exp.amount.toLocaleString()}</span>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(exp._id)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  navbar: { background: '#4f46e5', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { margin: 0, fontSize: '1.4rem' },
  navRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  welcome: { fontSize: '0.95rem' },
  logoutBtn: { background: 'white', color: '#4f46e5', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' },
  card: { background: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  cardTitle: { margin: '0 0 1rem', color: '#1a1a2e' },
  error: { background: '#ffe0e0', color: '#cc0000', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' },
  form: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' },
  input: { padding: '0.7rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', outline: 'none' },
  addBtn: { gridColumn: '1 / -1', padding: '0.8rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' },
  summaryRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' },
  summaryCard: { background: 'white', borderRadius: '12px', padding: '1.2rem', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  summaryLabel: { margin: '0 0 0.4rem', color: '#666', fontSize: '0.9rem' },
  summaryAmount: { margin: 0, fontSize: '1.8rem', fontWeight: '700', color: '#4f46e5' },
  filterRow: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' },
  filterBtn: { padding: '0.4rem 0.9rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' },
  expenseItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 0', borderBottom: '1px solid #f0f0f0' },
  expLeft: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  catBadge: { padding: '0.3rem 0.7rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', color: '#333' },
  expTitle: { margin: '0 0 0.2rem', fontWeight: '600', color: '#1a1a2e' },
  expDate: { margin: 0, fontSize: '0.8rem', color: '#888' },
  expRight: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  expAmount: { fontWeight: '700', fontSize: '1.1rem', color: '#4f46e5' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' },
};