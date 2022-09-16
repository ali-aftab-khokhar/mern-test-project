import axios from "axios";
import { toast } from 'react-toastify';
import constants from "../constants";

const postService = (payload, success, url = '') => {
    axios.post(`/${url}`, payload)
    .then((res) => {
        if (res.status === 200) {
            toast.success(success)
        }
        else {
            toast.warning(constants.something_went_wrong)
        }
    })
}

export default postService