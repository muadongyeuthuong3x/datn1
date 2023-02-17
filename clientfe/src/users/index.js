import UsersComponent from "./users";
import DashBoard from "../dashboard/index";
import { useSelector } from 'react-redux'

const Users = () => {
    const {  loading } = useSelector(state => state.listUsers)
    return <DashBoard ComponentProps={UsersComponent} loading={loading} />
}

export default Users;