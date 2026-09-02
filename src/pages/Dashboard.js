import { useState, useEffect } from 'react';
import Loader from '../components/ui/Loader';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { token, user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";
    fetch(`${API_URL}/dashboard/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch dashboard data');
        return res.json();
      })
      .then(setData)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <Loader />;
  if (!user) return <div className="text-center py-5">Please log in to view your dashboard.</div>;
  if (!data) return <div className="text-center py-5">No dashboard data available.</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Dashboard</h2>
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
