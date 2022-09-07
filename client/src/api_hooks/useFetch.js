import axios from "axios";
import { useState, useEffect } from "react";
import constants from "../constants";
import API from "../api_config";

const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${API}/${url}`)
                .then((response) => {
                    setData(response.data)
                })
                .catch(() => console.log(constants.API_Error), [])
        }
        fetchData()
    }, [url])

    return [data];
};

export default useFetch;