
import RoomComponent from "./schedule";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";

const ScheduleTest = () => {
    const { loading } = useSelector(state => state.listRoom);
    return <DashBoard ComponentProps={RoomComponent} loading={loading} />
}

export default ScheduleTest;

