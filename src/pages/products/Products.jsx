import React, { useEffect, useState } from 'react'
import Section from '../../components/Section'
import { Modal, Table, Tooltip } from 'flowbite-react'
import { baseURL, getProducts } from '../../api/Api';
import ProductCreate from './ProductCreate';
import { FaSpinner } from "react-icons/fa6";
import ProductEdit from './ProductEdit';
import ProductDelete from './ProductDelete';

function Products() {

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
  
  return (
    <Section>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl text-white'>Products</h1>
          <ProductCreate fetchData={fetchData}/>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head className='text-center'>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell className='w-[30%]'>Description</Table.HeadCell>
              <Table.HeadCell>Stock</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Expired</Table.HeadCell>
              <Table.HeadCell>
                Options
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {!loading ? (
                products.length > 0 ? (
                  products.map((p, index) => {
                    return (
                      <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className='text-center'>
                          {index + 1}
                        </Table.Cell>
                        <Table.Cell>
                          <ProductImage product={p} />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {p.title}
                        </Table.Cell>
                        <Table.Cell>
                          <span className='line-clamp-4'>{p.description}</span>
                        </Table.Cell>
                        <Table.Cell className='text-center'>{p.stock}</Table.Cell>
                        <Table.Cell className='text-center'>{p.price}</Table.Cell>
                        <Table.Cell className='text-center'>{p.expired}</Table.Cell>
                        <Table.Cell>
                          <div className='flex justify-center items-center gap-2'>
                            <ProductEdit product={p} fetchData={fetchData}/>
                            <ProductDelete id={p.id} fetchData={fetchData}/>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })
                ) : (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell colSpan={10} className='text-white p-12 text-center'>
                      There are no products here yet
                    </Table.Cell>
                  </Table.Row>
                )
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell colSpan={10} className='text-white p-12 text-center'>
                    <div className='flex justify-center items-center gap-2'>
                      <FaSpinner className='w-5 h-5 animate-spin'/>
                      <p className='text-gray-300'>Loading...</p>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
    </Section>
  )
}

export const ProductImage = (props) => {

  const {product} = props;
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Tooltip content="Click to view image" placement="right">
        <img onClick={handleOpen} src={`${baseURL()}/storage/${product.image}`} alt={`product_${product.id}`} width={96} height={96} className='aspect-square object-contain cursor-pointer bg-gray-900/50 border border-gray-700 rounded-lg' loading='lazy'/>
      </Tooltip>

      <Modal size="7xl" show={show} onClose={handleClose}>
        <Modal.Header>{product.title}</Modal.Header>
        <Modal.Body className='flex justify-center'>
          <div>
            <img src={`${baseURL()}/storage/${product.image}`} alt={`product_${product.id}`} loading='lazy'/>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Products