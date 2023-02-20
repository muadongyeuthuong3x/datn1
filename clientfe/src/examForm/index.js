
import ExamFormComponent from "./examForm";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";

const ListExamForm = () => {
    const { loading } = useSelector(state => state.listExamForm)
    return <DashBoard ComponentProps={ExamFormComponent} loading={loading} />
}

export default ListExamForm;

