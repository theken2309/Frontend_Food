import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from "react-icons/md";
import { categories } from '../util/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebaseconnect';
import { saveItem } from '../util/firebaseFuntion';



const CreateContainer = () => {
  //khai báo state
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(true);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [alertStatus, setAlertStatus] = useState('dangera');
//ham xoa cac thong tin control sau khi luu 
  const clearData = () => {
    setTitle('');
    setImageAsset(null);
    setCalories('');
    setPrice('');
    setCategory('Select Category');
  };


  // ham up load anh 
  const upLoadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    // console.log(imageFile);
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      console.log(error);
      setFields(true);
      setMessage('Error when uploading, try again pls ');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMessage('Image uploaded successfully');
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      });
    })
  }

  //ham xoa anh 
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMessage('Image deleted successfully');
      setAlertStatus('success');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  }

  // ham luu thong tin 
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setMessage('Required fields cannot be empty');
        setFields(true);
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      }
      else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          quantity: 1,
          price: price,
        };
        saveItem(data)
        setIsLoading(false);
        setFields(true);
        setMessage('Product data uploaded successfully');
        clearData(); // ham nay la ham xoa du lieu day ! 
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      setFields(true);
      setMessage('Error when uploading, try again pls ');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  }
  return (

    <div className='flex w-full min-h-screen items-center justify-center' >
      <div className="w-[90%] md:w-[75%] border-gray-300 rounded-lg p-4 items-center justify-center flex flex-col">
        {
          fields && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full text-lg font-semibold text-center p-2  rounded-lg ${alertStatus === 'danger'
                ? 'bg-red-400 text-red-800'
                : 'bg-emerald-400 text-emerald-800'
                }`}>
              Something wrong
            </motion.p>
          )
        }
        {/* nhao ten san pham  */}
        <div className="flex w-full py-2 border-b border-gray-300 items-center gap-2">
          <MdFastfood className='text-xl text-gray-700' > </MdFastfood>
          <input type='text'
            value={title}
            placeholder="Input the title of the product"
            className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-300 outline-none border-none"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        {/* loai san oham  */}
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              select category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  value={item.urlParamName}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        {/* img   */}
        {/* image  */}
        <div className="flex flex-col group w-full h-225 md:h-420 cursor-pointer border-2 border-groove border-gray-300 rounded-lg items-center justify-center">
          {isLoading ? <Loader /> : <>
            {!imageAsset ? <>
              <label className="flex flex-col w-full h-full items-center justify-center cursor-pointer">
                <div className="flex flex-col w-full h-full items-center justify-center gap-2">
                  <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                  <p className="text-gray-500 hover:text-gray-700">
                    Click here to upload
                  </p>
                </div>
                <input
                  type="file"
                  name="uploadImage"
                  accept="image/*"
                  className="w-0 h-0"
                  onChange={upLoadImage}
                />
              </label>
            </> : <>
              <div className="relative h-full">
                <img
                  src={imageAsset}
                  alt="The one awaits for upload"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                  onClick={deleteImage}
                > <MdDelete /> </button>
              </div>
            </>}
          </>}
        </div>
        {/* set gia va calo  */}
        <div className="flex flex-col md:flex-row w-full items-center gap-3">
          {/* calories */}
          <div className="flex w-full py-2 border-b border-gray-300 items-enter gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />

            <input
              type="text"
              required
              value={calories}
              placeholder="Calories"
              onChange={e => setCalories(e.target.value)}
              className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-300 outline-none border-none"
            />
          </div>
          {/* giá  */}
          <div className="flex w-full py-2 border-b border-gray-300 items-enter gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              placeholder="Price"
              onChange={e => setPrice(e.target.value)}

              className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-300 outline-none border-none"
            />
          </div>
        </div>
        <div className="flex w-full items-center">
          <button
            type="button"
            className="w-full md:w-auto ml-0 md:ml-auto border-none outline-none mt-3  px-12 py-2 text-white text-lg font-semibold bg-emerald-500 rounded-lg "
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
export default CreateContainer