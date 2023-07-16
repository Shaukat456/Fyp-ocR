import axios from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import Webcam from "react-webcam";

export const Login = ({setUser}) => {
  const handleSubmit = e => {
    let data = new FormData(e.target);

    let values = Object.fromEntries(data);
    console.log({ values });
    // if (!data.get("name") || !data.get("email")) {
    //   return;
    // }

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;

    // if (!emailRegex.test(data.get("email"))) {
    //   alert("Please enter a valid email address.");
    //   return "Please enter a valid email address.";
    // }
  
   e.preventDefault();
   setUser(true)
  };

  return (
    <section className="rounded-xl bg-gray-50  dark:bg-gray-900">
      <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 ">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form  onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={"abdulahadsheikh@gmail.com"}
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="************@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={"password123"}
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none   focus:ring-4 "
              >
                Sign in
              </button>
              <p className="space-x-5 text-sm font-light text-gray-900 dark:text-gray-400">
                Don’t have an account yet?
                <a
                  href="#"
                  className=" text-primary-600 dark:text-primary-500 space-x-6 font-medium hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(false);


  
const handleFileChange = event => {
  const files = event.target.files; s
  
  if (!files || files.length <=0) {
    return "ERROR UPLOADING FILES TO THE SERVER"
  }

 try {
   for (let i = 0; i < files.length; i++) {
    const file = files[i];
    selectedFile.push(file);
    previewUrl.push(URL.createObjectURL(file));
  }

  setSelectedFile(selectedFile); 
  setPreviewUrl(previewUrl);
 } catch (error) {
  if (error instanceof Error ) {
    console.log(error?.message)
    return error.message

  }
 }
  
};

  const handleUpload = async () => {
    try {
      let formData = new FormData();
      formData.append("filelist", selectedFile);
      const response = await axios.post("localhost:8000/filesend", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      toast("File uploaded successfully");
      return response.data
    } catch (error) {
      if (error instanceof Error){
        console.error("Error uploading file:", error.message);
        setError(true)
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
    <input
      className="border border-gray-300 rounded-md p-4 bg-gray-100 text-gray-700 text-sm leading-5 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue focus:ring-blue-400"
      type="file"
      multiple
      accept="image/jpg"
      onChange={handleFileChange}
    />
    {previewUrl && (
      <Image src={previewUrl} alt="Selected file" width={200} height={200} />
    )}
    <div className="p-1">
      {error && (
        <p className="my-5 border bg-red-500 text-white rounded-lg p-1">Error</p>
      )}
    </div>
    <button
      onClick={handleUpload}
      disabled={!selectedFile}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-md mt-4 focus:outline-none focus:shadow-outline-blue focus:ring-2 focus:ring-blue-400 transition-all duration-200 ease-in-out transform hover:scale-105"
    >
      Upload
    </button>
  </div>
  
  
  
  );
};

export const CameraComponent = () => {
  const webcamRef = useRef(null);
  const captureImage = async () => {
    const imageSrc = await webcamRef.current.getScreenshot();
    try {
      const response = await axios.post("localhost:8000/filesend", {
        image: imageSrc,
      });
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div
      className="cursor-pointer items-center justify-center border border-lime-900 text-center "
      title="Take Picture"
    >
      <Webcam audio={false} ref={webcamRef} />
      <button
        className="rounded-xl border border-blue-800 bg-blue-700 p-2 text-slate-200 "
        onClick={captureImage}
      >
        Capture
      </button>
    </div>
  );
};

export const Datalist = () => {
  return (
    <div className="m-10">
  <dl className="max-w-md divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white">
    <div className="py-3">
      <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg font-medium">
        Email address
      </dt>
      <dd className="text-lg">yourname@something.com</dd>
    </div>
    <div className="py-3">
      <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg font-medium">
        Home address
      </dt>
      <dd className="text-lg">
        92 Miles Drive, Newark, NJ 07103, California, USA
      </dd>
    </div>
    <div className="py-3">
      <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg font-medium">
        Home address
      </dt>
      <dd className="text-lg">
        92 Miles Drive, Newark, NJ 07103, California, USA
      </dd>
    </div>
    <div className="py-3">
      <dt className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg font-medium">
        Home address
      </dt>
      <dd className="text-lg">
        92 Miles Drive, Newark, NJ 07103, California, USA
      </dd>
    </div>
  </dl>
</div>

  );
};

export const Footer = () => {
  return (
    <footer className="fixed  bottom-0 m-4   w-full rounded-lg bg-white shadow dark:bg-gray-800 ">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2023{" "}
          <a href="" className="hover:underline">
            OCR
          </a>
          . All Rights Reserved.
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
