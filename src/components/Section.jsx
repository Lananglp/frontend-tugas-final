import React, { useEffect, useRef, useState } from 'react'
import { Button, Sidebar } from "flowbite-react";
import { HiChartPie, HiShoppingBag, HiMenuAlt2 } from "react-icons/hi";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/Api';
import { alert, confirmAlert } from './Alert';
import { useRecoilValue } from 'recoil';
import { userState } from '../globalStates/RecoilState';
import PageTransition from './transition/PageTransition';
import NavbarTransition from './transition/NavbarTransition';
import SidebarTransition from './transition/SidebarTransition';

function Section({children}) {

    const [sidebar, setSidebar] = useState(false);
    const sidebarRef = useRef(null);
    const navigate = useNavigate();
    const user = useRecoilValue(userState);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    const customHref = (url) => {
        navigate(url);
        setSidebar(false);
    };

    const customHrefAtProfile = (url) => {
        navigate(url);
        setSidebar(false);
    };

    useEffect(() => {
        sidebarRef.current.classList.toggle("hidden");
    }, [sidebar]);

    const handleLogout = async () => {
        confirmAlert("Logout now?", "You will close from this life.").then( async (res) => {
            if (res.isConfirmed) {
                try {
                    const res = await logout();
                    const user = localStorage.getItem("user");
                    const token = localStorage.getItem("token");
                    if (user && token) {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        navigate("/login");
                        alert(res.data.message);
                    }
                } catch (error) {
                    console.log(error.response);
                    alert(error.response.statusText);
                }
            }
        })
    }
    
    return (
        <div>
            <NavbarTransition className='fixed z-50 inset-x-0 top-0'>
                <Navbar fluid rounded className='m-4' border>
                    <Button onClick={toggleSidebar} className='block md:hidden relative border-0 py-3 px-2' color='dark'>
                        <HiMenuAlt2 className='absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl'/>
                    </Button>
                    <Navbar.Brand href="https://flowbite-react.com">
                        <img src="/logo/cylareLogo.png" className="mr-3 h-6 sm:h-9" alt="Cylare Logo" />
                        <span className="self-center whitespace-nowrap font-semibold dark:text-white">Cylare Tugas Final</span>
                    </Navbar.Brand>
                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">{user.name}</span>
                                <span className="block truncate text-sm font-medium">{user.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item onClick={() => customHrefAtProfile("/dashboard")}>Dashboard</Dropdown.Item>
                            <Dropdown.Item onClick={() => customHrefAtProfile("/products")}>Products</Dropdown.Item>
                            <Dropdown.Item onClick={() => customHrefAtProfile("/landingPage")}>Landing Page</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => handleLogout()}>Sign out</Dropdown.Item>
                        </Dropdown>
                        {/* <Navbar.Toggle /> */}
                    </div>
                    {/* <Navbar.Collapse>
                        <Navbar.Link href="#" active>Home</Navbar.Link>
                        <Navbar.Link href="#">About</Navbar.Link>
                        <Navbar.Link href="#">Services</Navbar.Link>
                        <Navbar.Link href="#">Pricing</Navbar.Link>
                        <Navbar.Link href="#">Contact</Navbar.Link>
                    </Navbar.Collapse> */}
                </Navbar>
            </NavbarTransition>

            <div ref={sidebarRef} className='hidden md:block fixed z-40 start-0 inset-y-0'>
                <SidebarTransition className="h-screen w-full pt-20 pb-8">
                    <Sidebar className='rounded m-4 border border-gray-700'>
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                <Sidebar.Item className="cursor-pointer" onClick={() => customHref("/dashboard")} icon={HiChartPie}>
                                    Dashboard
                                </Sidebar.Item>
                            <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                                    <Sidebar.Item className="cursor-pointer" onClick={() => customHref("/products")}>Products</Sidebar.Item>
                                    <Sidebar.Item className="cursor-pointer" onClick={() => customHref("/landingPage")}>Landing Page</Sidebar.Item>
                                {/* <Sidebar.Item className="cursor-pointer" onClick={() => customHref()} href="#">Sales</Sidebar.Item>
                                <Sidebar.Item className="cursor-pointer" onClick={() => customHref()} href="#">Refunds</Sidebar.Item>
                                <Sidebar.Item className="cursor-pointer" onClick={() => customHref()} href="#">Shipping</Sidebar.Item> */}
                            </Sidebar.Collapse>
                            {/* <Sidebar.Item className="cursor-pointer" onClick={() => customHref()} href="#" icon={HiInbox}>
                                Inbox
                            </Sidebar.Item>
                            <Sidebar.Item className="cursor-pointer" onClick={() => customHref()} href="#" icon={HiUser}>
                                Users
                            </Sidebar.Item>
                            <Sidebar.Item className="cursor-pointer" onClick={() => customHref()} href="#" icon={HiShoppingBag}>
                                Products
                            </Sidebar.Item>
                            <Sidebar.Item className="cursor-pointer" onClick={() => customHref()} href="#" icon={HiArrowSmRight}>
                                Sign In
                            </Sidebar.Item>
                            <Sidebar.Item className="cursor-pointer" onClick={() => customHref()} href="#" icon={HiTable}>
                                Sign Up
                            </Sidebar.Item> */}
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </SidebarTransition>
            </div>

            <div className="p-4 sm:ml-64">
                <div className="ps-0 md:ps-4 rounded-lg dark:border-gray-700 mt-20">
                    <PageTransition>
                        {children}
                    </PageTransition>
                </div>
            </div>
        </div>
    )
}

export default Section