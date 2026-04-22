import { useState } from 'react';
import API from '../api/axios';

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Other'];

export default function AddExpenseForm({ onExpenseAdded }) {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await API.post('/expense', form);
      setForm({ title: '', amount: '', category: 'Food', date: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onExpenseAdded(); // refresh list in Dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>➕ Add New Expense</h3>

      {error && <div style={styles.error}>❌ {error}</div>}
      {success && <div style={styles.success}>✅ Expense added successfully!</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Title */}
        <div style={styles.field}>
          <label style={styles.label}>Title</label>
          <input
            style={styles.input}
            type="text"
            name="title"
            placeholder="e.g. Lunch, Uber, Netflix"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Amount */}
        <div style={styles.field}>
          <label style={styles.label}>Amount (₹)</label>
          <input
            style={styles.input}
            type="number"
            name="amount"
            placeholder="e.g. 250"
            value={form.amount}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        {/* Category */}
        <div style={styles.field}>
          <label style={styles.label}>Category</label>
          <select
            style={styles.input}
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div style={styles.field}>
          <label style={styles.label}>Date</label>
          <input
            style={styles.input}
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button
          style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Adding...' : '+ Add Expense'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  title: { margin: '0 0 1.2rem', color: '#1a1a2e', fontSize: '1.1rem' },
  error: {
    background: '#ffe0e0', color: '#cc0000',
    padding: '0.75rem', borderRadius: '8px',
    marginBottom: '1rem', fontSize: '0.9rem',
  },
  success: {
    background: '#e0ffe0', color: '#007700',
    padding: '0.75rem', borderRadius: '8px',
    marginBottom: '1rem', fontSize: '0.9rem',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  field: { display: 'flex', flexDirection: 'column' },
  label: {
    marginBottom: '0.4rem', fontWeight: '600',
    color: '#444', fontSize: '0.85rem',
  },
  input: {
    padding: '0.7rem 0.9rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '0.95rem',
    outline: 'none',
    background: '#fafafa',
  },
  button: {
    gridColumn: '1 / -1',
    padding: '0.85rem',
    background: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '0.25rem',
  },
};