import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, path.join(__dirname, "../../public/images"));
  },
  filename: function (req, file, cd) {
    cd(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
