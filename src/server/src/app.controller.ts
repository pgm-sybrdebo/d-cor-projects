import {   Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
  Delete, } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';
import { AppService } from './app.service';
import { extname } from 'path';

const fs = require("fs");

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post('uploadProjectImages')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './uploads/images/projects',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedModulesImages(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const ext = extname(file.originalname);
      const fileReponse = {
        filename: file.filename,
        type: ext.replace('.', ''),
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get('project-image/:imgName')
  findProjectImage(@Param('imgName') image, @Res() res) {
    return res.sendFile(image, { root: './uploads/images/projects' });
  }

  @Delete('deleteProjectImage/:imgName')
  deleteProjectImage(@Param('imgName') image, @Res() res){
    if (fs.existsSync(`./uploads/images/projects/${image}`)){
      fs.unlink(`./uploads/images/projects/${image}`, (err) => {
        if (err) {
          res.status(400).send(err);
        }
      });
    return res.status(200).send({message: "deleted"})
    } else {
      return res.status(400).send("Image doesn't exist!")
    }
  }
}
