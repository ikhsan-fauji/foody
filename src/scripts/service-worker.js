/* eslint-disable no-restricted-globals */
import 'regenerator-runtime/runtime';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing/registerRoute';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
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
  ({ url }) =>
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30 * 2,
        maxEntries: 100
      })
    ]
  })
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

self.addEventListener('push', (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Foody Apps';
  }

  const options = {
    body,
    icon: './images/icons/icon-144x144.png',
    vibrate: [100, 58, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(self.registration.showNotification('Foody Apps', options));
});

cleanupOutdatedCaches();
