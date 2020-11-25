/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/_dist_"
  },
  plugins: [
    [
      "@snowpack/plugin-svelte",
      {
        hmrOptions: { noPreserveState: true }
      }
    ],
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-webpack"
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  }
};
