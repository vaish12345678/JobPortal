import DataUriParser  from "datauri/parser.js"//This module is used to
// // convert file buffers (binary data) into data URIs.

//This code is a utility function that helps convert binary file data into a data URI format,
import path from "path";
export const getDataUri= (file) =>{
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
//     file.originalname: This refers to the original file name (e.g., image.jpg).
// path.extname(): This function extracts the file extension from the file name (e.g., .jpg).
// .toString(): The file extension is returned as a string.
// So, if the file name is image.jpg, extName will be .jpg.
    return parser.format(extName,file.buffer);
}



