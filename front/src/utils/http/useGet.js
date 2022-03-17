import React, { useCallback } from 'react';
import axios from 'axios';

export const useGet = (url, headers = null) => {
    // const [params, setParams] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const mountedRef = React.useRef(true)

    const fetchData = useCallback(() => {
        mountedRef.current = true;
        axios
            .get(url, headers)
            .then((response) => {
                if (!mountedRef.current) return null;
                const data = response?.data ?? null;

                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                if (!mountedRef.current) return null;
                setError(err);
                setLoading(false);
            })
            .finally(() => {
                if (!mountedRef.current) return null;
                setLoading(false);
            });
    }, [url, headers]);

    React.useEffect(() => {
        async function load() {
            setLoading(true);
            await fetchData();
        }

        load();
        
        // cancel subscription to useEffect
        return () => {
            mountedRef.current = false;
        }
    // eslint-disable-next-line
    }, [url]);

    // custom hook returns value
    return { data, error, loading, refetch: () => {
        setLoading(true);
        fetchData();
    }};
};