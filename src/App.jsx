import React, { useState } from 'react';
import notification from './assets/notification.mp3';
import Confetti from 'react-confetti';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95vh',
    backgroundColor: '#f9fafb',
    fontFamily: "'Roboto', sans-serif",
    padding: '10px',
    overflow: 'hidden',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    width: '100%',
    maxWidth: '250px',
    outline: 'none',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  imagem: {
    maxHeight: '300px',
    width: 'auto',
    maxWidth: '100%',
    objectFit: 'contain', // Alterado para 'contain' para preservar as proporções
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    marginTop: '20px',
  },
  confettiWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    opacity: 1,
    transition: 'opacity 1s ease-out',
  },
  '@media (max-width: 600px)': {
    button: {
      padding: '12px 20px',
      fontSize: '16px',
      maxWidth: '200px',
    },
    imagem: {
      maxHeight: '250px',
    },
  },
};

const App = () => {
  const [gerarImg, setGerarImg] = useState(null);
  const [mostrarConfeti, setMostrarConfeti] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleGerarImagem() {
    setCarregando(true);
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const json = await response.json();

    setGerarImg(json.message);

    setTimeout(() => {
      const audio = new Audio(notification);
      audio.play();

      setMostrarConfeti(true);

      setTimeout(() => setMostrarConfeti(false), 3000);
      setCarregando(false);
    }, 500);
  }
  return (
    <div style={styles.container}>
      {mostrarConfeti && (
        <div style={styles.confettiWrapper}>
          <Confetti />
        </div>
      )}
      <button onClick={handleGerarImagem} style={styles.button}>
        {carregando ? 'Carregando...' : 'Clique aqui e não se arrependa!'}
      </button>
      {gerarImg && <img style={styles.imagem} src={gerarImg} />}
    </div>
  );
};

export default App;
