
import AppRechaetTeachers from "./rechartTeachers";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";
const RechartComponents = () => {
    // const { loading } = useSelector(state => state.listRoom);
    return <DashBoard ComponentProps={AppRechaetTeachers} loading={false} />
}

export default RechartComponents;

