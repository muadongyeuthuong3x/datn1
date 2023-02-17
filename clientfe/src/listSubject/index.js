
import Subject from "./subject";
import DashBoard from "../dashboard/index";
import { useSelector } from 'react-redux'

const ListSubject = () => {
    const { loading } = useSelector(state => state.listUsers)
    return <DashBoard ComponentProps={Subject} loading={loading} />
}

export default ListSubject;

