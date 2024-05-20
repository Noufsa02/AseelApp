// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// /** @type {import('expo/metro-config').MetroConfig} */
// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push('cjs');

// module.exports = defaultConfig;

// const { getDefaultConfig } = require('metro-config');
// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig();
//   const { assetExts } = defaultConfig.resolver;
//   return {
//     resolver: {
//       // Add bin to assetExts
//       assetExts: [...assetExts, 'bin'],
//     }
//   };
// })();

// const { getDefaultConfig: getMetroDefaultConfig } = require('metro-config');
// const { getDefaultConfig: getExpoDefaultConfig } = require('expo/metro-config');

// module.exports = (async () => {
//   // Get the default Metro configuration asynchronously
//   const metroDefaultConfig = await getMetroDefaultConfig();

//   // Get the Expo default configuration
//   const expoDefaultConfig = await getExpoDefaultConfig(__dirname);

//   // Combine the assetExts from both configurations and add 'bin' and 'cjs'
//   const combinedAssetExts = [
//     ...new Set([...metroDefaultConfig.resolver.assetExts, ...expoDefaultConfig.resolver.assetExts, 'bin', 'cjs']),
//   ];

//   // Merge the configurations with priority to the metro configuration
//   return {
//     ...metroDefaultConfig,
//     resolver: {
//       ...metroDefaultConfig.resolver,
//       assetExts: combinedAssetExts,
//     },
//   };
// })();

// const { getDefaultConfig } = require('expo/metro-config');

// module.exports = (async () => {
//   // Get the default configuration from Expo's metro config
//   const config = await getDefaultConfig(__dirname);

//   // Add additional asset extensions required by Firebase and ML models
//   const additionalAssetExts = ['cjs', 'bin', 'png', 'jpg'];  // Include any other extensions you need
//   config.resolver.assetExts = [...new Set([...config.resolver.assetExts, ...additionalAssetExts])];

//   return config;
// })();
// Import the default Expo Metro configuration
const { getDefaultConfig } = require('expo/metro-config');

// Get the default Metro configuration based on your project
const defaultConfig = getDefaultConfig(__dirname);

// Print existing asset extensions (optional step for debugging)
console.log('Existing asset extensions:', defaultConfig.resolver.assetExts);

// Ensure that common image extensions are included
const neededExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'svg', 'cjs', 'bin']; // Add 'cjs' or any custom extensions you need

// Filter out any already included extensions to avoid duplicates
neededExtensions.forEach(ext => {
    if (!defaultConfig.resolver.assetExts.includes(ext)) {
        defaultConfig.resolver.assetExts.push(ext);
    }
});

// Export the updated configuration
module.exports = defaultConfig;

