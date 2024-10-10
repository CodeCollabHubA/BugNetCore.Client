import { useEffect } from 'react';
// import { statusArray, statusEmoji } from '../utils/constant';
import { getAllBugsWithFilterPaginationAndSorting } from 'src/services/bugApiService';
import { getAllProjectsWithFilterPaginationAndSorting } from 'src/services/projectApiService';
import { getAllUsersWithFilterPaginationAndSorting } from 'src/services/userApiService';
import { getAllSupportRequestsWithFilterPaginationAndSorting } from 'src/services/supportRequestApiService';
import { useMyContext } from './ContextProvider';

// const { bookApi, publisherApi, authorApi, userApi, borrowingApi } = apiEndPoints
const useAppInitialLoad = () => {
    const {
        setProjects,
        setBugs,
        setUsers,
        setSupportRequests,
    } = useMyContext()

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
    },[])

    // useEffect(() => {
    //     if (user?.userRole === "Admin") {
    //         setBorrowingsActions(borrowings.filter(borrowing => ["Pending", "Borrowed"].includes(borrowing.status)))
    //     } else if (user?.userRole === "User") {
    //         setBorrowingsActions(borrowings.filter(borrowing => ["Pending", "Approved"].includes(borrowing.status)))
    //     }
    // }, [borrowings])

    // useEffect(() => {
    //     if (statusArray.includes(state?.status) && state?.message) {
    //         toast[state.status](`${state.message} ${statusEmoji[state.status]}`)
    //     }
    //     setState("")
    // }, [setState, state])

}

export default useAppInitialLoad;