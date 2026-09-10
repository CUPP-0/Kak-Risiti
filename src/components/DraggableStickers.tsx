import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { StickerItem } from '../types';
import { sound } from '../utils/audio';

interface DraggableStickersProps {
  stickers: StickerItem[];
  containerRef?: React.RefObject<HTMLDivElement | null>;
  showReset?: boolean;
  onReset?: () => void;
}

export const DraggableStickers: React.FC<DraggableStickersProps> = ({
  stickers,
  containerRef,
  showReset = false,
  onReset
}) => {
  const localRef = useRef<HTMLDivElement>(null);
  const dragConstraintsRef = containerRef || localRef;

  return (
    <div
      ref={localRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-20"
      aria-hidden="true"
    >
      {stickers.map((sticker) => (
        <motion.div
          key={sticker.id}
          drag
          dragConstraints={dragConstraintsRef}
          dragElastic={0.15}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
          whileHover={{ scale: 1.08, rotate: sticker.rotation * 1.5, cursor: 'grab' }}
          whileDrag={{ scale: 1.15, cursor: 'grabbing', zIndex: 50 }}
          onDragStart={() => sound.playPop(380)}
          onDragEnd={() => sound.playPop(520)}
          onClick={() => sound.playSparkle()}
          initial={{
            opacity: 0,
            y: 20,
            rotate: sticker.rotation,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: sticker.rotation,
            scale: 1
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}
          style={{
            left: `${sticker.defaultX}%`,
            top: `${sticker.defaultY}%`,
            backgroundColor: sticker.color,
            color: sticker.textColor,
            borderColor: sticker.border || 'transparent',
          }}
          className="pointer-events-auto absolute transform -translate-x-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-md border backdrop-blur-xs flex items-center gap-1.5 active:shadow-xl transition-shadow cursor-grab"
        >
          <span>{sticker.text}</span>
          <span className="text-neutral-400 text-[10px] font-mono select-none opacity-50">✦</span>
        </motion.div>
      ))}

      {showReset && onReset && (
        <button
          onClick={() => {
            sound.playPop();
            onReset();
          }}
          className="pointer-events-auto absolute bottom-4 right-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-white/90 dark:bg-neutral-900/90 hover:text-neutral-900 dark:hover:text-white px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 shadow-sm transition-all backdrop-blur-xs"
        >
          ↺ Reset Stickers
        </button>
      )}
    </div>
  );
};
