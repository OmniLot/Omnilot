
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link as LinkIcon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 25 }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export default function GalleryItemDetail({ item, onClose }) {
  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <style>{`
        .hologram-text {
          background: linear-gradient(45deg, #60a5fa, #3b82f6, #1d4ed8, #60a5fa);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          animation: hologram 3s ease-in-out infinite;
        }
        
        @keyframes hologram {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <motion.div
        className="w-full max-w-4xl max-h-[90vh] bg-gray-900/70 border border-blue-500/20 rounded-2xl shadow-2xl shadow-blue-500/10 flex flex-col md:flex-row overflow-hidden relative"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-20 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Image Section */}
        <div className="w-full md:w-2/3 h-64 md:h-auto relative overflow-hidden group flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold text-white mb-2 hologram-text">
              {item.name}
            </h2>
            <p className="text-md text-blue-300 mb-6">{item.type}</p>
            
            <p className="text-gray-300 mb-6 flex-grow">
              {item.description}
            </p>

            <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Features</h4>
                <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, index) => (
                        <span key={index} className="bg-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-full border border-blue-500/30 flex items-center gap-2">
                            <Star className="w-3 h-3 text-yellow-400"/>
                            {feature}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
