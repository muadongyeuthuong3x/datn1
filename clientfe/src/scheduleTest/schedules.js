import { Button, Table, Modal, Input, Form, DatePicker, Space, Select, Image, Radio } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import instance from '../configApi/axiosConfig'
import { apiGetListDataApi, setCountExamApiTl, callApiGetTeacherDepartment, createDataTestScheduleStudent, getAllTestScheduleStudent, deleteItemTestScheduleStudent } from '../slices/scheduleTest';
import { apiGetListExamBlock, callDataGetYear } from "../slices/examBlock";
import { apiGetListDepartment } from '../slices/department'
import { setCountExamApi } from "../slices/scheduleTest";
import './styleTeacher.modules.scss'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
const { Option } = Select;
const columns = [
    {
        title: 'Index',
        dataIndex: 'index',
    },
    {
        title: 'Tên môn thi',
        dataIndex: 'name',
    },
    {
        title: 'Hình thức thi',
        dataIndex: 'form_exam',
    },
    {
        title: 'Thi cuối kì / Thi lại',
        dataIndex: 'mode',
    },
    {
        title: 'Khóa dự thi',
        dataIndex: 'bigBlockClass',
    },
    {
        title: 'Năm học',
        dataIndex: 'yearExam',
    },
    {
        title: 'Thời gian thi (Phút)',
        dataIndex: 'time_exam',
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
    },
    {
        title: 'Delete',
        dataIndex: 'delete',
    },
    {
        title: 'Xuất File PDF',
        dataIndex: 'export',
    },
];
const ScheduleSComponent = () => {
    const dispatch = useDispatch();
    const { data: listDepartment } = useSelector(state => state.listDepartment)
    const { rooms, examForms, teachers, countStudnetExam, teacher_department, teachersFind } = useSelector(state => state.listSchedule);
    const { dataOldSearchView, getYear } = useSelector(state => state.listExamBlock);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    // hình thức thi + môn thi + time => array name  timeExamAndFormExam
    const [onFormCreate, setOnchangeFormCreate] = useState({
        timeYearExamStart: "",
        timeYearExamEnd: "",
        form_exam: "",
        systemForm_Exam: "",
        id_exam: "",
        exam: '',
        mode: '',
        bigBlockClassExam: '',
        roomPeopleMax: 0,
        time_exam: 0,
        button_submit: true,
        grading_exam: ''
    });

    const [listDataTestSchedule ,setlistDataTestSchedule] = useState([])

    const [callApiReset, setCallApiReset] = useState(false);
    const [isModalOpenPDF, setIsModalOpenPDF] = useState(false);
    const [arrayRoom, setArrayRoom] = useState([]);
    const [idDepartment, setidDepartment] = useState('');
    const [arrayTeacher_mark, setarrayeacher_mark] = useState([]);

    const options = [
        {
            value: 1,
            label: "Thi cuối kì",
        },
        {
            value: 2,
            label: "Thi lại cuối kì",
        },
    ]

    const options_score_student = [
        { label: 'Giáo viên chấm thi', value: 1 },
        { label: 'Máy chấm', value: 2 },
    ];


    const getClassBigExam = (data) => {
        let listBigClassExam = '';
        // eslint-disable-next-line array-callback-return
        data.length > 0 && data.map((e, index) => {
            let data = e.id_big_class_exam.bigBlockClass;
            listBigClassExam += (index === 0 ? "" : " - ") + data
        });
        return listBigClassExam;
    }


    const listTimeSelect = useMemo(() => {
        if (onFormCreate.id_exam?.length < 1) {
            return [];
        }
        const data = [];
        // eslint-disable-next-line array-callback-return
        getYear.length > 0 && getYear.map((e, index) => {
            const timeConcat = e.time_year_start + "-" + e.time_year_end;
            if (!data.includes(timeConcat)) {
                data.push(timeConcat)
            }
            if (index === 0) {
                const dataOld = onFormCreate;
                dataOld.timeYearExamStart = e.time_year_start;
                dataOld.timeYearExamEnd = e.time_year_end;
                dataOld.bigBlockClassExam = getClassBigExam(e.id_big_class_exam);
                setOnchangeFormCreate(dataOld);
            }
        });
        return data;
    }, [getYear, onFormCreate.id_exam, onFormCreate.mode])

    useEffect( () => {
        async function getData(){
            try {
                const dataRes = await instance.get(`/test-schedule-student`);
                // dispatch(setGetAllTestStudent(dataRes.data.message))
                setlistDataTestSchedule(dataRes.data.message)
            } catch (error) {
     
                toast.error(error.response.data.message)
         }
          
        }
        getData();
    }, [dispatch, callApiReset])

    useEffect(() => {
        dispatch(apiGetListExamBlock());
        dispatch(apiGetListDataApi());
        dispatch(apiGetListDepartment());
    }, [dispatch])




    // hande create


    const showModalCreate = () => {
        setIsModalOpenCreate(true);
    };

    const handleOkCreate = async() => {
     //   dispatch(createDataTestScheduleStudent(onFormCreate))
     try {
        const dataRes = await instance.post(`/test-schedule-student`, onFormCreate);
        if(dataRes){
         toast.success("Tạo dữ liệu thành công");
         setIsModalOpenCreate(false);
         setCallApiReset(!callApiReset)
        }
     } catch (error) {
     
            toast.error(error.response.data.message)
     }
   
      
        // check room submit 
    };

    const handleCancelCreate = () => {
        setIsModalOpenCreate(false);
    };

    const onChangeSearchYear = (e) => {
        const [time_start, time_end] = e.split('-');
        let dataOld = {
            timeYearExamStart: "",
            timeYearExamEnd: "",
            form_exam: "",
            systemForm_Exam: "",
            id_exam: "",
            exam: '',
            mode: '',
            bigBlockClassExam: '',
            roomPeopleMax: 0,
            time_exam: 0,
            button_submit: true,
            grading_exam: ''
        }
        dataOld.id_exam = onFormCreate.id_exam;
        dataOld.mode = onFormCreate.mode
        const dataFind = getYear.find(e => (e.time_year_start === time_start && e.time_year_end === time_end))
        dataOld.bigBlockClassExam = getClassBigExam(dataFind.id_big_class_exam);
        dataOld.timeYearExamEnd = time_end;
        dataOld.timeYearExamStart = time_start;
        setOnchangeFormCreate(dataOld)
    }
    const onChangeExam = (e) => {
        let dataOld = { ...onFormCreate };
        if (dataOld.mode?.length < 1) {
            dataOld.mode = options[0].value
        }

        if (dataOld.id_exam) {
            dataOld = {
                timeYearExamStart: "",
                timeYearExamEnd: "",
                form_exam: "",
                systemForm_Exam: "",
                id_exam: "",
                exam: '',
                mode: options[0].value,
                bigBlockClassExam: '',
                roomPeopleMax: 0,
                time_exam: 0,
                button_submit: true,
                grading_exam: ''
            }

        }
        dataOld.id_exam = e
        setOnchangeFormCreate(dataOld);
        dispatch(callDataGetYear(e));
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


    const handleChangeMode = (e) => {
        let dataOld = {
            timeYearExamStart: "",
            timeYearExamEnd: "",
            form_exam: "",
            systemForm_Exam: "",
            id_exam: "",
            exam: '',
            mode: '',
            bigBlockClassExam: '',
            roomPeopleMax: 0,
            time_exam: 0,
            button_submit: true,
            grading_exam: ''
        }
        dataOld.mode = e
        dataOld.id_exam = onFormCreate.id_exam
        setOnchangeFormCreate(dataOld)
    }
    useEffect(() => {
        if (!onFormCreate.timeYearExamStart || !onFormCreate.mode || !onFormCreate.timeYearExamEnd) {
            return
        }

        const formSearchCountStudent = {
            exam: onFormCreate.id_exam,
            time_start: onFormCreate.timeYearExamStart,
        }
        if (onFormCreate.mode === 1) {
            dispatch(setCountExamApi(formSearchCountStudent))
        } else {
            dispatch(setCountExamApiTl(formSearchCountStudent))
        }

    }, [onFormCreate.mode, onFormCreate.id_exam, onFormCreate.timeYearExamStart])

    useEffect(() => {
        listDepartment.length > 0 && setidDepartment(listDepartment[0]?.id)
    }, [listDepartment])


    const changeFormExam = (e) => {
        const dataOld = { ...onFormCreate };
        const form_exam_old = dataOld.form_exam;

        dataOld.form_exam = e;
        setOnchangeFormCreate(dataOld);
    }

    const showDelelte = (id, i) => {
        const teacherDelete = teachers.find(e => e.id == id);
        const dataOld = { ...onFormCreate };
        const dataTeacher = dataOld.roomExamAndTeacher;
        const time_start = dataOld.roomExamAndTeacher[i].time_start_exam;
        const time_end = dataOld.roomExamAndTeacher[i].time_end_exam;
        if (dataTeacher.length > 1) {
            for (let index = 0; index < dataTeacher.length; index++) {
                if (index === i) {
                    continue;
                } else {
                    const { time_end_exam, time_start_exam } = dataTeacher[index]
                    if ((Date.parse(time_start) >= Date.parse(time_start_exam) && Date.parse(time_start) <= Date.parse(time_end_exam)) || (Date.parse(time_end) >= Date.parse(time_start_exam) && Date.parse(time_end) <= Date.parse(time_end_exam))) {
                        let dataTeacherOld = dataOld.roomExamAndTeacher[index].teachers
                        dataTeacherOld.push(teacherDelete);
                        dataOld.roomExamAndTeacher[index].teachers = dataTeacherOld;
                    }
                }
            }
        }
        setOnchangeFormCreate(dataOld);
    }

    const onSelectItem = (id, i) => {
        const dataOld = { ...onFormCreate };
        const dataTeacher = dataOld.roomExamAndTeacher;
        const time_start = dataOld.roomExamAndTeacher[i].time_start_exam;
        const time_end = dataOld.roomExamAndTeacher[i].time_end_exam;
        if (dataTeacher.length > 1) {
            for (let index = 0; index < dataTeacher.length; index++) {
                if (index === i) {
                    continue;
                } else {
                    const { time_end_exam, time_start_exam } = dataTeacher[index]
                    if ((Date.parse(time_start) >= Date.parse(time_start_exam) && Date.parse(time_start) <= Date.parse(time_end_exam)) || (Date.parse(time_end) >= Date.parse(time_start_exam) && Date.parse(time_end) <= Date.parse(time_end_exam))) {
                        let dataTeacherOld = dataOld.roomExamAndTeacher[index].teachers;
                        let dataTeacherNew = dataTeacherOld.filter(e=>e.id !== id);
                        dataOld.roomExamAndTeacher[index].teachers = dataTeacherNew;
                    }
                }
            }
        }
        setOnchangeFormCreate(dataOld);
    }

   
// hander room exam 
const changeMaxPeople = (e) => {
    const valueGet = e.target.value;
    console.log(valueGet);
    if (valueGet < 1) {
      return   toast.error(` Số lượng sinh viên một lớp phải lớn hơn 0 `);
    }
    const dataOld = { ...onFormCreate };
    if (dataOld.roomExamAndTeacher) {
        delete dataOld.roomExamAndTeacher;
    }
    const dataArray = [];
    const numberCell = Math.ceil((countStudnetExam) / (valueGet));
    for (let index = 0; index < numberCell; index++) {
        const formObject = {
            time_start_exam: '',
            time_end_exam: '',
            teacher_exam: [],
            teacher_score_student: '',
            room_exam: '',
            teachers: [],
            rooms : []
        }
        dataArray.push(formObject); 
    }
    dataOld.roomPeopleMax = valueGet;
    dataOld.roomExamAndTeacher = dataArray;
    setOnchangeFormCreate(dataOld);
}

//time exam
const changeTimeExam = (e) => {
    const dataOld = { ...onFormCreate };
    dataOld.time_exam = Number(e.target.value)
    setOnchangeFormCreate(dataOld)

}
// gradingExam

const changeFormGradingExam = (e) => {
    const dataOld = { ...onFormCreate };
    dataOld.grading_exam = e.target.value;
    const dataRoomExamAndTeacherOld = dataOld.roomExamAndTeacher;
    for (let i = 0; i < dataRoomExamAndTeacherOld.length; i++) {
        if (e.target.value == 1) {
            dataRoomExamAndTeacherOld[i].grading_exam_room = ''
        } else {
            delete dataRoomExamAndTeacherOld[i]?.grading_exam_room
        }
    }
    dataOld.roomExamAndTeacher = dataRoomExamAndTeacherOld;
    setOnchangeFormCreate(dataOld)
}

// confime select 


const onConfirm = async (e, index) => {

    if(Date.parse(new Date()) > Date.parse(e) ) {
        return toast.error("Thời gian bạn chọn phải lớn hơn thời gian hiện tại");
    }
    const dataOld = { ...onFormCreate };
    const timeExam = dataOld.time_exam;
    dataOld.roomExamAndTeacher[index].time_start_exam = dayjs(e).format('YYYY-MM-DD HH:mm');
    dataOld.roomExamAndTeacher[index].time_end_exam = dayjs(e).add(timeExam, 'minute').format('YYYY-MM-DD HH:mm');
    const idUnLess = getTeacherSelects(dayjs(e).format('YYYY-MM-DD HH:mm'), dayjs(e).add(timeExam, 'minute').format('YYYY-MM-DD HH:mm'), index);
    const idUnLessRoom = getRoomsSelects(dayjs(e).format('YYYY-MM-DD HH:mm'), dayjs(e).add(timeExam, 'minute').format('YYYY-MM-DD HH:mm'), index);
    const dataRes = await instance.post(`/test-schedule-student/${dataOld.roomExamAndTeacher[index].time_start_exam}/${dataOld.roomExamAndTeacher[index].time_end_exam}`, idUnLess);
    const dataRes1 = await instance.post(`/test-schedule-student/rooms/${dataOld.roomExamAndTeacher[index].time_start_exam}/${dataOld.roomExamAndTeacher[index].time_end_exam}`, idUnLessRoom);
    dataOld.roomExamAndTeacher[index].teachers = dataRes.data
    dataOld.roomExamAndTeacher[index].rooms = dataRes1.data
    setOnchangeFormCreate(dataOld);
}

const changeTeacherRooms = (e, index) => {
    const dataOld = { ...onFormCreate };
    dataOld.roomExamAndTeacher[index].teacher_exam = e;
    if (dataOld.grading_exam === 2 && index == Math.ceil((countStudnetExam) / (dataOld.roomPeopleMax)) - 1) {
        dataOld.button_submit = false
    }
    setOnchangeFormCreate(dataOld)
}
const changeTeacherRoomsScoreStudent = (e, index) => {
    const dataOld = { ...onFormCreate };
    dataOld.roomExamAndTeacher[index].teacher_score_student = e;
    if (dataOld.grading_exam === 1 && index == Math.ceil((countStudnetExam) / (dataOld.roomPeopleMax)) - 1) {
        dataOld.button_submit = false
    }
    setOnchangeFormCreate(dataOld)
}


const onSelectItemRooms = (idd , i) =>{
    // const dataOld = { ...onFormCreate }
    // const dataTeacher = dataOld.roomExamAndTeacher;
    // const time_start = dataOld.roomExamAndTeacher[i].time_start_exam;
    // const time_end = dataOld.roomExamAndTeacher[i].time_end_exam;
    // const  idRoomsSelectOld = dataOld.roomExamAndTeacher[i].room_exam;
    // const itemRoomsSelectOld = rooms.find(e => e.id == idRoomsSelectOld );
    // dataOld.roomExamAndTeacher[i].room_exam = idd; 
    // if (dataTeacher.length > 1) {
    //     for (let index = 0; index < dataTeacher.length; index++) {
    //         if (index === i) {
    //            continue;
    //         } else {
    //             const { time_end_exam, time_start_exam } = dataTeacher[index]
    //             if ((Date.parse(time_start) >= Date.parse(time_start_exam) && Date.parse(time_start) <= Date.parse(time_end_exam)) || (Date.parse(time_end) >= Date.parse(time_start_exam) && Date.parse(time_end) <= Date.parse(time_end_exam))) {
    //                 const dataRoomOld = dataOld.roomExamAndTeacher[i].rooms;
    //                 const dataNew =   dataRoomOld.filter(e=>e.id != idd);
    //                 let dataNew1 = dataNew;
    //                 if(itemRoomsSelectOld ){
    //                     dataNew1 = dataNew.concat(itemRoomsSelectOld);
    //                 }
    //                 dataOld.roomExamAndTeacher[index].rooms = dataNew1;
    //             }
    //         }
    //     }
    // }
}



const changeRoomExam = (idd, i) => {
    const dataOld = { ...onFormCreate }
    const dataTeacher = dataOld.roomExamAndTeacher;
    const time_start = dataOld.roomExamAndTeacher[i].time_start_exam;
    const time_end = dataOld.roomExamAndTeacher[i].time_end_exam;
    const  idRoomsSelectOld = dataOld.roomExamAndTeacher[i].room_exam;
    let  itemRoomsSelectOld = "";
    if(dataTeacher.length > 1) { 
     itemRoomsSelectOld = rooms.find(e => e.id == idRoomsSelectOld ); }
    dataOld.roomExamAndTeacher[i].room_exam = idd; 
    if (dataTeacher.length > 1) {
        for (let index = 0; index < dataTeacher.length; index++) {
            if (index === i) {
               continue;
            } else {
                const { time_end_exam, time_start_exam } = dataTeacher[index]
                if ((Date.parse(time_start) >= Date.parse(time_start_exam) && Date.parse(time_start) <= Date.parse(time_end_exam)) || (Date.parse(time_end) >= Date.parse(time_start_exam) && Date.parse(time_end) <= Date.parse(time_end_exam))) {
                    const dataRoomOld = dataOld.roomExamAndTeacher[index].rooms;
                    const dataNew =   dataRoomOld.filter(e=>e.id != idd);
                    let dataNew1 = dataNew;
                    if(itemRoomsSelectOld ){
                        dataNew1 = dataNew.concat(itemRoomsSelectOld);
                    }
                    dataOld.roomExamAndTeacher[index].rooms = dataNew1;
                }
            }
        }
    }
    setOnchangeFormCreate(dataOld)
}

useEffect(() => {
    idDepartment && dispatch(callApiGetTeacherDepartment(idDepartment))
}, [idDepartment])

const onChangeCallDepartment = (e) => {
    const dataOld = { ...onFormCreate }
    const { roomExamAndTeacher } = dataOld;

    for (let i = 0; i < roomExamAndTeacher.length; i++) {
        roomExamAndTeacher[i].teacher_score_student = '';
    }
    setidDepartment(e)
}



const [listScheduleExamStudent, setlistScheduleExamStudent] = useState([]);
const [dataEdit, setDataEdit] = useState();
const [isOpenEditModal, setisOpenEditModal] = useState(false);
const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
const [idDeleteScheduleExam, setidDeleteScheduleExam] = useState(false);
const showModalEdit = (item) => {
    setisOpenEditModal(true)
    setDataEdit(item)
}

const showModalDelete = (id) => {
    setisOpenDeleteModal(true)
    setidDeleteScheduleExam(id)
}

const handleOkDelete = async() => {
    try {
        const response =await instance.delete(`/test-schedule-student/${idDeleteScheduleExam}`); 
        if (response) {
            toast.success("Xóa dữ liệu thành công");
            setisOpenDeleteModal(false)
            setCallApiReset(!callApiReset)
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
   
    // dispatch(deleteItemTestScheduleStudent(idDeleteScheduleExam))

}

const handleCancelDelete = () => {
    setisOpenDeleteModal(false)
}

const resultMode = (mode) => {
    let result = ''
    options.forEach(item => {
        if (item.value == mode) {
            result = item.label
        }
    })
    return result;
}

const resultFormExam = (mode) => {
    let result = ''
    examForms.forEach(item => {
        if (item.value == mode) {
            result = item.name
        }
    })
    return result;
}


const [idPDF, setidPDF] = useState();
const handleOkPDF = async() => {
    setIsModalOpenPDF(false)
    const response = await instance.get(`/test-schedule-student/schedule_pdf/${idPDF}`);
}

const handleCancelPDF = () => {
    setIsModalOpenPDF(false)
}

const showModalPDF = (id) => {
    setIsModalOpenPDF(true);
    setidPDF(id)

}

useEffect(() => {
    // if (listDataTestSchedule.length > 0) {
    let dataList = [];
    listDataTestSchedule.forEach((item, i) => {
        dataList.push({
            key: i,
            index: i,
            name: item?.id_exam?.name,
            form_exam: resultFormExam(item?.form_exam),
            mode: resultMode(item?.id_testScheduleStudent[0].mode),
            bigBlockClass: getClassBigExam(item?.id_big_class_exam),
            yearExam: item?.time_year_start + "-" + item?.time_year_end,
            time_exam: item?.id_testScheduleStudent[0].time_exam,
            edit: <Button type='primary' onClick={() => showModalEdit(item)}>Edit</Button>,
            delete: <Button type='primary' danger onClick={() => showModalDelete(item?.id_testScheduleStudent[0].id)}>Delete</Button>,
            // export: <Button type='primary' onClick={() => showModalPDF({ id: item?.id_testScheduleStudent[0].id, subject: item?.id_exam?.name, mode: resultMode(item?.id_testScheduleStudent[0].mode), form_exam: resultFormExam(item?.form_exam), blokcclass: getClassBigExam(item?.id_big_class_exam) })}>Lấy danh sách thi</Button>
          export: <Button type='primary' onClick={() => showModalPDF(item?.id_testScheduleStudent[0].id, )}>Lấy danh sách thi</Button>
        });
    })
    setlistScheduleExamStudent(dataList)
    // }
}, [listDataTestSchedule, examForms, callApiReset])


const getTeacherSelects = (time_start, time_end, i) => {
    const dataTeacher = onFormCreate.roomExamAndTeacher;
    let idTeachersUnless = [];
    if (dataTeacher[0].teacher_exam.length == 0) {
        idTeachersUnless = [];
    } else {
        for (let index = 0; index < dataTeacher.length; index++) {
            if (index === i) {
                continue;
            } else {
                const { time_end_exam, time_start_exam } = dataTeacher[index]
                if ((Date.parse(time_start) >= Date.parse(time_start_exam) && Date.parse(time_start) <= Date.parse(time_end_exam)) || (Date.parse(time_end) >= Date.parse(time_start_exam) && Date.parse(time_end) <= Date.parse(time_end_exam))) {
                    for (let j = 0; j < dataTeacher[index].teacher_exam.length; j++) {
                        idTeachersUnless.push(dataTeacher[index].teacher_exam[j])
                    }
                    idTeachersUnless.concat(dataTeacher[index].teacher_exam)
                }
            }
        }
    }
    return idTeachersUnless;
}



const getRoomsSelects = (time_start, time_end, i) => {
    const dataTeacher = onFormCreate.roomExamAndTeacher;
    let idRoomsUnless = [];
    if (dataTeacher[0].room_exam.length == 0) {
        idRoomsUnless = [];
    } else {
        for (let index = 0; index < dataTeacher.length; index++) {
            if (index === i) {
                continue;
            } else {
                const { time_end_exam, time_start_exam } = dataTeacher[index]
                if ((Date.parse(time_start) >= Date.parse(time_start_exam) && Date.parse(time_start) <= Date.parse(time_end_exam)) || (Date.parse(time_end) >= Date.parse(time_start_exam) && Date.parse(time_end) <= Date.parse(time_end_exam))) {
                    idRoomsUnless.push( Number(dataTeacher[index].room_exam))
                }
            }
        }
    }
    return idRoomsUnless;
}

return (
    <div>
        <div className='form_search'>
            <Button type='primary' onClick={showModalCreate}>Tạo Lịch Thi</Button>

        </div>

        <Table columns={columns} dataSource={listScheduleExamStudent} />

        {/* Modal Create */}
        <Modal title="Tạo Lịch Thi" open={isModalOpenCreate} footer={null}>

            <Form
                name="basic"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: '500' }}
                layout="vertical"
                autoComplete="off"
                fields={[
                    {
                        name: ["id_exam"],
                        value: onFormCreate.id_exam,
                    },
                    {
                        name: ["mode"],
                        value: onFormCreate.mode,
                    },
                    {
                        name: ["year"],
                        value: onFormCreate.timeYearExamStart + "-" + onFormCreate.timeYearExamEnd,
                    },
                    {
                        name: ["form_exam"],
                        value: onFormCreate.form_exam,
                    },

                    {
                        name: ["roomPeopleMax"],
                        value: onFormCreate.roomPeopleMax,
                    },
                    {
                        name: ["time_exam"],
                        value: onFormCreate.time_exam,
                    },
                    {
                        name: ["grading_exam"],
                        value: onFormCreate.grading_exam
                    },
                    {
                        name: ["idDepartment"],
                        value: idDepartment
                    }
                ]}

            >
                <Form.Item
                    label="Môn thi : "
                    name="id_exam"
                >
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Chọn Môn Thi"
                        value={onFormCreate.id_exam}
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={onChangeExam}

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
                </Form.Item>

                <Form.Item
                    label="Thi cuối kì - Thi lại : "
                    name="mode"
                >  <Select
                        name="mode"
                        value={onFormCreate.mode}
                        onChange={handleChangeMode}
                        style={{ width: '100%' }}
                        options={options}
                    />
                </Form.Item>

                {
                    onFormCreate.id_exam > 0 && <Form.Item
                        label="Năm học : "
                        name="year"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Năm học"
                            value={onFormCreate.timeYearExamStart + "-" + onFormCreate.timeYearExamEnd}
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            onChange={onChangeSearchYear}
                        >
                            {
                                listTimeSelect.map((e, index) => {
                                    return (
                                        <Option value={e} label={e} key={index}>
                                            <Space>
                                                {e}
                                            </Space>
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                }



                {
                    onFormCreate.id_exam > 0 && <Form.Item
                        label="Khóa Dự Thi"
                        name="bigBlockClass"
                    >
                        <div> {onFormCreate.bigBlockClassExam}</div>
                    </Form.Item>

                }

                {
                    onFormCreate.id_exam > 0 && <div className='count_exam'> Có tổng cộng {countStudnetExam} sinh viên </div>
                }

                {
                    countStudnetExam > 0 && <div>
                        {
                            onFormCreate.id_exam > 0 &&
                            <div>

                                <Form.Item
                                    label="Hình thức thi : "
                                    name="form_exam"
                                >
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Chọn hình thức thi"
                                        value={onFormCreate.form_exam}
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        onChange={changeFormExam}

                                    >
                                        {
                                            examForms.map((e, index) => {
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
                                </Form.Item>
                            </div>
                        }


                        {
                            (onFormCreate.form_exam) > 0 && <Form.Item
                                label="Số lượng sinh viên tối đa của 1 phòng"
                                name="roomPeopleMax"
                            >
                                <Input name="roomPeopleMax" value={onFormCreate.roomPeopleMax} onChange={changeMaxPeople} type="number" />

                            </Form.Item>
                        }

                        {
                            (onFormCreate.roomPeopleMax) > 0 && <Form.Item
                                label="Tổng thời gian thi môn (Phút) : "
                                name="time_exam"
                            >
                                <Input name="time_exam" value={onFormCreate.time_exam} onChange={changeTimeExam} type="number" />

                            </Form.Item>
                        }

                        {
                            (onFormCreate.time_exam) > 0 && <Form.Item
                                label="Hình thức chấm thi : "
                                name="grading_exam"
                            >
                                <Radio.Group onChange={changeFormGradingExam} value={onFormCreate.grading_exam}>
                                    {
                                        options_score_student.map(e => <Radio value={e.value} key={e.value}> {e.label}</Radio>)
                                    }
                                </Radio.Group>
                            </Form.Item>
                        }

                        {

                            onFormCreate.grading_exam === 1 && onFormCreate.roomExamAndTeacher.length > 0 &&
                            <div>

                                <Form.Item
                                    label=" Khoa chấm thi :"
                                    name="idDepartment"
                                >
                                    <Select
                                        showSearch
                                        labelCol={{ span: 0 }}
                                        wrapperCol={{ span: 20 }}
                                        style={{ width: '100%', marginBottom: "10px" }}
                                        placeholder="Chọn khoa"
                                        optionFilterProp="children"
                                        optionLabelProp="label"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        value={idDepartment}
                                        onChange={(e) => onChangeCallDepartment(e)}
                                        className="select_teacher"
                                    >
                                        {
                                            listDepartment.map(e => {
                                                return (
                                                    <Option value={e.id} label={e.department}>
                                                        <div className='option_teacher'>
                                                            <Space>
                                                                {e.department}
                                                            </Space>
                                                        </div>
                                                    </Option>
                                                )
                                            })
                                        }

                                    </Select>
                                </Form.Item>
                            </div>
                        }


                        {
                            <div>
                                {
                                    onFormCreate.grading_exam && onFormCreate.roomExamAndTeacher.length > 0 && idDepartment &&
                                    <div>
                                        <p className='room_noti'>Vui lòng chọn theo thứ tự  ( thời gian thi - phòng thi - giáo viên coi {onFormCreate.grading_exam == 1 ? "-giáo viên chấm thi" : ""})</p>
                                        {onFormCreate.roomExamAndTeacher.map((item, index) => {
                                            return <div>
                                                <p className='room_noti'> Phòng thi thứ  {index + 1}:</p>
                                                <Form.Item
                                                    label="Thời gian bắt đầu thi :"
                                                    name="time_start_exam"
                                                >
                                                    <DatePicker
                                                        showTime
                                                        format="YYYY/MM/DD HH:mm"
                                                        className="time_start_begin"
                                                       // value ={onFormCreate.roomExamAndTeacher[index]?.time_start_exam}
                                                        value={   onFormCreate.roomExamAndTeacher[index].time_start_exam && dayjs(onFormCreate.roomExamAndTeacher[index].time_start_exam)}
                                                        onOk={(e) => onConfirm(e, index)}
                                                        allowClear={false}
                                                    />
                                                    <div className="time_start_end">Thời gian kết thúc thi :  {onFormCreate.roomExamAndTeacher[index].time_end_exam}</div>
                                                </Form.Item>


                                                {/* phòng thi */}

                                                {
                                                    <div>
                                                        <div className="teacher_exam">Phòng thi : </div>
                                                        <Select
                                                            showSearch
                                                            style={{ width: '100%' }}
                                                            disabled={onFormCreate.roomExamAndTeacher[index].time_start_exam ? false : true}
                                                            placeholder="Chọn phòng thi"
                                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                            filterSort={(optionA, optionB) =>
                                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                            }
                                                            value={onFormCreate.roomExamAndTeacher[index].room_exam}
                                                            onChange={(e) => changeRoomExam(e, index)}
                                                            onSelect={(e) => onSelectItemRooms(e, index)}
                                                        >
                                                            {
                                                                onFormCreate?.roomExamAndTeacher[index]?.rooms.map((e, index) => {
                                                                    return (
                                                                        <Option value={e.id} label={e.name} key={index}>
                                                                            <Space>
                                                                                {e.name}-{e.form_room}
                                                                            </Space>
                                                                        </Option>
                                                                    )
                                                                })
                                                            }

                                                        </Select>
                                                    </div>

                                                }

                                                {
                                                    <div>
                                                        <div className="teacher_exam">Giáo Viên Coi Thi : </div>
                                                        <Select
                                                            showSearch
                                                            disabled={onFormCreate.roomExamAndTeacher[index].time_start_exam ? false : true}
                                                            labelCol={{ span: 0 }}
                                                            wrapperCol={{ span: 20 }}
                                                            style={{ width: '100%', marginBottom: "10px" }}
                                                            placeholder="Chọn giáo viên coi thi"
                                                            mode="multiple"
                                                            optionFilterProp="children"
                                                            optionLabelProp="label"
                                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                            filterSort={(optionA, optionB) =>
                                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                            }
                                                            value={onFormCreate?.roomExamAndTeacher[index]?.teacher_exam}
                                                            onChange={(e) => changeTeacherRooms(e, index)}
                                                            onDeselect={(e) => showDelelte(e, index)}
                                                            onSelect={(e) => onSelectItem(e, index)}
                                                            className="select_teacher"
                                                        >
                                                            {
                                                                onFormCreate.roomExamAndTeacher[index].teachers.map(e => {
                                                                    return (
                                                                        <Option value={e.id} label={e.name}>
                                                                            <div className='option_teacher'>
                                                                                <Space>
                                                                                    {e.name}
                                                                                </Space>
                                                                                <Image
                                                                                    width={50}
                                                                                    height={50}
                                                                                    src={e.avatar}
                                                                                    aria-label={e.name}
                                                                                />
                                                                            </div>
                                                                        </Option>
                                                                    )
                                                                })
                                                            }

                                                        </Select>
                                                    </div>

                                                }



                                                {/* giao vien chấm thi */}
                                                {
                                                    onFormCreate.grading_exam === 1 && <div>
                                                        <div className="teacher_exam">Giáo Viên Chấm  Thi : </div>
                                                        <Select
                                                            showSearch
                                                            disabled={onFormCreate?.roomExamAndTeacher[index]?.teacher_exam.length > 0 ? false : true}
                                                            labelCol={{ span: 0 }}
                                                            wrapperCol={{ span: 20 }}
                                                            style={{ width: '100%', marginBottom: "10px" }}
                                                            placeholder="Chọn giáo viên chấm thi"
                                                            optionFilterProp="children"
                                                            optionLabelProp="label"
                                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                            filterSort={(optionA, optionB) =>
                                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                            }
                                                            value={onFormCreate?.roomExamAndTeacher[index]?.teacher_score_student}
                                                            onChange={(e) => changeTeacherRoomsScoreStudent(e, index)}
                                                            className="select_teacher"
                                                        >
                                                            {
                                                                teacher_department.map(e => {
                                                                    return (
                                                                        <Option value={e.id} label={e.name}>
                                                                            <div className='option_teacher'>
                                                                                <Space>
                                                                                    {e.name}
                                                                                </Space>
                                                                                <Image
                                                                                    width={50}
                                                                                    height={50}
                                                                                    src={e.avatar}
                                                                                    aria-label={e.name}
                                                                                />
                                                                            </div>
                                                                        </Option>
                                                                    )
                                                                })
                                                            }

                                                        </Select>
                                                    </div>

                                                }

                                            </div>
                                        })}
                                    </div>
                                }

                            </div>
                        }

                    </div>}
                {
                    countStudnetExam < 1 && onFormCreate.id_exam && <div className='error_canlender'>Hiện tại chưa có sinh viên nào để lên lịch thi</div>
                }


                <div className='form_button_group'>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit" onClick={handleCancelCreate}>
                            Cancel
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={handleOkCreate} disabled={onFormCreate.button_submit ? true : false}>
                            Submit
                        </Button>
                    </Form.Item>
                    <div />
                </div>
            </Form>
        </Modal>
        {/* End Modal Create */}

        {/* Modal delete */}
        <Modal title="Xóa Lịch Thi" open={isOpenDeleteModal} onOk={handleOkDelete} onCancel={handleCancelDelete}>
            <p> Bạn chắc chắn xóa dữ liệu này chứ </p>
        </Modal>
        {/* End Modal delete */}


        {/* Modal PDF */}
        <Modal title="Lấy danh sách thi" open={isModalOpenPDF} onOk={handleOkPDF} onCancel={handleCancelPDF}>
            <p> Bạn chắc chắn muốn lấy danh sách thi cho môn này chứ </p>
        </Modal>
        {/* End Modal PDF */}

    </div >
);

}

export default ScheduleSComponent;