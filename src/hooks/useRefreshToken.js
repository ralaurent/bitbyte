import axios from 'axios';
import useAuth from './useAuth';
import Cookies from 'js-cookie'

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/refreshToken`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('jwt')}`,
                },
                withCredentials: true
            });
            setAuth(prev => {
                return {
                  ...prev,
                  user: response.data.message.user.username,
                  roles: response.data.message.user.roles,
                  accessToken: response.data.message.accessToken,
                  csrfToken: response.data.message.csrfToken
                }
            })

            return response.data.message.accessToken;
        } catch (error) {
            return null;
        }
    };
    return refresh;
};

export default useRefreshToken;