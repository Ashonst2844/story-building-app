import React from "react";

export function useFetch<T>(url:string, option:"none"|"sort") {
    const [data, setData] = React.useState<T[] | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
        let ignore = false;
        fetch(url)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data: T[])=>{
                if(!ignore) {
                    if(option === "sort") {
                        const sortedData = [...data].sort((a, b) => {
                            const itemA = a as { series: number };
                            const itemB = b as { series: number };
                            return itemA.series - itemB.series;
                        });
                        setData(sortedData)
                    } else {
                        setData(data)
                    }
                    setLoading(false)
                }
            })
            .catch((error)=>{
                console.error("Failed To Take Data: ", error)
                setError(error)
                setLoading(false)
            })
        return () => {
            ignore = true;
        }
    },[url,option])

    return {data, loading, error};
}