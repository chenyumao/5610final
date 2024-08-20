import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const updateUser = async (user: any) => {
    const response = await axios.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};
export const getCourses = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/courses`);
    return response.data;
};