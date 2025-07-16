import Album from "@/models/album";
import Song from "../models/song";
import { NextFunction, Request, Response } from "express";
import { uploadOnCloudinary } from "@/utils/cloudinary";

export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Missing audio or image file" });
    }

    const { title, artist, duration, albumId } = req.body;

    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audio = await uploadOnCloudinary(audioFile.path);
    const image = await uploadOnCloudinary(imageFile.path);

    const song = new Song({
      title,
      artist,
      imageUrl: image.secure_url,
      audioUrl: audio.secure_url,
      duration,
      albumId: albumId || null,
    });

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
    }

    const savedSong = await song.save();
    res.status(201).json(savedSong);
  } catch (error: any) {
    next(error);
  }
};
