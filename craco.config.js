const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#face48',
              '@text-color': '#2d2d2d',
              '@text-color-inverse': '@text-color',
              '@btn-primary-color': '@text-color',
              '@link-color': '@text-color',
              '@pagination-item-bg-active': '@primary-color',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
