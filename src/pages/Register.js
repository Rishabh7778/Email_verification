import { useState } from "react";
import axios from "axios";
import successGif from "../assets/verified.gif";


const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [verificationCode, setVerificationCode] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/auth/register", formData);
            setIsRegistered(true);
            setMessage("Verification code sent to your email.");
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed.");
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/auth/verifyEmail", { code: verificationCode });
            setMessage(response.data.message);
            setIsVerified(true); 
        } catch (error) {
            setMessage(error.response?.data?.message || "Verification failed.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        {!isRegistered ? (
            <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 mb-2 border rounded-md" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 mb-2 border rounded-md" />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 mb-2 border rounded-md" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Register</button>
            </form>
        ) : !isVerified ? (
            <form onSubmit={handleVerify} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Verify Email</h2>
                <input type="text" placeholder="Enter verification code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required className="w-full p-2 mb-2 border rounded-md" />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Verify</button>
            </form>
        ) : (
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-600">Email Verified Successfully!</h2>
                <img src={successGif} alt="Email Verified" className="w-40 h-40 mx-auto" />
            </div>
        )}
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
    );
};

export default Register;
