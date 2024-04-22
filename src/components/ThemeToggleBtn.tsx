import { useEffect, useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggleBtn: FunctionalComponent = () => {
  const [swapRotate, setSwapRotate] = useState<[string, string] | null>(null)
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (swapRotate === null) {
      setSwapRotate(theme === 'dark' ? ['off', 'on'] : ['on', 'off'])
    }
  }, [swapRotate, theme])


  return (
    <label className='p-3 swap swap-rotate'>
      <input type='checkbox' onChange={toggleTheme} />
      { swapRotate !== null && (
        <>
          <MoonIcon className={`swap-${swapRotate[0]} fill-current w-6 h-6 fill-gray-200 stroke-gray-200`} />
          <SunIcon className={`swap-${swapRotate[1]} fill-current w-6 h-6 lg:w-7 lg:h-7 fill-yellow-500 stroke-yellow-500`} />
        </>
      )}
    </label>
  );
}

export default ThemeToggleBtn
