module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        'babel-plugin-transform-typescript-metadata', // Required for DI
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-transform-class-properties', { loose: true }], // Use 'transform' instead of 'proposal'
        ['module-resolver', {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@core': './src/core',
            '@data': './src/data',
            '@presentation': './src/presentation',
            '@infrastructure': './src/infrastructure',
            '@config': './src/config'
          }
        }],
        'react-native-worklets-core/plugin', // Add this
        'react-native-reanimated/plugin'     // ALWAYS LAST
      ]
    };
  };

  