module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src': './src',
          '@common': './src/common',
          '@constants': './src/constants',
          '@styles': './src/styles',
          '@components': './src/components',
          '@animation': './src/animations',
          '@containers': './src/containers',
          '@menu': './src/menu',
          '@naivgations': './src/naivgations',
          '@reducers': './src/reducers',
          '@screens': './src/screens',
          '@translation': './src/translation'
        }
      }
    ]
  ]
}
