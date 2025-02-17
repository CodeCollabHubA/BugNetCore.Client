import { useEffect } from 'react';
import { getAllBugsWithFilterPaginationAndSorting } from 'src/services/bugApiService';
import { getAllProjectsWithFilterPaginationAndSorting } from 'src/services/projectApiService';
import { getAllUsersWithFilterPaginationAndSorting } from 'src/services/userApiService';
import { getAllSupportRequestsWithFilterPaginationAndSorting } from 'src/services/supportRequestApiService';
import { useMyContext } from './contextApi';

// const { bookApi, publisherApi, authorApi, userApi, borrowingApi } = apiEndPoints
const useAppInitialLoad = (user) => {
    const {
        setProjects,
        setBugs,
        setUsers,
        setSupportRequests,
        setIsLoading
    } = useMyContext()
// console.log(user,'this is app initial')
    const loadData = async () => {
        
        try {
            const { records: bugs } = await getAllBugsWithFilterPaginationAndSorting(null,null,null,null,25,1);
            setBugs(bugs)
            const { records: projects } = await getAllProjectsWithFilterPaginationAndSorting(null,null,null,null,25,1);
            setProjects(projects)
            const { records: users } = await getAllUsersWithFilterPaginationAndSorting(null,null,null,null,25,1);
            setUsers(users)
            const { records: SupportRequests } = await getAllSupportRequestsWithFilterPaginationAndSorting(null,null,null,null,25,1);
            setSupportRequests(SupportRequests)
        }
        catch (err) {
                console.error(err);
        }
    }
    useEffect(() => {
        setIsLoading(true)
        loadData()
        setIsLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])

}

export default useAppInitialLoad;
