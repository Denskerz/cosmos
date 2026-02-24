/* 
  Project: DevOps-Nexus-Bento-Portfolio
  Theme: Deep Night & Indigo Accents
  Role: Global Styles & Custom Animations
*/

@layer base {
  :root {
    /* Цветовая палитра Deep Night */
    --color-bg: #050505;
    --color-card-bg: rgba(255, 255, 255, 0.03);
    --color-card-border: rgba(255, 255, 255, 0.08);
    --color-indigo-primary: #6366f1; /* Indigo-500 */
    --color-indigo-glow: rgba(99, 102, 241, 0.4);
    
    /* Шрифты */
    --font-inter: 'Inter', sans-serif;
  }

  body {
    background-color: var(--color-bg);
    color: #ffffff;
    font-family: var(--font-inter);
    overflow-x: hidden;
  }
}

@layer components {
  /* Эффект Glassmorphism для Bento-карточек */
  .bento-card {
    @apply relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .bento-card:hover {
    @apply border-white/20 bg-white/10;
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
  }
}

@layer utilities {
  /* --- Keyframes --- */

  /* Анимация пульсации для статуса пайплайнов */
  @keyframes glow-pulse {
    0% {
      box-shadow: 0 0 0 0 var(--color-indigo-glow);
      transform: scale(1);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
      transform: scale(1.05);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
      transform: scale(1);
    }
  }

  /* "Бегущий луч" по границе (Border Beam) */
  @keyframes border-beam {
    0% { offset-distance: 0%; }
    100% { offset-distance: 100%; }
  }

  /* Плавное парение иконок Lucide */
  @keyframes floating {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  /* --- Применение анимаций --- */

  .animate-glow {
    animation: glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-floating {
    animation: floating 3s ease-in-out infinite;
  }

  /* Логика Border Beam (требует наличия SVG или псевдоэлемента в HTML) */
  .border-beam-container::after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: conic-gradient(
      from 0deg at 50% 50%,
      transparent 0deg,
      var(--color-indigo-primary) 60deg,
      transparent 120deg
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .bento-card:hover.border-beam-container::after {
    opacity: 1;
    animation: border-beam 4s linear infinite;
  }
}

/* Кастомизация скроллбара для соответствия палитре */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg);
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-indigo-primary);
}
