import React from 'react'
import delivery from '../img/delivery.png'
import HeroBg from '../img/heroBg.png'
// import i1 from '../img/i1.png'
import { heroProductData as heroData } from '../util/data'

const MainContainer = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
      <div className='py-2 flex-1 flex flex-col items-start  justify-center gap-2'>
        <div className='flex items-center gap-2 justify-center bg-orange-100 rounded-full p-2'>
          <p className='text-base text-orange-500 font-semibold'>Shiper</p>
          <div className='w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl'>
            <img className='w-full h-full object-contain' src={delivery} alt="" />
          </div>
        </div>
        <p className='text-[2rem] lg:text-[4rem] font-bold tracking-wide'>The Fastest Delivery in <span className='text-orange-500'>Food</span></p>
        <p className='text-base text-textColor'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure perferendis et nihil nam dolore culpa eius laborum illum dolor, nulla tenetur, temporibus hic aspernatur optio cum eaque quis ipsa! Repudiandae!</p>
        <button className='bg-gradient-to-br from-orange-400 to-orange-600 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>Order Now</button>
      </div>
      {/* nen cua form  */}
      <div className='w-full flex items-center justify-center relative'>
        <img
          src={HeroBg}
          className="ml-auto w-full h-420 lg:w-auto lg:h-650"
          alt="Homepage background"
        />

        <div className="flex w-full h-full absolute top-0 left-0 lg:px-32 py-4 items-center justify-center flex-wrap gap-4 flex-col ">
          {heroData && heroData.map(n => (
            <div key={n.id} className='className="lg:w-190 p-4 bg-cardOverlay backdrop:blur-md rounded-3xl items-center justify-center flex flex-col drop-shadow-lg"' >
              <img src={n.imageSrc} alt="Kem" className='w-20 lg:w-40 -mt-10 lg:-mt-22' />
              {/* ten san pham  */}
              <p className='className="text-base lg:text-lg mt-2 lg:mt-4 font-semibold text-textColor my-1"'>
               {n.name}
              </p>
              {/* {mo ta san pham }  */}
              <p className="text-[13px] font-semibold text-lighttextGray my-1 lg:my-3">
               {n.description}
              </p>
              {/* gia  */}
              <p className="text-sm font-semibold text-headingColor">{n.price}
                <span className="text-ts text-red-600"> Đồng</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainContainer