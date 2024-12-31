import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const Settings = ({ theme, setTheme, currentTrack, setCurrentTrack, bgTheme, setBgTheme }) => {
  // Add useCallback to memoize the setTheme function
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return (
    <motion.div
      className={`fixed top-4 right-4 p-4 rounded-lg ${
        theme === 'dark' ? 'bg-black/20' : 'bg-white/20'
      } backdrop-blur-sm z-50`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex gap-2 items-center mb-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-white/10"
        >
          {theme === 'dark' ? <Sun className="text-white" /> : <Moon className="text-gray-800" />}
        </button>
        <select
          value={currentTrack}
          onChange={(e) => setCurrentTrack(e.target.value)}
          className={`bg-transparent ${theme === 'dark' ? 'text-white' : 'text-gray-800'} border border-white/20 rounded px-2 py-1`}
        >
          <option value="jingleBells">Jingle Bells</option>
          <option value="silentNight">Silent Night</option>
          <option value="weWishYou">We Wish You</option>
          <option value="snowfall">Snowfall</option>
        </select>
        <select
          value={bgTheme}
          onChange={(e) => setBgTheme(e.target.value)}
          className={`bg-transparent ${theme === 'dark' ? 'text-white' : 'text-gray-800'} border border-white/20 rounded px-2 py-1`}
        >
          <option value="christmas">Christmas</option>
          <option value="winter">Winter</option>
          <option value="festive">Festive</option>
        </select>
      </div>
    </motion.div>
  );
};

Settings.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
  currentTrack: PropTypes.string.isRequired,
  setCurrentTrack: PropTypes.func.isRequired,
  bgTheme: PropTypes.string.isRequired,
  setBgTheme: PropTypes.func.isRequired
};

export default Settings;

