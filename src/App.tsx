import { useState } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ⚠️ PUT YOUR EMAIL HERE ⚠️
  const YOUR_EMAIL = 'tom.man09@icloud.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${YOUR_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `🎂 Birthday Message for Tony from ${name.trim()}!`,
          name: name.trim(),
          message: message.trim(),
        })
      });
      if (response.ok) { setSubmitted(true); setName(''); setMessage(''); }
      else { throw new Error('Failed'); }
    } catch { setError('Failed to send. Please try again.'); }
    finally { setSubmitting(false); }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    page: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: 'system-ui, -apple-system, sans-serif' },
    container: { maxWidth: '28rem', width: '100%' },
    header: { textAlign: 'center', marginBottom: '2rem' },
    iconWrap: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '5rem', height: '5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24, #f97316)', marginBottom: '1.5rem', boxShadow: '0 10px 40px rgba(249,115,22,0.3)' },
    icon: { fontSize: '2.5rem' },
    title: { fontSize: '2.5rem', fontWeight: 700, background: 'linear-gradient(90deg, #fff, #e9d5ff, #fbcfe8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' },
    name: { fontSize: '3.5rem', fontWeight: 900, background: 'linear-gradient(90deg, #fbbf24, #fb923c, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' },
    subtitle: { color: 'rgba(233,213,255,0.8)', fontSize: '1.1rem' },
    card: { backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' },
    label: { display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#e9d5ff', marginBottom: '0.5rem' },
    input: { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' as const, marginBottom: '1.25rem' },
    textarea: { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' as const, resize: 'none' as const, marginBottom: '1.25rem' },
    errorBox: { color: '#f87171', fontSize: '0.875rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '0.5rem', padding: '0.5rem 1rem', marginBottom: '1rem' },
    button: { width: '100%', padding: '1rem', background: 'linear-gradient(90deg, #a855f7, #ec4899, #f97316)', borderRadius: '0.75rem', color: 'white', fontWeight: 600, fontSize: '1.1rem', border: 'none', cursor: 'pointer', boxShadow: '0 10px 30px rgba(168,85,247,0.3)' },
    successIcon: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', borderRadius: '50%', background: 'linear-gradient(135deg, #4ade80, #10b981)', marginBottom: '1rem' },
    successTitle: { fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' },
    successText: { color: 'rgba(233,213,255,0.7)', marginBottom: '1.5rem' },
    secondaryBtn: { padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.75rem', color: 'white', fontWeight: 500, cursor: 'pointer' },
    footer: { textAlign: 'center', color: 'rgba(216,180,254,0.5)', fontSize: '0.875rem', marginTop: '2rem' }
  };

  const isDisabled = submitting || !name.trim() || !message.trim();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.iconWrap}><span style={styles.icon}>🎂</span></div>
          <h1 style={styles.title}>Happy Birthday</h1>
          <h2 style={styles.name}>Tony</h2>
          <p style={styles.subtitle}>Leave a message to celebrate the day ✨</p>
        </div>
        <div style={styles.card}>
          {submitted ? (
            <div style={{textAlign:'center',padding:'1.5rem 0'}}>
              <div style={styles.successIcon}><span style={{color:'white',fontSize:'2rem'}}>✓</span></div>
              <h3 style={styles.successTitle}>Message Sent!</h3>
              <p style={styles.successText}>Thank you for your birthday wishes 💜</p>
              <button onClick={()=>setSubmitted(false)} style={styles.secondaryBtn}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label style={styles.label}>Your Name</label>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" maxLength={50} required style={styles.input}/>
              <label style={styles.label}>Your Message for Tony</label>
              <textarea value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Write your birthday wishes..." rows={4} maxLength={500} required style={styles.textarea}/>
              {error && <p style={styles.errorBox}>{error}</p>}
              <button type="submit" disabled={isDisabled} style={{...styles.button, opacity: isDisabled ? 0.5 : 1, cursor: isDisabled ? 'not-allowed' : 'pointer'}}>{submitting ? 'Sending...' : 'Send Birthday Wishes 🎉'}</button>
            </form>
          )}
        </div>
        <p style={styles.footer}>Made with 💜 for Tony's special day</p>
      </div>
    </div>
  );
}
