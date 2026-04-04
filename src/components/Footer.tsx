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

  // 加载爱站统计脚本
  useEffect(() => {
    try {
      var _mtj = (window as any)._mtj || [];
      (function () {
        var mtj = document.createElement("script");
        (mtj as any).src = "https://node94.aizhantj.com:21233/tjjs/?k=z1focj1ja9h";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode?.insertBefore(mtj, s);
      })();
    } catch (err) {}
  }, []);

  return (
    <footer className="mt-auto pb-10 text-center text-xs text-slate-400 dark:text-slate-500">
      <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mb-8"></div>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-slate-400/80 dark:text-slate-500">
        <span>
          © {new Date().getFullYear()} 王苏洋Blog 主题 · 基于 Astro & Tailwind 构建
        </span>
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
