import UserContext from "../context/UserContext"
import axios from 'axios'

axios.defaults.withCredentials=true
const UserProvider=({children})=>{
    //global state

    //global function

    const BaseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/'

    const handleRegister = async (payload) => {
        try {
          const res = await axios.post(`${BaseUrl}auth/register`, payload)
          console.log(res) 
          return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const  handleLogin=async(data)=>{
        try {
            const res=await axios.post(`${BaseUrl}auth/login`,data)
            console.log(res);
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const handleCreatePost = async (payload) => {
        try {
            const res = await axios.post(`${BaseUrl}post/create`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res)
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const handleGetAllPosts = async () => {
        try {
            const res = await axios.get(`${BaseUrl}post/all`)
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const value = {
        handleRegister,
        handleLogin,
        handleCreatePost,
        handleGetAllPosts
    }
    
    return(
        <UserContext.Provider  value={value}>
            {children}
        </UserContext.Provider>

    )
}
export default UserProvider;