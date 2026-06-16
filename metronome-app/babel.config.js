module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // react-native-worklets is a transitive requirement of
    // react-native-audio-api (its scheduler runs on the worklets runtime).
    // The worklets babel plugin MUST be listed last.
    plugins: ['react-native-worklets/plugin'],
  };
};
