/* eslint-disable no-restricted-globals */
import 'regenerator-runtime/runtime';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing/registerRoute';
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate
} from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { skipWaiting, clientsClaim, setCacheNameDetails } from 'workbox-core';

const aDay = 24 * 60 * 60;
const aMonth = 30 * 24 * 60 * 60;
const aYear = 365 * 24 * 60 * 60;

skipWaiting();
clientsClaim();

setCacheNameDetails({
  prefix: 'foody-app',
  precache: 'precache',
  runtime: 'runtime'
});

precacheAndRoute(
  [
    ...self.__WB_MANIFEST,
    {
      url:
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.css',
      revision: 1
    }
  ],
  {
    ignoreUrlParameterMatching: [/.*/],
    maxAgeSeconds: aMonth
  }
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: aYear,
        maxEntries: 30
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
        maxAgeSeconds: aDay,
        maxEntries: 100
      })
    ]
  })
);

registerRoute(
  /^https:\/\/dicoding-restaurant-api\.el\.r\.appspot\.com\/(?:(images))/,
  new NetworkFirst({
    cacheName: 'dicoding-images',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: aMonth,
        maxEntries: 100
      })
    ]
  })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: aMonth,
        maxEntries: 60
      })
    ]
  })
);

cleanupOutdatedCaches();
