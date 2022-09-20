import axios from "axios";
import { toast } from 'react-toastify';
import constants from "../constants";

const postService = async (payload, success, url = '') => {
    await axios.post(`/${url}`, payload)
    .then((res) => {
        if (res.status === 200) {
            toast.success(success)
            return res.data[0]._id
        }
        else {
            toast.warning(constants.something_went_wrong)
        }
    })
}

export default postService