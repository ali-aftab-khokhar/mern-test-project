import axios from "axios";
import { toast } from 'react-toastify';

const deleteService = (url) => {
    axios.delete(`/${url}`)
        .then((res) => {
            if (res.status === 200) {
                toast.success('Deleted')
            }
            else {
                toast.warning('Something went wrong')
            }
        })
}

export default deleteService