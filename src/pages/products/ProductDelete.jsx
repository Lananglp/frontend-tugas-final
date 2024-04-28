import { Button } from 'flowbite-react'
import React from 'react'
import { HiTrash } from "react-icons/hi";
import { alert, confirmAlert } from '../../components/Alert';
import { deleteProducts } from '../../api/Api';

function ProductDelete(props) {

    const {id, fetchData} = props;

    const handleDelete = async (id) => {
        confirmAlert("Delete the product?", "This action will make you died, be carefull with your life.").then( async (res) => {
            if (res.isConfirmed) {
                try {
                    const res = await deleteProducts(id);
                    if (res.data.status === "success") {
                        alert("Delete product successfully");
                        fetchData();
                    }
                } catch (error) {
                    console.log(error.response);
                }
            }
        })
    }

    return (
        <>
            <Button onClick={() => handleDelete(id)} title='delete products' type='button' size="xs" color="red">
                <HiTrash className='w-4 h-4' />
            </Button>
        </>
    )
}

export default ProductDelete