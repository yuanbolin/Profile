import defaultSettings from './defaultSettings';
import slash from 'slash2';
import webpackPlugin from './plugin.config';
import router from './router.config';

const path = require('path')
const { primaryColor, title } = defaultSettings;
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: true,
      dll: false,
      library: 'react',
      title: title,
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
    },
  ],
];

export default {
  routes: router,
  base:'/',
  publicPath: '/static/',
  treeShaking: true,
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  history: 'hash', // hash路由
  targets: {
    ie: 9,
  },
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
  theme: {
    'primary-color': primaryColor,
  },

  ignoreMomentLocale: true, //忽略 moment 的 locale 文件，用于减少尺寸
  lessLoaderOptions: {
    javascriptEnabled: true,
  },

  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  disableRedirectHoist: true,

  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  copy:[
    {
      from: path.join(__dirname, '../') + '/public/common',
      to: path.join(__dirname, '../') + '/dist/common'
    }
  ],
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
};
