// components/ui/ThemeToggle.jsx
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

 const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};


export default ThemeToggle;