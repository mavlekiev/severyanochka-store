
"use client";
import ShareIcon from './ShareIcon';

const HOVER = "transition-all duration-300 ease-in-out hover:text-orange-100";

export default function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Severyanochka Store',
          text: 'Посмотрите магазин Severyanochka',
          url: window.location.href,
        });
      } catch {
        alert('Поделиться отменено');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована в буфер обмена!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-2 font-medium text-[10px] md:text-xs leading-[1.5] ${HOVER}`}
    >
      <ShareIcon />
      Поделиться
    </button>
  );
};