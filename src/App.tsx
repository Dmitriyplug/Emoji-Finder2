import React, { useState, useEffect } from 'react';
import { getEmojis, type IEmojiItem } from './api/emojiApi';
const App: React.FC = () => {
  const [emojis, setEmojis] = useState<IEmojiItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { fetchData(); }, [searchTerm]);
  const fetchData = async () => {
    setLoading(true); setError(null);
    try { const data = await getEmojis(searchTerm); setEmojis(data); }
    catch (err) { setError('Ошибка загрузки данных'); }
    finally { setLoading(false); }
  };
  if (error) return <div style={{padding:'20px',color:'red',textAlign:'center'}}>{error}</div>;
  return (
    <div style={{maxWidth:'800px',margin:'0 auto',padding:'20px'}}>
      <h1>Поиск эмодзи</h1>
      <input type='text' placeholder='Поиск...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} style={{padding:'10px',width:'100%',marginBottom:'20px'}}/>
      {loading && <div>Загрузка...</div>}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(120px, 1fr))',gap:'15px'}}>
        {emojis.map((item) => (
          <div key={item.id} style={{border:'1px solid #ddd',padding:'15px',borderRadius:'8px',textAlign:'center'}}>
            <div style={{fontSize:'40px'}}>{item.emoji}</div>
            <h3>{item.title}</h3>
            <small>{item.keywords}</small>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;