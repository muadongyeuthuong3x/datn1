
import RoomComponent from "./roomComponent";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard";

const ListRoom = () => {
    const { loading } = useSelector(state => state.listRoom);
    return <DashBoard ComponentProps={RoomComponent} loading={loading} />
}

export default ListRoom;

