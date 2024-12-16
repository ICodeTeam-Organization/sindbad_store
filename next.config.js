module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "icode-sendbad-store.runasp.net",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.salla.sa",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img-cdn.pixlr.com",
        port: "",
        pathname: "/image-generator/history/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/150/0000FF/808080?text=/**",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
        port: "",
        pathname: "/th/id/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/free-vector/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/free-photo/**",
      },
      {
        protocol: 'http',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

/* 

مثال باستخدام متغيرات البيئة:
إنشاء متغير بيئي:
في ملف .env.local، يمكنك إضافة أسماء النطاقات:
plaintext

Copy
IMAGE_DOMAINS=https://example.com,https://ik.imagekit.io
تعديل ملف التكوين:
في ملف next.config.js، يمكنك تقسيم النطاقات إلى مصفوفة واستخدامها:
javascript

Copy
const domains = process.env.IMAGE_DOMAINS.split(',');

module.exports = {
  images: {
    remotePatterns: domains.map(domain => ({
      protocol: domain.startsWith('https') ? 'https' : 'http',
      hostname: domain.replace(/https?:\/\//, ''),
      port: '',
      pathname: '/**',
    })),
  },
};


*/