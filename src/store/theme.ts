import { create } from 'zustand';
import { persist } from 'zustand/middleware';
function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
interface RememberMe {
  themeColor: string;
  setThemeColor: (color: string) => void;
}

export const useSetThemeStore = create<RememberMe>()(
  persist(
    (set) => ({
      themeColor: '#8282CF',
      setThemeColor: (themeColor) => set({ themeColor }),
    }),
    {
      name: 'themeColor', 
      getStorage: () => localStorage,
    }
  )
);
