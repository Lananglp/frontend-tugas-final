import { Button, Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { baseURL, getProducts } from '../../api/Api'
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function LandingPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data.products);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const animationConfiguration = {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <motion.div 
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className='container mx-auto px-4 md:px-12 lg:px-24 xl:px-32 py-4 md:py-12 lg:py-24 xl:py-32'
    >
      <h1 className='mb-2 text-3xl font-bold text-white'>WELCOME TO TUGAS FINAL</h1>
      <p className='mb-8 leading-6 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, ullam! Nulla provident, cumque temporibus consequatur assumenda esse reiciendis incidunt distinctio commodi, sit ipsum nam quis deserunt! Ipsa possimus, nisi ipsum, tempora placeat minima accusamus repellat neque nostrum nemo ex expedita dicta ad labore officia eius, commodi enim vitae ipsam laudantium.</p>
      <Link to="/dashboard" className='inline-block'>
        <Button className='mb-8 px-2' size="xs" color="blue" type="button">
            <HiArrowNarrowLeft className='w-4 h-4 me-1' /> Back to dashboard
        </Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {!loading ? (
          products.length > 0 ? (
            products.map((p, index) => {
              return (
                <div key={index} className='bg-gray-800 rounded-lg border border-gray-700'>
                  <div className='flex justify-center'>
                    <div>
                      <img src={`${baseURL()}/storage/${p.image}`} alt={`Product_${index}`} className='h-44 aspect-video object-contain rounded-lg' loading='lazy' />
                    </div>
                  </div>
                  <div className='p-6'>
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {p.title}
                    </h5>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                      {p.description}
                    </p>
                    <div className='flex flex-wrap justify-between items-center'>
                      <p className='text-sm'>Stock: <span className='text-blue-400'>{p.stock}</span></p>
                      <p className='text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent from-blue-400 to-pink-400'>Rp. {p.price}</p>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='md:col-span-2 lg:col-span-4 bg-gray-900 rounded-lg border-2 border-dashed border-gray-800 h-44 flex justify-center items-center'>
              <p>No products have been added yet.</p>
            </div>
          )
        ) : (
          <div className='bg-gray-800 rounded-lg border border-gray-700'>
            <div className='flex justify-center'>
              <div className='w-full'>
                <div className='flex justify-center items-center bg-gray-700 w-full h-44 rounded-lg animate-pulse'>Loading...</div>
              </div>
            </div>
            <div className='p-6'>
              <div className='mb-4 inline-block bg-gray-700 rounded h-6 w-48 animate-pulse' />
              <div className="mb-2 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                <div className='flex flex-wrap gap-2'>
                  <div className='inline-block bg-gray-700 rounded h-4 w-12 animate-pulse' />
                  <div className='inline-block bg-gray-700 rounded h-4 w-24 animate-pulse' />
                  <div className='inline-block bg-gray-700 rounded h-4 w-12 animate-pulse' />
                  <div className='inline-block bg-gray-700 rounded h-4 w-28 animate-pulse' />
                  <div className='inline-block bg-gray-700 rounded h-4 w-28 animate-pulse' />
                  <div className='inline-block bg-gray-700 rounded h-4 w-12 animate-pulse' />
                  <div className='inline-block bg-gray-700 rounded h-4 w-8 animate-pulse' />
                  <div className='inline-block bg-gray-700 rounded h-4 w-12 animate-pulse' />
                </div>
              </div>
              <div className='flex flex-wrap justify-between items-center mt-8'>
                <div className='inline-block bg-gray-700 rounded h-4 w-14 animate-pulse' />
                <div className='inline-block bg-gray-700 rounded h-4 w-14 animate-pulse' />
              </div>
            </div>
          </div>
        )
        }
      </div>
    </motion.div>
  )
}

export default LandingPage