import {useCallback, useEffect, useState} from "react";

async function sendHttp(url, config) {
    const response = await fetch(url, config);
    const resdata = await response.json();
    if (!response.ok) {
        throw new Error("Something went wrong :" + resdata.message)
    }
    return resdata

}


export default function useHttp(url, config) {
    const [data, setdata] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState()

    function clearData() {
        setdata([])
    }

    const sendRequest = useCallback(
        async function sendRequest(bodyData) {
            setLoading(true)
            try {
                if (bodyData) {
                    config = {...config, body: bodyData}
                }
                const resdata = await sendHttp(url, config)
                setdata(resdata)
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }, [url, config])

    useEffect(() => {
        if (config && config.method == 'GET') {
            sendRequest()

        }
    }, [sendRequest, config])

    return {
        data, loading, error, sendRequest,clearData
    }
}