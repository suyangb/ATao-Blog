import { useState, useRef, useEffect } from 'react';
import { Menu, Search, X, Home, Archive, Link, Train, User, Sun, Moon } from 'lucide-react';
import { NAVBAR } from '../config';

interface NavbarProps {
  currentPath: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// 图标映射表 - 将配置中的icon字符串映射到Lucide组件
const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  'mdi:home': Home,
  'mdi:archive': Archive,
  'mdi:link': Link,
  'mdi:train': Train,
  'mdi:account': User,
};

export default function Navbar({ currentPath, searchQuery: initialSearchQuery, setSearchQuery }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setLocalSearchQuery] = useState(initialSearchQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 暗色模式状态
  const [isDark, setIsDark] = useState(false);

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // 切换主题
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // 监听 search-updated 事件
  useEffect(() => {
    const handleSearchUpdated = ((e: CustomEvent) => {
      const query = e.detail.query || '';
      setLocalSearchQuery(query);
      if (query.trim().length > 0) {
        setIsSearchOpen(true);
      }
    }) as EventListener;

    window.addEventListener('search-updated', handleSearchUpdated);
    return () => window.removeEventListener('search-updated', handleSearchUpdated);
  }, []);

  // 清理防抖定时器
  useEffect(() => {
    return () => {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }
    };
  }, []);

  const navLinks = NAVBAR.links;

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        e.preventDefault();
        handleCloseSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setLocalSearchQuery('');

    if (setSearchQuery && typeof setSearchQuery === 'function') {
      try {
        setSearchQuery('');
      } catch (error) {}
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('search-updated', {
        detail: { query: '' }
      }));
    }
  };

  const handleClearOrClose = () => {
    if (searchQuery.trim().length > 0) {
      setLocalSearchQuery('');

      if (setSearchQuery && typeof setSearchQuery === 'function') {
        try {
          setSearchQuery('');
        } catch (error) {}
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('search-updated', {
          detail: { query: '' }
        }));
      }

      searchInputRef.current?.focus();
    } else {
      handleCloseSearch();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);

    if (setSearchQuery && typeof setSearchQuery === 'function') {
      try {
        setSearchQuery(value);
      } catch (error) {}
    }

    if (currentPath === '/') {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('search-updated', {
          detail: { query: value }
        }));
      }
    } else {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }

      if (value.trim().length > 0) {
        navigateTimeoutRef.current = setTimeout(() => {
          try {
            sessionStorage.setItem('pendingSearchQuery', value.trim());
            window.location.href = '/';
          } catch (e) {
            const searchParams = new URLSearchParams();
            searchParams.set('q', value.trim());
            window.location.href = `/?${searchParams.toString()}`;
          }
        }, 800);
      }
    }
  };

  const bgOpacity = NAVBAR.backgroundOpacity;
  const backdropBlur = NAVBAR.enableBackdropBlur ? 'backdrop-blur-md' : '';

  const renderNavLink = (link: any, isMobile: boolean = false) => {
    const IconComponent = link.icon ? iconMap[link.icon] : null;
    
    return (
      <a
        key={link.label}
        href={link.href}
        target={link.target || undefined}
        rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
        className={`${isMobile 
          ? 'block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2' 
          : 'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5'
        } ${currentPath === link.href
          ? 'text-docs-accent bg-blue-50 dark:bg-slate-800'
          : 'text-slate-600 dark:text-slate-300 hover:text-docs-accent dark:hover:text-docs-accent hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
        onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
      >
        {IconComponent && <IconComponent size={isMobile ? 18 : 16} />}
        {link.label}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      <div
        className={`absolute inset-0 ${backdropBlur} border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-colors duration-500`}
        style={{
          backgroundColor: isDark
            ? `rgba(17, 24, 39, ${bgOpacity})`
            : `rgba(255, 255, 255, ${bgOpacity})`,
        }}
      ></div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="/"
            className={`flex-shrink-0 cursor-pointer group flex items-center gap-2 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}
          >
            <div className="w-8 h-8 bg-docs-accent rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              {NAVBAR.logoIcon}
            </div>
            {NAVBAR.logoText && (
              <span className="font-serif font-bold text-xl tracking-tight text-slate-800 dark:text-white group-hover:text-docs-accent transition-colors">
                {NAVBAR.logoText}
              </span>
            )}
          </a>

          {isSearchOpen ? (
            <div className="flex-1 max-w-lg flex items-center animate-in fade-in zoom-in-95 duration-200">
              <div className="relative w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="搜索文章..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-none rounded-lg py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-docs-accent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <button
                  onClick={handleClearOrClose}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Clear search or close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:block flex-1">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => renderNavLink(link))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {!isSearchOpen && NAVBAR.showSearch && (
              <button
                onClick={handleOpenSearch}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-docs-accent hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>
            )}

            {/* 主题切换按钮 */}
            {NAVBAR.showThemeToggle && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-docs-accent hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            <div className="flex md:hidden gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-docs-accent hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && !isSearchOpen && (
        <div className="relative md:hidden bg-white dark:bg-slate-900 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => renderNavLink(link, true))}
            
            {/* 移动端菜单里也加上主题切换 */}
            {NAVBAR.showThemeToggle && (
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-docs-accent hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                切换主题
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
