import { useEffect } from 'react';
// import { statusArray, statusEmoji } from '../utils/constant';
import { getAllBugsWithFilterPaginationAndSorting } from 'src/services/bugApiService';
import { getAllProjectsWithFilterPaginationAndSorting } from 'src/services/projectApiService';
import { getAllUsersWithFilterPaginationAndSorting } from 'src/services/userApiService';
import { getAllSupportRequestsWithFilterPaginationAndSorting } from 'src/services/supportRequestApiService';
import { useMyContext } from './contextApi';

// const { bookApi, publisherApi, authorApi, userApi, borrowingApi } = apiEndPoints
const useAppInitialLoad = (user) => {
    // console.log(user,'from app init')
    const {
        setProjects,
        setBugs,
        setUsers,
        setSupportRequests,
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
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])

}

export default useAppInitialLoad;
