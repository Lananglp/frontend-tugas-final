import React, { useState } from 'react';
import { Button, FileInput, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import { HiOutlinePlusSm } from "react-icons/hi";
import { postProducts } from '../../api/Api';
import { alert } from '../../components/Alert';

function ProductCreate(props) {
    const {fetchData} = props;
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        stock: '',
        price: '',
        expired: '',
        image: null
    });
    const [errors, setErrors] = useState({});

    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setFormData(
            {
                title: '',
                description: '',
                stock: '',
                price: '',
                expired: '',
                image: null
            }
        );
        setErrors({});
        setImagePreview(null);
        setModal(false);
    };

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }));
    };

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, image: e.target.files[0]
        }));
        
        const imageURL = URL.createObjectURL(e.target.files[0]);
        setImagePreview(imageURL);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('stock', formData.stock);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('expired', formData.expired);
        formDataToSend.append('image', formData.image);

        try {
            const res = await postProducts(formDataToSend);
            if (res.data.status === "success") {
                setModal(false);
                alert('Product created successfully!');
                fetchData();
                handleClose();
            } else {
                // Handle error
                console.error('Failed to create product:', res.statusText);
            }
        } catch (error) {
            // console.error('Failed to create product:', error.message);
            setErrors(error.response?.data?.errors);
        }
    };

    return (
        <>
            <Button onClick={handleOpen} className='px-2' size="xs" color="blue" type="button">
                <HiOutlinePlusSm className='w-4 h-4 me-1' /> add product
            </Button>

            <Modal size="4xl" show={modal} onClose={handleClose}>
                <Modal.Header>Add Product</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='grid grid-cols-1 gap-4'>
                                <TextInput
                                    name="title"
                                    type="text"
                                    placeholder="Title *"
                                    onChange={handleChange}
                                />
                                {errors.title && <span className='text-xs text-red-500'>{errors.title}</span>}
                                <Textarea
                                    name="description"
                                    placeholder="Description *"
                                    rows={5}
                                    onChange={handleChange}
                                />
                                {errors.description && <span className='text-xs text-red-500'>{errors.description}</span>}
                                <TextInput
                                    name="stock"
                                    type="number"
                                    placeholder="Stock *"
                                    onChange={handleChange}
                                />
                                {errors.stock && <span className='text-xs text-red-500'>{errors.stock}</span>}
                                <TextInput
                                    name="price"
                                    type="number"
                                    placeholder="Price *"
                                    onChange={handleChange}
                                />
                                {errors.price && <span className='text-xs text-red-500'>{errors.price}</span>}
                                <TextInput
                                    name="expired"
                                    type="date"
                                    placeholder="Expired at *"
                                    onChange={handleChange}
                                />
                                {errors.expired && <span className='text-xs text-red-500'>{errors.expired}</span>}
                            </div>
                            <div>
                                <div>
                                    {imagePreview ? (
                                        <div className='flex flex-col'>
                                            <img src={imagePreview} alt="preview Image" className='max-h-96 object-contain'/>
                                            <Button onClick={() => setImagePreview(null)} className='py-0 mt-3' size="sm" color="dark">Change image</Button>
                                        </div>
                                    ) : (
                                        <div className='h-full w-full'>
                                            <Label
                                                htmlFor="dropzone-file"
                                                className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                            >
                                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                                    <svg
                                                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 16"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                        />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX SIZE. 5mb)</p>
                                                </div>
                                                <FileInput 
                                                    id="dropzone-file"
                                                    className="hidden"
                                                    name="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </Label>
                                        </div>
                                    )}
                                    <div className='mt-3'>
                                        {errors.image && <span className='text-xs text-red-500'>{errors.image}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-1'>
                                <div className='flex items-center gap-2'>
                                    <Button type='submit' color="blue" size="xs" className='px-4'>Submit</Button>
                                    <Button type='button' color="dark" size="xs" className='px-4' onClick={handleClose}>Close</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProductCreate;
