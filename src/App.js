import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import React,{ render } from "react-dom";
import Resizer from "react-image-file-resizer";
import imag from "./91333f10-6625-11eb-bde9-337d04aefcbd.jpeg"

export default function App (){
  const[image,setimage]=useState(imag)
  const imagehandler=(e)=>{
      // const reader=new FileReader();
      // reader.onload=()=>{
      //     if(reader.readyState===2)
      //     {
      //     setimage(reader.result)
      //     try {
      //       Resizer.imageFileResizer(
      //         e.target.files[0],
      //         100,
      //         100,
      //         "JPEG",
      //         100,
      //         0,
      //         (uri) => {
      //           console.log(uri);
      //           setimage(uri);
      //         },
      //         "base64"
      //       );
      //     } catch (err) {
      //       console.log(err);
      //     }

      //   }
      //     }
      // reader.readAsDataURL(e.target.files[0])
      const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;
const MIME_TYPE = "image/jpeg";
const QUALITY = 1;
        const file = e.target.files[0]; // get the file
        const blobURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;
        img.onerror = function () {
          URL.revokeObjectURL(this.src);
          // Handle the failure properly
          console.log("Cannot load image");
        };
        img.onload = function () {
          const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          canvas.toBlob(
            (blob) => {
              // Handle the compressed image. es. upload or save in local state
              displayInfo('Original file', file);
              displayInfo('Compressed file', blob);
            },
            MIME_TYPE,
            QUALITY
          );
          var dataURL = canvas.toDataURL();
          setimage(dataURL)
          document.getElementById("root").append(canvas);
        };
  }
  function displayInfo(label, file) {
    const p = document.createElement('p');
    p.innerText = `${label} - ${readableBytes(file.size)}`;
    document.getElementById('root').append(p);
  }
  function readableBytes(bytes) {
    const i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
  }
  function calculateSize(img, maxWidth, maxHeight) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

    return(
        <div>
        <div className="page">
        <img src={image}></img>
        <img src={image}></img>
        {/* <img id="preview"></img> */}
        </div>
        <input type="file" id="input" accept="image/*" onChange={imagehandler}/>
        </div>
    );
}
