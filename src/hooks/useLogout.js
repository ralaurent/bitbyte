import axios from 'axios'
import useAuth from './useAuth'
import Cookies from 'js-cookie'

const useLogout = () => {
    const { setAuth } = useAuth()

    const logout = async () => {
        setAuth({})
        try{
            axios.get(`${process.env.REACT_APP_BASE_URL}/logoutUser`, {
                headers: {
                  Authorization: `Bearer ${Cookies.get('jwt')}`,
                },
                withCredentials: true
            })
            .then(function (response) {
                Cookies.remove("jwt")
            })
            .catch(function (error) {
            })
        }catch(err){
            // notify()
        }
    }
    return logout
}

export default useLogout