import EditScore from "./editScoreStudent"

import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";

const ListScoreStudent = () => {
    const { loading } = useSelector(state => state.listScoreStudent)
    return <DashBoard ComponentProps={EditScore} loading={loading} />
}

export default ListScoreStudent;