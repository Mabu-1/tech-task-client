import { useQuery } from "@tanstack/react-query";
const UseUser = () => {

    const { data, isLoading, isFetching, refetch } = useQuery(
        {
            queryKey: ["users"],
            queryFn: async () => {
                const data = await fetch("https://tech-task-server-two.vercel.app//users");
                return await data.json();
            }
        }
    );


    return { data, isLoading, isFetching, refetch };
};

export default UseUser;