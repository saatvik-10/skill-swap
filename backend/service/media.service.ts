import { Medias } from "../models/media.model";
import type { CreateMedia } from "../validators/media.validator";

export class MediaService {
  async createMedia(data: CreateMedia) {
    await Medias.create(data);
  }
}
