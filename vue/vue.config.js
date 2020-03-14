module.exports = {
    pwa: {
        themeColor: '#cf022b', //not required for service worker, but place theme color here if manifest.json doesn't change the color
        backgroundColor: '#071e22',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/sw.js'
            // ...other Workbox options...
        }
    }
}