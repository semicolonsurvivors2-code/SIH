import { useState, useEffect } from 'react';
import Loader from '../components/ui/Loader';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/dashboard/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch dashboard data');
        return res.json();
      })
      .then(setData)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (!data) return <div className="text-center py-5">Please log in to view your dashboard.</div>;

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
