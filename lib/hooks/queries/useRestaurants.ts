import { restaurants } from "@/lib/services/restaurants.service"
import { useQuery } from "@tanstack/react-query"


export const useRestaurants = ()=>{
    return useQuery({
        queryKey:["restaurants"],
        queryFn: restaurants.getRestaurants
    })
}