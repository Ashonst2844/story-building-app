import React from "react";

export function useFetch<T>(key:string, sort?:boolean) {
    const [data, setData] = React.useState<T[] | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<Error | null>(null);

    const API_URL = !import.meta.env.DEV ? `http://localhost:5000/api/${key}` : "/public/api.json"

    React.useEffect(() => {
        let ignore = false;
        
        fetch(API_URL)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return response.json();
            })
            .then((data: unknown)=>{
                if(!ignore) {

                    const resObj = data as Record<string, unknown>;

                    let extractedData: unknown;
                    if (key && resObj.result && typeof resObj.result === 'object') {
                        const resultPayload = resObj.result as Record<string, unknown>;
                        extractedData = resultPayload[key];
                    } else if (key && resObj[key]) {
                        extractedData = resObj[key];
                    } else {
                        extractedData = data;
                    }

                    if(sort && Array.isArray(extractedData)) {
                        const sortedData = [...extractedData].sort((a, b) => {
                            const itemA = a as { series: number };
                            const itemB = b as { series: number };
                            return itemA.series - itemB.series;
                        });
                        setData(sortedData)
                    } else {
                        setData(extractedData as T[])
                    }
                    setLoading(false)
                }
            })
            .catch((error)=>{
                setError(error)
                setLoading(false)
            })
        return () => {
            ignore = true;
        }
    },[API_URL,key,sort])


    return {data, loading, error};
}