import axios from "axios";
import { toast } from 'react-toastify';
import constants from "../constants";

const putService = (payload, success, url) => {
    axios.put(`/${url}`, payload)
    .then((res) => {
        if (res.status === 200) {
            toast.success(success)
        }
        else {
            toast.warning(constants.something_went_wrong)
        }
    })
}

export default putService