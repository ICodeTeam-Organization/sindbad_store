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
      }

    ],
  },
};
