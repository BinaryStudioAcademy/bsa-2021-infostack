/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const { getDefaultConfig } = require('metro-config');
const PATH_TO_SHARED = path.join(__dirname, '/../shared/build');

module.exports = async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: {
        'infostack-shared': path.resolve(PATH_TO_SHARED),
      },
    },
    watchFolders: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(PATH_TO_SHARED),
    ],
  };
};
