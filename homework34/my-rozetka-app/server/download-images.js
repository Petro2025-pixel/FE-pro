const fs = require('fs');
const path = require('path');
const https = require('https');

const products = require('./products.json');
const imagesDir = path.join(__dirname, 'public/images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {

      
      if (res.statusCode === 302 && res.headers.location) {
        return downloadImage(res.headers.location, filePath)
          .then(resolve)
          .catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      const file = fs.createWriteStream(filePath);
      res.pipe(file);

      file.on('finish', () => {
        file.close(resolve);
      });

    }).on('error', reject);
  });
}

(async () => {
  for (const product of products) {
    const fileName = `product-${product.id}.jpg`;
    const filePath = path.join(imagesDir, fileName);

    console.log(`⬇️ ${product.name}`);

    try {
      await downloadImage(product.image, filePath);
      product.image = `/images/${fileName}`;
      console.log(`✅ OK`);
    } catch (err) {
      console.log(`❌ NOT DOWNLOADED: ${err.message}`);
    }
  }

  fs.writeFileSync(
    './products.json',
    JSON.stringify(products, null, 2),
    'utf8'
  );

  console.log('🎉 Done. All possible pictures are downloaded');
})();
