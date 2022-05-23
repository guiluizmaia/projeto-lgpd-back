import { Request, Response } from 'express';

class UploadFilesController {
  public static async uploadFile(
    request: Request,
    response: Response,
  ): Promise<unknown> {
    return response
      .status(200)
      .json({
        file: request.file?.originalname,
        message: 'upload successfully',
      });
  }
}

export default UploadFilesController;
