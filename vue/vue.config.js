module.exports = {
    pwa: {
        themeColor: '#4481eb', //not required for service worker, but place theme color here if manifest.json doesn't change the color
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/sw.js'
            // ...other Workbox options...
        }
    },
    outputDir: '../firebase/public',
}