import React, { useState } from 'react';
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../globalStates/RecoilState';
import { alert } from '../components/Alert';
import { login } from '../api/Api';
import { motion } from 'framer-motion';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [token, setToken] = useRecoilState(tokenState);
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await login({username, password});
            if (res.data.status === "success") {
                const user = res.data.user;
                const token = res.data.token.split("|")[1];
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                setUser(user);
                setToken(token);
                console.log(res.data.status);
                navigate("/dashboard");
                alert(`You logged to ${user.name}`);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Failed to login');
            }
        }
    };

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
            className='h-screen flex justify-center items-center'
        >
            <Card className="min-w-12 max-w-sm w-96 m-4">
                <div className='flex justify-center items-center mb-4'>
                    <img src="/logo/cylareLogo.png" alt="cylareLogo.png" width={32} />
                    <h1 className='ms-2 text-white font-semibold text-xl'>Cylare</h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="username" value="Username" />
                        </div>
                        <TextInput
                            id="username"
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Password" />
                        </div>
                        <TextInput
                            id="password1"
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Button type="submit" color="blue">Login</Button>
                    <p className='text-center text-gray-300 text-sm'>Don't have an account yet? <Link to="/register" className='text-blue-500'>Register here</Link></p>
                </form>
            </Card>
        </motion.div>
    );
}

export default Login;
