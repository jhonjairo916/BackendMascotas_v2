import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import path from 'path';
import {UploadFilesKeys} from '../config/upload-file-keys';

@injectable({scope: BindingScope.TRANSIENT})
export class DownloadFilesService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  /**
   * Get the folder when files are uploaded by type
   * @param type
   */
  public GetFolderPathByType(type: number) {
    let filePath = '';
    switch (type) {
      // mascota
      case 1:
        filePath = path.join(__dirname, UploadFilesKeys.PET_IMAGE_PATH);
        break;
      // course
      case 2:
        //filePath = path.join(__dirname, UploadFilesKeys.COURSE_IMAGE_PATH);
        break;
      // advertising
      case 3:
        //filePath = path.join(__dirname, UploadFilesKeys.ADVERTISING_IMAGE_PATH);
        break;
    }
    return filePath;
  }

  /**
   *
   * @param type
   */
  public async GetFilenameById(type: number, recordId: string) {
    let fileName = '';
    switch (type) {
      // customer
      case 1:
        /* const student: Student = await this.studentRepository.findById(recordId);
        fileName = student.profilePhoto ?? ''; */
        break;
      // product
      case 2:
        /* const course: Course = await this.courseRepository.findById(recordId);
        fileName = course.image; */
        break;
      // advertising
      case 3:
        /*  const adv: Advertising = await this.advertisingRepository.findById(recordId);
         fileName = adv.image; */
        break;
    }
    return fileName;
  }

  /**
   * Validate file names to prevent them goes beyond the designated directory
   * @param fileName - File name
   */
  public ValidateFileName(folder: string, fileName: string) {
    const resolved = path.resolve(folder, fileName);
    if (resolved.startsWith(folder)) return resolved;
    // The resolved file is outside sandbox
    throw new HttpErrors[400](`Invalid file name: ${fileName}`);
  }

}


