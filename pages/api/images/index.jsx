import { PrismaClient } from '@prisma/client'
import { util } from '../../../components/util'
import formidable from "formidable";
import fs from "fs";
import { createRouter } from "next-connect";
import  multer from "multer";

const prisma = new PrismaClient()

const router = createRouter();

router.get(async (req, res) => {
  const page = req.query.page ?? 0;
  const limit = req.query.limit ?? 20;
  const total = await prisma.image.count();
  const images = await prisma.image.findMany({
    take: parseInt(limit),
    skip: parseInt(page) * parseInt(limit),
    orderBy: {
      id: 'asc',
    },
  })
  const totalPage = (total / parseInt(limit)).toFixed();
  const result = {
    total: total,
    data: images,
    page: page,
    total_page: (total / parseInt(limit)).toFixed(),
    per_page: parseInt(limit),
    next_page: parseInt(totalPage) > (parseInt(page) + 1) ? '/api/posts?limit=' + limit + '&&page=' + (parseInt(page) + 1) : null
  }
  res.json(result)
});

const saveFile = async (file) => {
  var today= new Date();

  console.log(file)
  const data = fs.readFileSync(file.filepath);

  const fileName = today.getTime()+"-"+file.originalFilename;
  fs.writeFileSync(`./public/images/${fileName}`, data);
  await fs.unlinkSync(file.filepath);
  return `${util.baseUrl}images/${fileName}`;
};

router.post((req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const fileUrl = await saveFile(files.file);
    const images = await prisma.image.create({
      data: {
        title: fields.title,
        description: fields.description,
        url: fileUrl,
      },
    })
    return res.json({status:"ok"})
  });
  return res.json({status:"ok"})
});




export default router.handler();

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};