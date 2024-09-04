import React, { useState } from "react";
// import UserService from "../../services/UserService";
import axios from "axios";
import API from "../../apiManager/endpoints/index";
import { StorageService, RequestService } from "@formsflow/service";

const Loading = React.memo(() => {
    const [selectedFile, setSelectedFile] = useState(null);
    // const [, setUploadProgress] = useState(0);
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };

    // Function to generate the presigned url
    const getPresignedUrl = async () => {
      // GET request: presigned URL

      const URL = API.GET_PRESIGNED_URL;
      return RequestService.httpGETRequest(URL,
        {},
        StorageService.get(StorageService.User.AUTH_TOKEN),
        true
      )
      .then((res) => {
        console.log('presignedUrl res-->',res);
        console.log('presignedUrl-->',res.data.presignedUrl);
        if(res.data.presignedUrl)
          uploadToPresignedUrl(res.data.presignedUrl);
      })
      .catch((error) => {
        console.log('presignedUrl error-->',error);
      });

      // uploadToPresignedUrl('https://formsflow.s3.amazonaws.com/c32ac542-bc82-4826-882d-4194a53d4933.png?AWSAccessKeyId=AKIA6GBMGHYJZSQTGKGQ&Signature=nm3l5x7JFRZyKe1IqDS42ND51Ts%3D&Expires=1720007846');
      
    };
  
    // Function to upload the selected file using the generated presigned url
    const uploadToPresignedUrl = async (presignedUrl) => {
      // Upload file to pre-signed URL
      console.log('selectedFile---',selectedFile);
      const uploadResponse = await axios.put(presignedUrl, selectedFile, {
        headers: {
          "Content-Type": "image/jpeg",
        },
        // onUploadProgress: (progressEvent) => {
        //   const percentCompleted = Math.round(
        //     (progressEvent.loaded * 100) / progressEvent.total
        //   );
        // //   setUploadProgress(percentCompleted);
        //   console.log(`Upload Progress: ${percentCompleted}%`);
        // },
      });
      console.log('uploadResponse->', uploadResponse);
    };
  
    // Function to orchestrate the upload process
    const handleUpload = async () => {
      try {
        // Ensure a file is selected
        if (!selectedFile) {
          console.error("No file selected.");
          return;
        }
  
        const presignedUrl = await getPresignedUrl();
        uploadToPresignedUrl(presignedUrl);
      } catch (error) {
        // Handle error
        console.error("Error uploading file:", error);
      }
    };


  return (
    <div className="App">
        <h1>File Selection Component</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
    </div>
  );
});

export default Loading;

