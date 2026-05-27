import { api_wisata } from "@/constans/strings";
import { Destination } from "@/src/data/destinations";
import { useEffect, useState } from "react";

export const useGetAllWisata = () => {
    const [wisata, setWisata] = useState<Destination[]>([]);

    useEffect(() => {
        const fetchWisata = async () => {
            try {
                const response = await fetch(api_wisata);
                if (!response.ok) {
                    throw new Error("Failed to fetch wisata data");
                }
                const data = await response.json();
                setWisata(data);
            } catch (error) {
                console.error("Error fetching wisata data:", error);
            }
        };

        fetchWisata();
    }, []);

    return wisata;
}