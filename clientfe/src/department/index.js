
import DepartmentComponent from "./departmentComponent";
import { useSelector } from 'react-redux'
import DashBoard from "../dashboard"; 

const Department = () => {
    const { loading } = useSelector(state => state.listDepartment)
    return <DashBoard ComponentProps={DepartmentComponent} loading={loading} />
}

export default Department;