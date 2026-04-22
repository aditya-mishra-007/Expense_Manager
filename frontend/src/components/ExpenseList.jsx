import API from '../api/axios';

const CATEGORY_COLORS = {
  Food: '#ff6b6b',
  Travel: '#4ecdc4',
  Bills: '#ffe66d',
  Shopping: '#a29bfe',
  Health: '#55efc4',
  Entertainment: '#fd79a8',
  Other: '#b2bec3',
};

const CATEGORY_ICONS = {
  Food: '🍔',
  Travel: '✈️',
  Bills: '🧾',
  Shopping: '🛍️',
  Health: '💊',
  Entertainment: '🎬',
  Other: '📦',
};

export default function ExpenseList({ expenses, onDelete }) {
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await API.delete(`/expense/${id}`);
      onDelete(id);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (expenses.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>🎉 No expenses found!</p>
        <p style={styles.emptySubText}>Add your first expense above.</p>
      </div>
    );
  }

  return (
    <div>
      {expenses.map((exp) => (
        <div key={exp._id} style={styles.item}>
          {/* Left */}
          <div style={styles.left}>
            <div
              style={{
                ...styles.iconBox,
                background: CATEGORY_COLORS[exp.category] || '#b2bec3',
              }}
            >
              {CATEGORY_ICONS[exp.category] || '📦'}
            </div>
            <div>
              <p style={styles.expTitle}>{exp.title}</p>
              <p style={styles.expMeta}>
                {exp.category} •{' '}
                {new Date(exp.date).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Right */}
          <div style={styles.right}>
            <span style={styles.amount}>₹{exp.amount.toLocaleString()}</span>
            <button
              style={styles.deleteBtn}
              onClick={() => handleDelete(exp._id)}
              title="Delete expense"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.9rem 0',
    borderBottom: '1px solid #f0f0f0',
  },
  left: { display: 'flex', alignItems: 'center', gap: '0.85rem' },
  iconBox: {
    width: '42px', height: '42px',
    borderRadius: '10px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    flexShrink: 0,
  },
  expTitle: {
    margin: '0 0 0.2rem', fontWeight: '600',
    color: '#1a1a2e', fontSize: '0.95rem',
  },
  expMeta: { margin: 0, fontSize: '0.8rem', color: '#888' },
  right: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  amount: {
    fontWeight: '700', fontSize: '1.05rem',
    color: '#4f46e5', minWidth: '70px', textAlign: 'right',
  },
  deleteBtn: {
    background: '#fff0f0', border: '1px solid #ffcccc',
    borderRadius: '6px', padding: '0.3rem 0.5rem',
    cursor: 'pointer', fontSize: '1rem',
  },
  empty: { textAlign: 'center', padding: '2rem 0' },
  emptyText: { fontSize: '1.1rem', color: '#444', margin: '0 0 0.4rem' },
  emptySubText: { color: '#888', fontSize: '0.9rem', margin: 0 },
};