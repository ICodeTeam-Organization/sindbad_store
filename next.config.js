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
    ],
  },
};
