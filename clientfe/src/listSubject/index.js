
import SubjectComponent from "./subject";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";

const ListSubject = () => {
    const { loading } = useSelector(state => state.listUsers)
    return <DashBoard ComponentProps={SubjectComponent} loading={loading} />
}

export default ListSubject;

