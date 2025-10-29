"use client";
import { useState } from 'react';
import ShareIcon from './ShareIcon';

const HOVER = "transition-all duration-300 ease-in-out hover:text-orange-100";

export default function ShareButton() {
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    
    try {
      await navigator.clipboard.writeText(currentUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className={`flex items-center gap-2 font-medium text-[10px] md:text-xs leading-[1.5] ${HOVER}`}
      >
        <ShareIcon />
        {showCopied ? 'Скопировано!' : 'Поделиться'}
      </button>
      
      {showCopied && (
        <div className="absolute top-full left-0 mt-1 bg-orange-100 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
          Ссылка скопирована!
        </div>
      )}
    </div>
  );
}