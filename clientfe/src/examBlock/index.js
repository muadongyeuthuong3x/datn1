
import ExamBlockComponent from "./examBlock";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";

const ExamBlock = () => {
    const { loading } = useSelector(state => state.listExamBlock);
    return <DashBoard ComponentProps={ExamBlockComponent} loading={loading} />
}

export default ExamBlock;

