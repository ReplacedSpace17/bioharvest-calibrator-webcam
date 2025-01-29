import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // Solicitar acceso a la cámara
    const getWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: window.innerWidth, height: window.innerHeight } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error al acceder a la webcam:', err);
      }
    };

    getWebcam();

    // Limpiar el stream al desmontar el componente
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <>
      {/* Contenedor del video y overlay */}
      <div className="webcam-container">
        <video ref={videoRef} autoPlay playsInline muted className="webcam"></video>
        <div className="overlay-box"></div>
      </div>
    </>
  );
}

export default App;
