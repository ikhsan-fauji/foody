/* eslint-disable no-restricted-globals */
import 'regenerator-runtime/runtime';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing/registerRoute';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { skipWaiting, clientsClaim, setCacheNameDetails } from 'workbox-core';

const webManifest = self.__WB_MANIFEST || [];

skipWaiting();
clientsClaim();

setCacheNameDetails({
  prefix: 'foody-app',
  precache: 'precache',
  runtime: 'runtime'
});

precacheAndRoute(
  [
    ...webManifest,
    {
      url:
        'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap',
      revision: 1
    },
    {
      url: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      revision: 1
    }
  ],
  { ignoreUrlParameterMatching: [/.*/] }
);

registerRoute(
  /^https:\/\/dicoding-restaurant-api\.el\.r\.appspot\.com\/(?:(list|detail))/,
  new NetworkFirst({
    cacheName: 'dicoding-restaurant-api',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 * 2,
        maxEntries: 100
      })
    ]
  })
);

cleanupOutdatedCaches();
