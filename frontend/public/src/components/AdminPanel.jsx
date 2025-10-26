import React, { useEffect, useState } from 'react';
import { request } from '../api';

export default function AdminPanel(){
  const [summary, setSummary] = useState(null);

  useEffect(()=> {
    async function load(){ 
      try {
        const s = await fetch('/api/admin/summary').then(r=>r.json());
        setSummary(s);
      } catch(e){}
    }
    load();
  }, []);

  if (!summary) return <div>Loading admin</div>;
  return (
    <div className="admin">
      <h2>Admin</h2>
      <pre>{JSON.stringify(summary, null, 2)}</pre>
    </div>
  );
}

