// import  multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("resume");
// middlewares/multer.js
import multer from "multer";
import DataUriParser from "datauri/parser.js";
import path from "path";

const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("resume");

const parser = new DataUriParser();
export const getDataUri = (file) => {
  const ext = path.extname(file.originalname).toString();
  return parser.format(ext, file.buffer);
};

export { singleUpload };
