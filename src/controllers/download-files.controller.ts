// Uncomment these imports to begin using these cool features!

import {inject, service} from '@loopback/core';
import {
  get,
  oas,
  param,
  Response,
  RestBindings
} from '@loopback/rest';
import fs from 'fs';
import {promisify} from 'util';
import {DownloadFilesService} from '../services/download-files.service';
const readdir = promisify(fs.readdir);


export class DowloadFilesController {
  constructor(
    @service(DownloadFilesService)
    private downloadFilesServices: DownloadFilesService
  ) { }

  @get('/file/{type}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listFiles(@param.path.number('type') type: number,) {
    const folderPath = this.downloadFilesServices.GetFolderPathByType(type);
    const files = await readdir(folderPath);
    return files;
  }

  /**
     *
     * @param type
     * @param recordId
     * @param response
     */
  @get('/files/{type}/{recordId}')
  @oas.response.file()
  async downloadFile(
    @param.path.number('type') type: number,//Folder where the file is storage
    @param.path.string('recordId') recordId: string,//Id of the file to download
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const folder = this.downloadFilesServices.GetFolderPathByType(type);
    const fileName = await this.downloadFilesServices.GetFilenameById(type, recordId);
    const file = this.downloadFilesServices.ValidateFileName(folder, fileName);
    //console.log("folder: " + folder)
    //console.log("fname: " + fileName)
    response.download(file, fileName);
    return response;
  }


}
