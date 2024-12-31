import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Card = ({ icon: IconComponent, color, message, onClick, isFlipped, theme }) => {
  return (
    <motion.div
      className="relative w-full max-w-[320px] aspect-[3/4] cursor-pointer perspective-1000 mx-auto"
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`absolute inset-0 w-full h-full duration-700 preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Card */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-2xl shadow-lg
            ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'}
            border-2 ${theme === 'dark' ? 'border-white/20' : 'border-gray-200/80'}
            backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}
        >
          <div
            className={`h-2/3 bg-gradient-to-br ${color} rounded-t-2xl
              flex items-center justify-center relative overflow-hidden`}
          >
            {/* Decorative Background Icons */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute top-3 left-3 opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>
              <motion.div 
                className="absolute bottom-3 right-3 opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </motion.div>
            </div>
            
            {/* Main Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <IconComponent className="w-14 h-14 sm:w-16 sm:h-16 text-white" />
            </motion.div>
          </div>
          
          {/* Question Mark Section */}
          <div className="h-1/3 flex items-center justify-center p-4">
            <p className={`text-2xl sm:text-3xl ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
              font-bold text-center transition-all duration-300`}>
              {message}
            </p>
          </div>
        </div>

        {/* Back Card */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-2xl shadow-lg rotate-y-180
            ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'}
            border-2 ${theme === 'dark' ? 'border-white/20' : 'border-gray-200/80'}
            backdrop-blur-sm`}
        >
          <div className={`h-full bg-gradient-to-br ${color} rounded-2xl
            flex items-center justify-center p-6 relative overflow-hidden`}>
            {/* Decorative Background Icons */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute top-3 right-3 opacity-10"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>
              <motion.div 
                className="absolute bottom-3 left-3 opacity-10"
                animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </motion.div>
            </div>
            
            {/* Message */}
            <p className="text-base sm:text-lg md:text-xl text-white text-center leading-relaxed
              font-medium tracking-wide px-2">
              {message}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

Card.propTypes = {
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired
};

export default Card;