import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs'

export default async function sendImageToModel(img_path){
  let data = new FormData();
  data.append('file', fs.createReadStream(img_path));
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://127.0.0.1:8000/infer',
    headers: { 
      ...data.getHeaders()
    },
    data : data,
    responseType: 'stream',
  };
  try{
    const response = await axios.request(config);
    response.data.pipe(fs.createWriteStream(img_path));
    return  {"gun":2}; //回傳是否有異樣 Boolean . 
    // or if (contraband) return json else return null
  }catch (error) {
    console.log(error);
  }
}


