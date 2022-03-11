
import {inject, service} from '@loopback/core';
//import {repository} from '@loopback/repository';
import {
  post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import path from 'path';
import {UploadFilesKeys} from '../config/upload-file-keys';
import {LoadFileService} from '../services';


export class UploadFilesController {
  constructor(
    @service(LoadFileService)
    public loadFileService: LoadFileService//Service used to load files to the server
  ) { }

  @post('/cargarImagenMascota', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Function to load the pet image',
      },
    },
  })
  async cargarImagenMascota(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const petImagePath = path.join(__dirname, UploadFilesKeys.PET_IMAGE_PATH);
    let res = await this.loadFileService.StoreFileToPath(petImagePath, UploadFilesKeys.PET_IMAGE_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file?.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

}
