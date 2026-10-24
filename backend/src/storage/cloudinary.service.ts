import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private configured = false;

  private configure() {
    if (this.configured) return;
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      throw new ServiceUnavailableException('Cloudinary ainda não está configurado.');
    }
    cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET, secure: true });
    this.configured = true;
  }

  upload(buffer: Buffer): Promise<UploadApiResponse> {
    this.configure();
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'portfolio/projects', resource_type: 'image' }, (error, result) => {
        if (error || !result) return reject(error || new Error('Falha no upload.'));
        resolve(result);
      });
      stream.end(buffer);
    });
  }

  async remove(publicId?: string | null) {
    if (!publicId) return;
    this.configure();
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  }
}
