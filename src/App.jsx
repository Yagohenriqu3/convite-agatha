import { useState, useRef } from 'react';
import './App.css';

import bgImage from './assets/download.jfif';
import somFloresta from './assets/floresta-magica.mp3';

function App() {
  const [conviteAberto, setConviteAberto] = useState(false);
  const [saindo, setSaindo] = useState(false);
  const [modalEndereco, setModalEndereco] = useState(false);
  const [modalPresentes, setModalPresentes] = useState(false);
  const [tocando, setTocando] = useState(false);

  const audioRef = useRef(null);

  const iniciarConvite = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 1.0;
      audioRef.current.play()
        .then(() => setTocando(true))
        .catch((err) => console.log("Erro áudio:", err));
    }
    setSaindo(true);
    setTimeout(() => setConviteAberto(true), 500);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (tocando) {
        audioRef.current.pause();
        setTocando(false);
      } else {
        audioRef.current.muted = false;
        audioRef.current.play();
        setTocando(true);
      }
    }
  };

  const telefoneWhatsapp = '5511999999999'; 
  const mensagemWhatsapp = encodeURIComponent('Olá! Gostaria de confirmar minha presença no aniversário de 1 ano da Agatha! 🎉');
  const linkWhatsapp = `https://wa.me/${telefoneWhatsapp}?text=${mensagemWhatsapp}`;

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-950 overflow-hidden">
      
      <audio ref={audioRef} src={somFloresta} loop preload="auto" />

      {/* TELA DE ABERTURA */}
      {!conviteAberto && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-500 ${
          saindo ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
        }`}>
          <div className="bg-amber-950/90 border-2 border-amber-400/60 rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl backdrop-blur-lg flex flex-col items-center">
            <span className="fonte-infantil-magica text-yellow-300 text-sm uppercase tracking-widest mb-1 drop-shadow">
              Você recebeu um
            </span>
            <h2 className="fonte-infantil-titulo text-white text-2xl font-bold mb-5 drop-shadow-md">
              Convite Especial ✨
            </h2>

            <button
              onClick={iniciarConvite}
              className="fonte-infantil-botao bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xl font-bold py-3.5 px-8 rounded-full shadow-lg transition-all active:scale-95 animate-bounce border-2 border-amber-300 cursor-pointer"
            >
              ▶️ Entrar no Convite
            </button>
            <p className="fonte-infantil-magica text-amber-200/80 text-xs mt-3">
              Clique para ligar a música e abrir 🎵
            </p>
          </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE DE SOM */}
      {conviteAberto && (
        <button
          onClick={toggleAudio}
          className="fixed top-3 right-3 z-40 bg-amber-500/90 hover:bg-amber-600 text-white p-2.5 rounded-full shadow-lg transition-transform active:scale-90 border-2 border-amber-300 cursor-pointer"
          title={tocando ? "Pausar som" : "Tocar som"}
        >
          {tocando ? '🔊' : '🔇'}
        </button>
      )}

      {/* CONTAINER DO CONVITE */}
      <div 
        className="relative w-full h-full max-w-[450px] aspect-[9/16] bg-cover bg-center shadow-2xl overflow-hidden flex flex-col justify-between"
        style={{ backgroundImage: `url(${bgImage})` }}
      >

        {/* BRILHOS MÁGICOS */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-yellow-200 rounded-full blur-[1px] animate-ping opacity-75"></div>
          <div className="absolute top-[35%] left-[25%] w-3 h-3 bg-amber-100 rounded-full blur-[2px] animate-pulse opacity-60"></div>
          <div className="absolute top-[50%] left-[10%] w-2 h-2 bg-yellow-300 rounded-full blur-[1px] animate-ping opacity-80"></div>
        </div>

        {/* FOLHAS CAINDO */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <span className="folha folha-1 absolute left-[5%] text-emerald-700 text-xl">🍃</span>
          <span className="folha folha-2 absolute left-[18%] text-amber-700 text-sm">🍂</span>
          <span className="folha folha-3 absolute left-[32%] text-emerald-600 text-base">🍃</span>
          <span className="folha folha-4 absolute left-[58%] text-emerald-700 text-lg">🍃</span>
          <span className="folha folha-5 absolute left-[88%] text-amber-800 text-lg">🍂</span>
        </div>

        {/* BRASÃO VERMELHO DO TOPO */}
        <div className="absolute top-[5.8%] left-[18%] right-[18%] h-[12.5%] text-center flex flex-col justify-center items-center z-10">
          <span className="fonte-infantil-magica text-yellow-200 text-xs sm:text-sm uppercase tracking-wider font-extrabold drop-shadow">
            CONVITE ESPECIAL
          </span>
          <h1 className="fonte-infantil-titulo text-white font-black text-lg sm:text-2xl leading-tight drop-shadow-md mt-0.5">
            Agatha faz 1 ano
          </h1>
        </div>

        {/* POSICIONAMENTO E FONTE BEM MAIOR NAS PLACAS */}
        
        {/* Placa 1: Ver Endereço */}
        <button
          onClick={() => setModalEndereco(true)}
          className="fonte-infantil-botao absolute top-[38.5%] right-[2%] w-[53%] h-[10%] bg-transparent text-amber-950 text-base sm:text-lg flex items-center justify-center transition-transform active:scale-95 cursor-pointer z-10 drop-shadow-sm"
        >
          📍 Ver Endereço
        </button>

        {/* Placa 2: Confirmar Presença */}
        <a
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="fonte-infantil-botao absolute top-[49%] right-[1%] w-[54%] h-[10%] bg-transparent text-amber-950 text-base sm:text-lg flex items-center justify-center transition-transform active:scale-95 cursor-pointer z-10 drop-shadow-sm"
        >
          ✅ Confirmar Presença
        </a>

        {/* Placa 3: Lista de Presentes */}
        <button
          onClick={() => setModalPresentes(true)}
          className="fonte-infantil-botao absolute top-[59.5%] right-[0%] w-[55%] h-[10%] bg-transparent text-amber-950 text-base sm:text-lg flex items-center justify-center transition-transform active:scale-95 cursor-pointer z-10 drop-shadow-sm"
        >
          🎁 Lista de Presentes
        </button>

        {/* MODAL DE ENDEREÇO */}
        {modalEndereco && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl border-4 border-amber-400 animate-scale-up">
              <h3 className="fonte-infantil-titulo text-2xl font-bold text-amber-900 mb-2">📍 Local da Festa</h3>
              <p className="text-gray-700 text-base mb-5">
                <strong>Salão de Festas Mágico</strong><br />
                Rua das Flores, nº 123 - Bairro Encantado
              </p>
              <button
                onClick={() => setModalEndereco(false)}
                className="fonte-infantil-botao w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 text-xl rounded-xl transition"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* MODAL DE PRESENTES */}
        {modalPresentes && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl border-4 border-amber-400 animate-scale-up">
              <h3 className="fonte-infantil-titulo text-2xl font-bold text-amber-900 mb-2">🎁 Sugestão de Presentes</h3>
              <ul className="text-gray-700 text-base text-left list-disc list-inside mb-5 space-y-1.5">
                <li>Roupas tamanho: 1 a 2 anos</li>
                <li>Calçados tamanho: 20/21</li>
                <li>Brinquedos educativos e pedagógicos</li>
              </ul>
              <button
                onClick={() => setModalPresentes(false)}
                className="fonte-infantil-botao w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 text-xl rounded-xl transition"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;