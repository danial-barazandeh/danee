import { PrismaClient } from '@prisma/client'
import fs from 'fs';
import {util} from '../../../components/util';

const prisma = new PrismaClient()

export default async function handle(req, res) {


  if (req.method === 'GET') {
    const { id } = req.query
    const image = await prisma.image.findUnique({
      where: {
        id: id,
      }
    })
    res.json(image)
  } else if (req.method === 'PUT') {
    const { id } = req.query
    const { title, description } = req.body
    const updatedImage = await prisma.image.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
      },
    })

    const response = {
      status: true,
      image: updatedImage,
    }

    res.json(response)
  } else if (req.method === 'DELETE') {
    const { id } = req.query
    const deletedImage = await prisma.image.delete({
      where: {
        id:  id,
      },
    })

    const path = "./public/"+deletedImage.url.replace(util.baseUrl,'');
    var fs = require('fs');
    try {
      fs.unlink(path, function () {
        const response = {
          status: "1"
        }
        res.json(response);
      })
    } catch (err) {
      console.error(err)
      const response = {
        status: "0",
        err: err
      }
      res.json(path);
    }

    const response = {
      status: "1"
    }
    res.json(response);

  }


}