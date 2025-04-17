// pages/index.js
import { useState, useEffect } from 'react';
import { alphabets } from '../data/letters';

export default function Home() {
  const [alphabet, setAlphabet] = useState('cyrillic');
  const [letters, setLetters] = useState([]);
  const [current, setCurrent] = useState(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    setLetters(alphabets[alphabet]);
  }, [alphabet]);

  useEffect(() => {
    pickRandom();
  }, [letters]);

  function handleAlphabetChange(e) {
    setAlphabet(e.target.value);
    setScore({ right: 0, wrong: 0 });
    setInput('');
  }

  function pickRandom() {
    if (!letters.length) return;
    const idx = Math.floor(Math.random() * letters.length);
    setCurrent(letters[idx]);
    setInput('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!current) return;
    const guess = input.trim().toUpperCase();
    const correct = current.lat.toUpperCase();

    if (guess === correct) {
      setModalMessage('✅ Richtig!');
      setScore(s => ({ right: s.right + 1, wrong: s.wrong }));
    } else {
      setModalMessage(`❌ Falsch! Korrekt ist: ${current.lat}`);
      setScore(s => ({ right: s.right, wrong: s.wrong + 1 }));
    }
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    pickRandom();
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'space-around',
      height: '100vh', padding: '2rem', fontFamily: 'Arial, sans-serif'
    }}>
      <p>By BrickHario</p>
      <h1 style={{ fontSize: '2em' }}>AlphaBeta</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Auswahl:
          <select value={alphabet} onChange={handleAlphabetChange} style={{ marginLeft: '0.5rem' }}>
            <option value="cyrillic">Kyrillisch</option>
            <option value="greek">Griechisch</option>
            <option value="arabic">Arabisch</option>
          </select>
        </label>
      </div>

      {current && (
        <>
          <div style={{ fontSize: '6rem', margin: '1rem', marginTop: '3vh' }}>
            {current.char}
          </div>
          <div style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#666' }}>
            Hinweis: {current.note}
          </div>

          <form onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Transliteration"
              style={{
                fontSize: '1.5rem',
                padding: '0.5rem',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginTop: '5vh'
              }}
            />
            <button type="submit"
                    style={{
                      fontSize: '1.2rem',
                      marginTop: '1rem',
                      padding: '0.5rem 1rem'
                    }}>
              Prüfen
            </button>
          </form>

          <button onClick={pickRandom}
                  style={{
                    marginTop: '5vh',
                    padding: '0.5rem 1rem',
                    fontSize: '1.5em'
                  }}>
            Nächstes Zeichen
          </button>

          <div style={{ marginTop: '2rem', fontSize: '1rem' }}>
            🎯 Richtig: {score.right}   ❌ Falsch: {score.wrong}
          </div>
        </>
      )}

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              {modalMessage}
            </p>
            <button onClick={closeModal}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '1rem'
                    }}>
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
