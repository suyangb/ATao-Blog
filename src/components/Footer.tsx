import { useEffect, useState } from 'react';
import { ICP_INFO } from '../config';

export default function Footer() {
  const [siteTime, setSiteTime] = useState('');

  // 计算网站运行时间
  useEffect(() => {
    // 这里改成你的网站上线日期
    const launchDate = new Date('2025-07-17 00:00:00');

    const updateTime = () => {
      const now = new Date();
      const diff = now - launchDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setSiteTime(`${days}天${hours}时${minutes}分${seconds}秒`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="mt-auto pb-10 text-center text-xs text-slate-400 dark:text-slate-500">
      <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mb-8"></div>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-slate-400/80 dark:text-slate-500">
        <span>© {new Date().getFullYear()}</span>
        <a
          href="/"
          className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          王苏洋Blog
        </a>
        <span>主题</span>
        <span className="text-slate-300 dark:text-slate-600">·</span>
        <a
          href="https://astro.build"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          基于 Astro
        </a>
        <span className="text-slate-300 dark:text-slate-600">·</span>
        <a
          href="https://tailwindcss.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          Tailwind 构建
        </a>
        <span className="text-slate-300 dark:text-slate-600">·</span>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          {ICP_INFO.icp}
        </a>
        <span className="text-slate-300 dark:text-slate-600">·</span>
        {/* 公安备案 */}
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=34162202003345"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          皖公网安备34162202003345号
        </a>
        <span className="text-slate-300 dark:text-slate-600">·</span>
        {/* 本站运行时间 */}
        <span>本站已运行 {siteTime}</span>
        <span className="text-slate-300 dark:text-slate-600">·</span>
        <a
          href="/rss.xml"
          className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          aria-label="RSS 订阅"
        >
          RSS订阅
        </a>
      </div>
    </footer>
  );
}
