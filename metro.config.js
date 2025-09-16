const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname, {
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
    alias: {
      // Ensure proper resolution for web
      'react-native': 'react-native-web',
    },
    // Exclude problematic native modules for web
    blockList: [
      /react-native-maps\/lib\/.*NativeComponent\.js$/,
      /react-native\/Libraries\/Utilities\/codegenNativeCommands/,
    ],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});

module.exports = config;
