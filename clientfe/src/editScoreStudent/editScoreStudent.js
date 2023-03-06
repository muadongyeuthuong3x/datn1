import { Button, Table, Modal, Input, Form,Select,Space } from 'antd';
import { useState, useEffect ,useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListExamBlock, searchDataApi } from "../slices/examBlock";
import {searchDataListScoreStudent} from "../slices/editScore";

const { Option } = Select;

const EditScore = ()=>{
    const dispatch = useDispatch();
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const showModalCreate = () => {
        setIsModalOpenCreate(true);
    };
 
    const { listDataExamBigClass, dataOldSearchView } = useSelector(state => state.listExamBlock);
    const { data } = useSelector(state => state.listScoreStudent)
    const [formSearch, setFormSearch] = useState({
        id_exam_where: '',
        time_year_start: '',
        time_year_end: ''
    });
    const [listScoreExam , setlistScoreExam] = useState([])
  

    useEffect(() => {
        dispatch(apiGetListExamBlock())
    }, [dispatch])

    const onChangeSearchExam = (e) => {
        setFormSearch(prev => {
            return {
                ...prev,
                "id_exam_where": e
            }
        })
    }
    const searchData = ()=>{
        dispatch(searchDataListScoreStudent(formSearch))
    }


    const listExamSelect = useMemo(() => {
        const data = [];
        // eslint-disable-next-line array-callback-return
        dataOldSearchView.map((e) => {
            const { name, id } = e.id_exam;
            const getNameSlice = data.find(e => e.name === name)
            if (!getNameSlice) {
                data.push({
                    name: name,
                    id: id,
                })
            }
        })
        return data;
    }, [dataOldSearchView])

    const onChangeSearchYear = (e) => {
        const [time_start, time_end] = e.split('-');
        setFormSearch(prev => {
            return {
                ...prev,
                "time_year_start": time_start,
                "time_year_end": time_end,
            }
        })
    }

    const listTimeSelect = useMemo(() => {
        const data = [];
        // eslint-disable-next-line array-callback-return
        dataOldSearchView.map((e) => {
            const timeConcat = e.time_year_start + "-" + e.time_year_end;
            if (!data.includes(timeConcat)) {
                data.push(timeConcat)
            }
        })
        return data;
    }, [dataOldSearchView])

    const columns = [
        {
            title: 'Index',
            dataIndex: 'index',
        },
        {
            title: 'Mã Sinh viên',
            dataIndex: 'code_student',
        },
        {
            title: 'Điểm chuyên cần',
            dataIndex: 'point_diligence',
        },
        {
            title: 'Điểm giữa kì',
            dataIndex: 'point_beetween',
        },
        {
            title: 'Điểm cuối  kì',
            dataIndex: 'point_end',
        },
        {
            title: 'Điểm thi lại',
            dataIndex: 'point_end_end',
        },
        {
            title: 'Lí do sửa điểm cuối kì',
            dataIndex: 'why_edit_point_end',
        },
        {
            title: 'Lí do sửa điểm thi lại',
            dataIndex: 'why_edit_point_end_end',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
        },
    ];

   const showModalEdit = ()=>{

   }

   const showModalDelete = ()=>{

   }

    useEffect(() => {
        if (data.length > 0) {
            let dataList = [];
            data.forEach((item, i) => {
                dataList.push({
                    key: i,
                    index: i,
                    code_student: item?.code_student,
                    point_diligence: item?.point_diligence,
                    point_beetween: item?.point_beetween,
                    point_end: item?.point_end,
                    point_end_end: item?.point_end_end,
                    why_edit_point_end: item?.why_edit_point_end,
                    why_edit_point_end_end: item?.why_edit_point_end_end,
                    edit: <Button type='primary' onClick={() => showModalEdit(item)}>Edit</Button>,
                    delete: <Button type='primary' danger onClick={() => showModalDelete(item?.id)}>Delete</Button>
                });
            })
            setlistScoreExam(dataList)
        } else {
            setlistScoreExam([])
        }
    }, [data])


    return <div>
            <div className='form_search'>
            <Button type='primary' onClick={showModalCreate}>Tạo điểm môn thi</Button>
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Chọn Môn Thi"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    onChange={onChangeSearchExam}
                >
                    {
                        listExamSelect.map((e, index) => {
                            return (
                                <Option value={e.id} label={e.name} key={index}>
                                    <Space>
                                        {e.name}
                                    </Space>
                                </Option>
                            )
                        })
                    }
                </Select>
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Năm học"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    className="select_time"
                    onChange={onChangeSearchYear}
                >
                    {
                        listTimeSelect.map((e, index) => {
                            return (
                                <Option value={e} label={e + "1"} key={index}>
                                    <Space>
                                        {e}
                                    </Space>
                                </Option>
                            )
                        })
                    }
                </Select>
                <Button type='primary' onClick={searchData}> Tìm kiếm </Button>
            </div>

            <Table columns={columns} dataSource={listScoreExam} />
    </div>
}

export default EditScore