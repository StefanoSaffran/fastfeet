import { useEffect } from 'react';

export default function useMenuVisible(ref, handler) {
  const handleHideDropdown = event => {
    if (event.key === 'Escape') {
      handler();
    }
  };

  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClick, true);
    };
  });
}
