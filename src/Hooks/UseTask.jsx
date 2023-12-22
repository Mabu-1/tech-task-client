import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
const UseTask = () => {
    const {user}=useContext(AuthContext)

    const { data, isLoading, isFetching, refetch } = useQuery(
        {
            queryKey: ["tasks"],
            queryFn: async () => {
                const data = await fetch(`https://tech-task-server-two.vercel.app/tasks?user=${user.email}`);
                return await data.json();
            }
        }
    );


    return { data, isLoading, isFetching, refetch };
};

export default UseTask;