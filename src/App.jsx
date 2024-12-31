import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Bell, Gift, Heart, TreeDeciduous as TreesIcon, Calendar, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSwipeable } from 'react-swipeable';
import Card from './components/Card';
import CountdownTimer from './components/CountdownTimer';
import BackgroundSnow from './components/BackgroundSnow';
import Settings from './components/Settings';
import Sound from './components/Sound';

const SOUND_EFFECTS = {
  flip: '/card-flip.mp3',
  success: '/success.mp3',
  click: '/click.mp3'
};

const messages = [
  "ขอให้ปีใหม่นี้คุณมีความสุขมากๆ เจอแต่สิ่งดีๆ ✨",
  "ความพยายามของคุณในปีนี้จะส่งผลดีในปีหน้า 🌟",
  "คุณเก่งมากแล้วที่ผ่านปีนี้มาได้ ภูมิใจในตัวเองนะ 💪",
  "ขอให้ปีใหม่นี้เป็นปีที่พิเศษสำหรับคุณ 🎄",
  "ขอให้พบเจอแต่สิ่งดีๆ โชคดีตลอดปี 🍀",
  "ขอให้มีความสุข สุขภาพแข็งแรง ร่ำรวยเงินทอง 💰"
];

const inspirationalMessages = [
  "ปีนี้คุณได้ผ่านอะไรมามากมาย...",
  "ทั้งความสุข ความทุกข์ ความสมหวัง และผิดหวัง",
  "แต่คุณก็ยังเข้มแข็งและก้าวมาถึงจุดนี้ได้",
  "ขอบคุณที่เข้มแข็งมาตลอดปีนะ",
  "พร้อมที่จะก้าวไปข้างหน้าด้วยกัน"
];

const cards = [
  { id: 1, icon: TreesIcon, color: 'from-emerald-600 to-emerald-800', message: '?' },
  { id: 2, icon: Star, color: 'from-amber-500 to-amber-700', message: '?' },
  { id: 3, icon: Bell, color: 'from-rose-500 to-rose-700', message: '?' },
  { id: 4, icon: Gift, color: 'from-purple-500 to-purple-700', message: '?' },
  { id: 5, icon: Heart, color: 'from-red-500 to-red-700', message: '?' },
  { id: 6, icon: Calendar, color: 'from-blue-500 to-blue-700', message: '?' }
];

const THEMES = {
  christmas: {
    dark: 'from-gray-900 via-green-900 to-red-900',
    light: 'from-red-100 via-green-100 to-red-100'
  },
  winter: {
    dark: 'from-gray-900 via-blue-900 to-gray-900',
    light: 'from-blue-100 via-white to-blue-100'
  },
  festive: {
    dark: 'from-purple-900 via-red-900 to-amber-900',
    light: 'from-amber-100 via-red-100 to-purple-100'
  }
};

const ChristmasApp = () => {
  const [step, setStep] = useState('intro');
  const [messageIndex, setMessageIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [currentTrack, setCurrentTrack] = useState('snowfall');
  const [bgTheme, setBgTheme] = useState('christmas');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playSound = (soundType) => {
    if (isPlaying) {
      const sound = new Audio(SOUND_EFFECTS[soundType]);
      sound.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (step === 'inspiration' && messageIndex < inspirationalMessages.length - 1) {
      const timer = setTimeout(() => setMessageIndex((prev) => prev + 1), 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [messageIndex, step]);

  const handleCardClick = (cardId) => {
    if (!selectedCard) {
      setSelectedCard(cardId);
      playSound('flip');
      triggerFireworks();
    }
  };

  const triggerFireworks = () => {
    playSound('success');
    const count = 100;
    const defaults = {
      origin: { y: 0.7 },
      shapes: ['star'],
      colors: ['#26a65b', '#1e824c', '#019875', '#FFD700', '#FF69B4']
    };
    const fire = (particleRatio, opts) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  };

  const resetSelection = () => {
    setSelectedCard(null);
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextCard,
    onSwipedRight: prevCard,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${THEMES[bgTheme][theme]} flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden`}
    >
      <BackgroundSnow theme={theme} />
      <Settings
        theme={theme}
        setTheme={setTheme}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        bgTheme={bgTheme}
        setBgTheme={setBgTheme}
      />
      <CountdownTimer />
      <Sound currentTrack={currentTrack} isPlaying={isPlaying} />

      {/* Responsive Sound Control Button */}
      <button
        className="fixed top-4 left-4 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 z-50 backdrop-blur-sm"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? 
          <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-white" /> : 
          <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-white" />
        }
      </button>

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            className="text-center px-4 md:px-0"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onAnimationComplete={() => setTimeout(() => setStep('inspiration'), 2000)}
          >
            <motion.h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              } mb-6 md:mb-8 font-serif filter drop-shadow-lg`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              happy new year 2025
            </motion.h1>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`} />
            </motion.div>
          </motion.div>
        )}

        {step === 'inspiration' && (
          <motion.div
            className="text-center max-w-2xl px-4 md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.p
              key={messageIndex}
              className={`text-xl sm:text-2xl md:text-3xl ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              } font-serif filter drop-shadow-lg leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {inspirationalMessages[messageIndex]}
            </motion.p>
            {messageIndex === inspirationalMessages.length - 1 && (
              <motion.button
                className={`mt-6 md:mt-8 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg ${
                  theme === 'dark' ? 'bg-white/10' : 'bg-gray-800/10'
                } backdrop-blur-sm hover:bg-white/20 font-serif text-base sm:text-lg md:text-xl ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
                onClick={() => {
                  playSound('click');
                  setStep('cards');
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                เลือกการ์ดของคุณ ✨
              </motion.button>
            )}
          </motion.div>
        )}

        {step === 'cards' && (
          <motion.div
            className="relative w-full max-w-6xl px-4 md:px-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            {...handlers}
          >
            <div className="w-full overflow-hidden">
              <motion.div
                className="flex"
                initial={{ x: 0 }}
                animate={{ x: -currentIndex * 100 + '%' }}
                transition={{ duration: 0.5 }}
              >
                {cards.map((card) => (
                  <div className="w-full flex-shrink-0" key={card.id}>
                    <Card
                      icon={card.icon}
                      color={card.color}
                      message={selectedCard === card.id ? messages[card.id - 1] : card.message}
                      onClick={() => handleCardClick(card.id)}
                      isFlipped={selectedCard === card.id}
                      theme={theme}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedCard && (
        <motion.button
          className="mt-6 md:mt-8 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg bg-white/10 hover:bg-white/20 font-serif text-base sm:text-lg md:text-xl text-white backdrop-blur-sm"
          onClick={resetSelection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          เลือกการ์ดใหม่
        </motion.button>
      )}

      {/* Decorative Elements */}
      <motion.div
        className="fixed top-20 left-6 md:left-10 text-white/20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, 360]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Star className="w-8 h-8 md:w-10 md:h-10" />
      </motion.div>
      <motion.div
        className="fixed bottom-20 right-6 md:right-10 text-white/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, -360]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Bell className="w-8 h-8 md:w-10 md:h-10" />
      </motion.div>
    </div>
  );
};

export default ChristmasApp;