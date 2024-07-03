import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const api_url = 'http://localhost:3000/api/v1/auth'



export const registerUser = async ({ name, email, password, confirmPassword }) => {
    try {
        const reqUrl = `${api_url}/register`;
        const response = await axios.post(reqUrl, {
            name,
            email,
            password,
            confirmPassword,
        });

        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong!", {
            position: 'top-right',
            autoClose: 2000,
        });
        return null;
    }
};
export const loginUser = async ({ email, password }) => {
    try {
        const reqUrl = `${api_url}/login`;
        const response = await axios.post(reqUrl, {
            email,
            password,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userId", response.data.userId);

        return response.data.name;
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong!", {
            position: 'top-right',
            autoClose: 2000,
        });
        return null;
    }
};



export const updateUser = async (userId, { name, updateEmail, oldPassword, newPassword, emails }) => {

    console.log(userId)
    console.log()
    try {
        const reqUrl = `${api_url}/update/${userId}`;
        const response = await axios.patch(reqUrl, {
            name,
            updateEmail,
            oldPassword,
            newPassword,
            emails,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};


export const getUser = async (userId) => {
    try {
        const reqUrl = `${api_url}/getUser/${userId}`;
        console.log("Fetching user data from:", reqUrl);
        const result = await axios.get(reqUrl)

        console.log(result.data)
        return result.data

    } catch (error) {
        console.log(error)
    }
}
