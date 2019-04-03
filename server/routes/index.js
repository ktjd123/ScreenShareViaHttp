import express from 'express';
import sharp from 'sharp';
import screen from 'screenshot-desktop';

const router = express();

router.get('/heart_beat', async (req, res) => {
  res.send('hi');
});

const imgPro = async (baseImg, width = 640, height = undefined, quality = 75) => {
  // const matches = baseImg.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  // if (!matches || matches.length !== 3) {
  //   throw new Error('is not image');
  // }
  // const imgBuff = Buffer.from(matches[2], 'base64');
  let resizeImgBuff;
  try {
    resizeImgBuff = await sharp(baseImg)
      .resize(width, height, {
        withoutEnlargement: true,
      })
      .flatten({
        background: {
          r: 255,
          g: 255,
          b: 255,
          alpha: 1,
        },
      })
      .jpeg({ quality })
      .toBuffer();
  } catch (e) {
    throw e;
  }
  return resizeImgBuff;
};

router.get('/screen', async (req, res) => {
  const img = await screen();
  const resizedImage = await imgPro(img, 1920, undefined, 80);
  const base64Img = `data:image/jpeg;base64,${Buffer.from(resizedImage).toString('base64')}`;

  return res.json({ img: base64Img });
});

export default router;
