
import ScheduleSComponent from "./schedules";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";

const ScheduleTest = () => {
    const { loading } = useSelector(state => state.listRoom);
    return <DashBoard ComponentProps={ScheduleSComponent} loading={loading} />
}

export default ScheduleTest;

