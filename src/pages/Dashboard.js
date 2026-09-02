import { useState, useEffect } from 'react';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { token, user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError('You are not logged in.');
      return;
    }
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
    fetch(`${API_URL}/dashboard/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch dashboard data');
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <Loader />;
  if (error) return <EmptyState title="Error" description={error} />;
  if (!data) return <EmptyState title="No data" description="No dashboard data available." />;

  // Role-specific title
  const roleTitle =
    user?.role === 'admin' ? 'Admin Dashboard' :
    user?.role === 'trainer' ? 'Trainer Dashboard' :
    'Your Dashboard';

  return (
    <div className="container py-4">
      <h2 className="mb-4">{roleTitle}</h2>
      {data.chart && (
        <div className="mb-4">
          <img src={`data:image/png;base64,${data.chart}`} alt="Dashboard Chart" className="img-fluid" />
        </div>
      )}
      <div className="card p-3">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
