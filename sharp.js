const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images/hero");
const destination = path.resolve(__dirname, "dist/images/hero-image");

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  sharp(`${target}/${image}`)
    .resize(800)
    .webp()
    .toFile(
      path.resolve(
        __dirname,
        `${destination}/${image.split(".").slice(0, -1).join(".")}-large.webp`
      )
    );

  sharp(`${target}/${image}`)
    .resize(480)
    .webp()
    .toFile(
      path.resolve(
        __dirname,
        `${destination}/${image.split(".").slice(0, -1).join(".")}-small.webp`
      )
    );
});
