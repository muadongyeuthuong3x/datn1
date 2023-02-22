
import StudentComponent from "./studentComponent";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";

const StudentScore = () => {
    const { loading } = useSelector(state => state.listRoom);
    return <DashBoard ComponentProps={StudentComponent} loading={loading} />
}

export default StudentScore;

