
import ExamComponent from "./exam";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";

const ListExam = () => {
    const { loading } = useSelector(state => state.listExam)
    return <DashBoard ComponentProps={ExamComponent} loading={loading} />
}

export default ListExam;

