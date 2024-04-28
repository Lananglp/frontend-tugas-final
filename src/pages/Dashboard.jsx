import React, { useEffect, useState } from 'react'
import Section from '../components/Section'
import { HiCollection, HiTrendingUp, HiTrendingDown, HiArrowNarrowRight } from "react-icons/hi";
import { Button, Card, Timeline } from 'flowbite-react';
import { getProducts } from '../api/Api';
import { FaSpinner } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Dashboard() {

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <Card>
                    <p className="mb-2 pb-2 border-b border-gray-600 flex items-center gap-2 text-gray-200"><HiCollection className='text-blue-400' /> Total Product {"[ REAL ]"}</p>
                    <div className='flex items-center'>
                        <p className='w-full text-white font-medium'>{products.length > 0 ? products.length : 0} Item</p>
                        <Link to="/products" className='py-1 px-3 text-nowrap text-sm rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700'>Show more...</Link>
                    </div>
                </Card>
                <Card>
                    <p className="mb-2 pb-2 border-b border-gray-600 flex items-center gap-2 text-gray-200"><HiTrendingUp className='text-green-400' /> Product Sale {"[ DEMO ]"}</p>
                    <div className='flex items-center'>
                        <p className='w-full text-white font-medium'>1.721 Item</p>
                        <Link to="/products" className='py-1 px-3 text-nowrap text-sm rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700'>Show more...</Link>
                    </div>
                </Card>
                <Card>
                    <p className="mb-2 pb-2 border-b border-gray-600 flex items-center gap-2 text-gray-200"><HiTrendingDown className='text-red-400' /> Product Expired {"[ DEMO ]"}</p>
                    <div className='flex items-center'>
                        <p className='w-full text-white font-medium'>236 Item</p>
                        <Link to="/products" className='py-1 px-3 text-nowrap text-sm rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700'>Show more...</Link>
                    </div>
                </Card>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <div className='sticky top-24 bg-gray-800 border border-gray-700 text-gray-300 rounded p-4'>
                        <h1 className='mb-2 text-3xl text-white tracking-widest'>Read me</h1>
                        <p className='border-b border-gray-600 pb-3 mb-3'>Created by <span className='text-blue-400'>Kadek Lanang Lanusa Putera</span></p>
                        <p>system requirements :</p>
                        <ul className='list-disc ps-8 mb-4'>
                            <li>node v20.12.2</li>
                            <li>php 8.1.25 or latest</li>
                        </ul>
                        <p>project setup :</p>
                        <ul className='list-disc ps-8 mb-4'>
                            <li>Vite + React Js <span className='text-blue-400 text-sm'>(Frontend)</span></li>
                            <li>Laravel <span className='text-red-400 text-sm'>(Backend)</span></li>
                        </ul>
                        <p>package installed :</p>
                        <ul className='list-disc ps-8 mb-4'>
                            <li>react-router-dom <span className='text-sky-500 text-sm'>(Router)</span></li>
                            <li>axios <span className='text-sky-500 text-sm'>(API fetching)</span></li>
                            <li>framer motion <span className='text-sky-500 text-sm'>(Animation & Transition)</span></li>
                            <li>flowbite react <span className='text-sky-500 text-sm'>(React Components)</span></li>
                            <li>react icon <span className='text-sky-500 text-sm'>(icon library)</span></li>
                            <li>recoil <span className='text-sky-500 text-sm'>(global state)</span></li>
                            <li>sweetalert2 <span className='text-sky-500 text-sm'>(alert)</span></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Timeline>
                        {!loading ? (
                            products.length > 0 ? (
                                products.map((p, index) => {
                                    return (
                                    <Timeline.Item key={index}>
                                        <Timeline.Point />
                                        <Timeline.Content>
                                            <Timeline.Time>{p.created_at}</Timeline.Time>
                                            <Timeline.Title>{p.title}</Timeline.Title>
                                            <Timeline.Body>
                                                {p.description}
                                            </Timeline.Body>
                                            {index === 0 &&
                                                <Link to="/products">
                                                    <Button color="gray">
                                                        View product
                                                        <HiArrowNarrowRight className='ms-2 w-[1.15rem] h-[1.15rem]' />
                                                    </Button>
                                                </Link>
                                            }
                                        </Timeline.Content>
                                    </Timeline.Item>
                                )})
                            ) : (
                                <Timeline.Item>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                        <Timeline.Time>Empty</Timeline.Time>
                                        <Timeline.Title>No products have been added yet</Timeline.Title>
                                        <Timeline.Body>
                                            To add a product, you can click the button below, then you will be directed to the product page.
                                        </Timeline.Body>
                                        <Link to="/products" className='inline-block'>
                                            <Button type='button' color="gray">
                                                Go to add product
                                                <HiArrowNarrowRight className='ms-2 w-[1.15rem] h-[1.15rem]' />
                                            </Button>
                                        </Link>
                                    </Timeline.Content>
                                </Timeline.Item>
                            )
                        ) : (
                            <Timeline.Item>
                                <Timeline.Point />
                                <Timeline.Content>
                                    <Timeline.Time>
                                        <div className='inline-block bg-gray-800 rounded h-4 w-32 animate-pulse'/>
                                    </Timeline.Time>
                                    <Timeline.Title>
                                        <div className='inline-block bg-gray-800 rounded-md h-8 w-72 animate-pulse'/>
                                    </Timeline.Title>
                                    <Timeline.Body className='flex flex-wrap items-center gap-2 w-2/4'>
                                        <div className='inline-block bg-gray-800 rounded h-4 w-48 animate-pulse'/>
                                        <div className='inline-block bg-gray-800 rounded h-4 w-48 animate-pulse'/>
                                        <div className='inline-block bg-gray-800 rounded h-4 w-48 animate-pulse'/>
                                        <div className='inline-block bg-gray-800 rounded h-4 w-48 animate-pulse'/>
                                        <div className='inline-block bg-gray-800 rounded h-4 w-48 animate-pulse'/>
                                    </Timeline.Body>
                                    <Button color="gray" disabled>
                                        <div className='flex justify-center items-center gap-2'>
                                            <FaSpinner className='w-5 h-5 animate-spin'/>
                                            <p className='text-gray-300'>Loading...</p>
                                        </div>
                                    </Button>
                                </Timeline.Content>
                            </Timeline.Item>
                        )}
                    </Timeline>
                </div>
            </div>
            {/* <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                    </div> */}
        </Section>
    )
}

export default Dashboard