import { useState, useRef } from 'react';
import './App.css';

// Importação dos assets (imagem e áudio)
import bgImage from './assets/download.jfif';
import somFloresta from './assets/floresta-magica.mp3'; // Import do áudio direto da pasta src/assets/

function App() {
  const [conviteAberto, setConviteAberto] = useState(false);
  const [saindo, setSaindo] = useState(false);
  const [modalEndereco, setModalEndereco] = useState(false);
  const [modalPresentes, setModalPresentes] = useState(false);
  const [tocando, setTocando] = useState(false);

  // Referência para o elemento de áudio
  const audioRef = useRef(null);

  // Função para dar Play no som no momento do clique
  const iniciarConvite = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 1.0;
      
      audioRef.current.play()
        .then(() => setTocando(true))
        .catch((err) => console.log("Erro ao tocar áudio:", err));
    }

    setSaindo(true);

    setTimeout(() => {
      setConviteAberto(true);
    }, 500);
  };

  // Alternar Play / Pause pelo botão flutuante de som
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

  // Configuração do WhatsApp
  const telefoneWhatsapp = '5511999999999'; 
  const mensagemWhatsapp = encodeURIComponent('Olá! Gostaria de confirmar minha presença no aniversário de 1 ano da Agatha! 🎉');
  const linkWhatsapp = `https://wa.me/${telefoneWhatsapp}?text=${mensagemWhatsapp}`;

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 font-sans p-2 relative overflow-hidden">
      
      {/* Elemento de Áudio com a variável importada */}
      <audio 
        ref={audioRef} 
        src={somFloresta} 
        loop 
        preload="auto"
      />

      {/* TELA DE ABERTURA COM TRANSIÇÃO E BLUR */}
      {!conviteAberto && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-all duration-500 ease-in-out ${
            saindo ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <div className={`bg-amber-950/80 border-2 border-amber-400/50 rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl backdrop-blur-lg flex flex-col items-center transition-transform duration-500 ${
            saindo ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
          }`}>
            
            <span className="fonte-infantil-magica text-yellow-300 text-sm uppercase tracking-widest mb-2 drop-shadow">
              Você recebeu um
            </span>
            <h2 className="fonte-infantil-titulo text-white text-2xl font-bold mb-6 drop-shadow-md">
              Convite Especial ✨
            </h2>

            {/* Botão de Play */}
            <button
              onClick={iniciarConvite}
              className="fonte-infantil-botao bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg transition-all active:scale-95 animate-bounce flex items-center gap-2 border-2 border-amber-300 cursor-pointer"
            >
              ▶️ Entrar no Convite
            </button>
            
            <p className="fonte-infantil-magica text-amber-200/80 text-xs mt-4">
              Clique para ligar a música e abrir 🎵
            </p>
          </div>
        </div>
      )}

      {/* Botão Flutuante de Controle de Som */}
      {conviteAberto && (
        <button
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-40 bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg transition-transform active:scale-90 flex items-center justify-center border-2 border-amber-300 cursor-pointer"
          title={tocando ? "Pausar som" : "Tocar som"}
        >
          {tocando ? '🔊' : '🔇'}
        </button>
      )}

      {/* Container Principal do Convite */}
      <div 
        className={`relative w-full max-w-sm sm:max-w-md h-[100vh] max-h-[850px] bg-no-repeat bg-contain bg-center flex flex-col justify-between overflow-hidden shadow-2xl rounded-lg transition-all duration-700 ease-out ${
          conviteAberto ? 'scale-100 opacity-100' : 'scale-95 opacity-90'
        }`}
        style={{ backgroundImage: `url(${bgImage})` }}
      >

        {/* Camada de Brilhos Mágicos */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-yellow-200 rounded-full blur-[1px] animate-ping duration-1000 opacity-75"></div>
          <div className="absolute top-[35%] left-[25%] w-3 h-3 bg-amber-100 rounded-full blur-[2px] animate-pulse duration-700 opacity-60"></div>
          <div className="absolute top-[50%] left-[10%] w-2 h-2 bg-yellow-300 rounded-full blur-[1px] animate-ping duration-1000 opacity-80 delay-300"></div>
          <div className="absolute top-[15%] right-[20%] w-3 h-3 bg-yellow-100 rounded-full blur-[2px] animate-pulse duration-1000 opacity-70 delay-500"></div>
          <div className="absolute top-[65%] right-[15%] w-2 h-2 bg-amber-200 rounded-full blur-[1px] animate-ping duration-700 opacity-60 delay-200"></div>
        </div>

        {/* Camada de Folhas Caindo */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <span className="folha folha-1 absolute left-[5%] text-emerald-700 text-xl">🍃</span>
          <span className="folha folha-2 absolute left-[18%] text-amber-700 text-sm">🍂</span>
          <span className="folha folha-3 absolute left-[32%] text-emerald-600 text-base">🍃</span>
          <span className="folha folha-4 absolute left-[45%] text-amber-800 text-xs">🍂</span>
          <span className="folha folha-5 absolute left-[58%] text-emerald-700 text-lg">🍃</span>
          <span className="folha folha-6 absolute left-[68%] text-amber-700 text-sm">🍂</span>
          <span className="folha folha-7 absolute left-[78%] text-emerald-600 text-base">🍃</span>
          <span className="folha folha-8 absolute left-[88%] text-amber-800 text-lg">🍂</span>
          <span className="folha folha-9 absolute left-[25%] text-emerald-800 text-xs">🍃</span>
          <span className="folha folha-10 absolute left-[82%] text-amber-700 text-sm">🍂</span>
        </div>

        {/* Brasão Vermelho no Topo */}
        <div className="absolute top-[7.5%] left-[18%] right-[18%] text-center flex flex-col justify-center items-center h-[14%] z-10 px-2">
          <span className="fonte-infantil-magica text-yellow-200 text-xs sm:text-sm tracking-wider font-semibold drop-shadow">
            Convite Especial
          </span>
          <h1 className="fonte-infantil-titulo text-white font-bold text-base sm:text-xl leading-tight drop-shadow-md mt-0.5">
            Agatha faz 1 ano
          </h1>
        </div>

        {/* Placas de Madeira com os Botões */}
        <div className="absolute top-[40%] right-[3%] w-[52%] flex flex-col gap-[3.5%] z-10">
          
          {/* Botão 1: Mostrar Endereço */}
          <button
            onClick={() => setModalEndereco(true)}
            className="fonte-infantil-botao w-full h-11 sm:h-12 bg-transparent text-amber-950 font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center transition-transform active:scale-95 cursor-pointer rounded pt-2"
          >
            📍 Ver Endereço
          </button>

          {/* Botão 2: Confirmar Presença (WhatsApp) */}
          <a
            href={linkWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="fonte-infantil-botao w-full h-11 sm:h-12 bg-transparent text-amber-950 font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center transition-transform active:scale-95 cursor-pointer rounded pt-12"
          >
            ✅ Confirmar Presença
          </a>

          {/* Botão 3: Presentes Sugeridos */}
          <button
            onClick={() => setModalPresentes(true)}
            className="fonte-infantil-botao w-full h-11 sm:h-12 bg-transparent text-amber-950 font-extrabold text-xs sm:text-base tracking-wide flex items-center justify-center transition-transform active:scale-95 cursor-pointer rounded pt-17"
          >
            🎁 Lista de Presentes
          </button>
        </div>

        {/* Modal de Endereço */}
        {modalEndereco && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl border-4 border-amber-400 animate-scale-up">
              <h3 className="fonte-infantil-titulo text-xl font-bold text-amber-900 mb-2">📍 Local da Festa</h3>
              <p className="text-gray-700 text-sm mb-4">
                <strong>Salão de Festas Mágico</strong><br />
                Rua das Flores, nº 123 - Bairro Encantado
              </p>
              <button
                onClick={() => setModalEndereco(false)}
                className="fonte-infantil-botao w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 text-lg rounded-xl transition"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Modal de Presentes Sugeridos */}
        {modalPresentes && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl border-4 border-amber-400 animate-scale-up">
              <h3 className="fonte-infantil-titulo text-xl font-bold text-amber-900 mb-2">🎁 Sugestão de Presentes</h3>
              <ul className="text-gray-700 text-sm text-left list-disc list-inside mb-4 space-y-1">
                <li>Roupas tamanho: 1 a 2 anos</li>
                <li>Calçados tamanho: 20/21</li>
                <li>Brinquedos educativos e pedagógicos</li>
              </ul>
              <button
                onClick={() => setModalPresentes(false)}
                className="fonte-infantil-botao w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 text-lg rounded-xl transition"
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