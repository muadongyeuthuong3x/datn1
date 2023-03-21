
import TeacherComponent from "./teacher";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";

const ListTeacher = () => {
    const { loading } = useSelector(state => state.listTeacher);
    return <DashBoard ComponentProps={TeacherComponent} loading={loading} />
}

export default ListTeacher;

