// ============================================
// 友情链接配置
// ============================================

export interface FriendLink {
    name: string;
    description: string;
    url: string;
    avatar: string;
    addDate?: string;
    recommended?: boolean;
    disconnected?: boolean; // 是否失联
}

export const FRIEND_LINKS: FriendLink[] = [
    {
        name: "轻笑Chuckle",
        description: "漫天倾尘,风中轻笑",
        url: "https://www.qcqx.cn/",
        avatar: "https://www.qcqx.cn/head.webp",
        addDate: "2025-09-03",
        recommended: true
    },
    {
        name: "Jackie的博客",
        description: "记录|交流|分享",
        url: "https://jackielzq.com/",
        avatar: "https://jackielzq.com/images/favicon.ico",
        addDate: "2025-09-03",
        recommended: true
    },
    {
        name: "幻影博客",
        description: "一个打工仔记录生活的网站，人生在世为何不留下一点生活的痕迹呢！",
        url: "https://blog.52hyjs.com/",
        avatar: "https://blog.52hyjs.com/logo.jpg",
        addDate: "2025-09-03",
        recommended: true
    },
    {
        name: "成烁BLOG",
        description: "成烁的个人博客网站",
        url: "https://blog.chengshuo.top/",
        avatar: "https://blog.chengshuo.top/logo.jpg",
        addDate: "2025-09-03",
        recommended: true
    },
    {
        name: "后港在线",
        description: "本地综合信息网",
        url: "https://www.0724.top",
        avatar: "https://www.0724.top/img/ico.png",
        addDate: "2025-09-03",
        recommended: true
    },
    {
        name: "星屿浮槎",
        description: "我自是年少，韶华倾负",
        url: "https://blog.byer.ink/",
        avatar: "https://blog.byer.ink/api/pro/f/4GOG/ava.jpg",
        addDate: "2025-09-03",
        recommended: true
    },
    {
        name: "CC米饭",
        description: "是全新的世界！",
        url: "https://www.ccrice.com/",
        avatar: "https://gravatar.loli.net/avatar/39bab898a41e6fa8d7357abd9c283bb7",
        addDate: "2025-09-03",
        recommended: true
    },
    {
        name: "Oyiso's Blog",
        description: "The shortest answer is doing",
        url: "https://oyiso.cn",
        avatar: "https://oyiso.cn/logo.png",
        addDate: "2025-09-03",
        recommended: true
    },
    {
        name: "笑的博客",
        description: "随性收拢生活散落的笑意，与同路人漫谈成长微澜。",
        url: "https://blog.xiaow.qzz.io",
        avatar: "https://wp-cdn.4ce.cn/v2/TVFIv5x.jpeg",
        addDate: "2025-09-03",
        recommended: true
    }
];
