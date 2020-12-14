/* eslint-disable import/no-extraneous-dependencies */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const resizeImages = (originPath, targetPath) => {
  const target = path.resolve(__dirname, originPath);
  const destination = path.resolve(__dirname, targetPath);

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  fs.readdirSync(target).forEach((image) => {
    const isSmall = image.includes('small');
    const isLarge = image.includes('large');
    const isXl = image.includes('xl');
    const needToResize = !isSmall && !isLarge && !isXl;
    if (needToResize) {
      // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
      sharp(`${target}/${image}`)
        .resize(800)
        .toFile(
          path.resolve(
            __dirname,
            `${destination}/${image
              .split('.')
              .slice(0, -1)
              .join('.')}-large.jpg`
          )
        );

      // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
      sharp(`${target}/${image}`)
        .resize(400)
        .toFile(
          path.resolve(
            __dirname,
            `${destination}/${image
              .split('.')
              .slice(0, -1)
              .join('.')}-small.jpg`
          )
        );

      sharp(`${target}/${image}`)
        .resize(1800)
        .toFile(
          path.resolve(
            __dirname,
            `${destination}/${image.split('.').slice(0, -1).join('.')}-xl.jpg`
          )
        );
    }
  });
};

resizeImages('src/public/images/heros', 'src/public/images/heros');
resizeImages('src/public/images/menus', 'src/public/images/menus');
