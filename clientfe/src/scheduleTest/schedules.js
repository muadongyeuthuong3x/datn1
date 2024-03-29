import { Button, Table, Modal, Input, Form, DatePicker, Space, Select, Image, Radio } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListDataApi, setCountExamApiTl, callApiGetTeacherDepartment } from '../slices/scheduleTest';
import { apiGetListExamBlock, callDataGetYear } from "../slices/examBlock";
import { apiGetListDepartment} from '../slices/department'
import { setCountExamApi } from "../slices/scheduleTest";
import './styleTeacher.modules.scss'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
const { Option } = Select;
const ScheduleSComponent = () => {
    const dispatch = useDispatch();
    const { data : listDepartment } = useSelector(state => state.listDepartment)
    const { rooms, examForms, teachers, countStudnetExam ,teacher_department } = useSelector(state => state.listSchedule);
    const { dataOldSearchView, getYear } = useSelector(state => state.listExamBlock);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    // hình thức thi + môn thi + time => array name  timeExamAndFormExam
    const [onFormCreate, setOnchangeFormCreate] = useState({
        roomExam: [],
        timeYearExamStart: "",
        timeYearExamEnd: "",
        form_exam: "",
        systemForm_Exam: "",
        id_exam: "",
        exam: '',
        mode: '',
        bigBlockClassExam: '',
        roomPeopleMax: 0,
        countPeopleExam: 0,
        time_exam: 0,
        button_submit: true,
        grading_exam: ''
    });

    const [arrayRoom , setArrayRoom] = useState([]);
    const [idDepartment  ,setidDepartment ] = useState('');
    const [arrayTeacher_mark , setarrayeacher_mark] = useState([]);

    useEffect(() => {
        setOnchangeFormCreate(prev => {
            return {
                ...prev,
                countPeopleExam: countStudnetExam,
            }
        })
    }, [countStudnetExam])

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
    }, [getYear , onFormCreate.id_exam , onFormCreate.mode])

    useEffect(() => {
        dispatch(apiGetListExamBlock());
        dispatch(apiGetListDataApi());
        dispatch(apiGetListDepartment());
    }, [dispatch])




    // hande create


    const showModalCreate = () => {
        setIsModalOpenCreate(true);
    };

    const handleOkCreate = () => {
        // check room submit 

    };

    const handleCancelCreate = () => {
        setIsModalOpenCreate(false);
    };

    const onChangeSearchYear = (e) => {
        const [time_start, time_end] = e.split('-');
         let   dataOld = {
               roomExam: [],
               timeYearExamStart: "",
               timeYearExamEnd: "",
               form_exam: "",
               systemForm_Exam: "",
               id_exam: "",
               exam: '',
               mode: '',
               bigBlockClassExam: '',
               roomPeopleMax: 0,
               countPeopleExam: 0,
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

        if(dataOld.id_exam){
             dataOld = {
                roomExam: [],
                timeYearExamStart: "",
                timeYearExamEnd: "",
                form_exam: "",
                systemForm_Exam: "",
                id_exam: "",
                exam: '',
                mode: options[0].value,
                bigBlockClassExam: '',
                roomPeopleMax: 0,
                countPeopleExam: 0,
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
           let  dataOld = {
               roomExam: [],
               timeYearExamStart: "",
               timeYearExamEnd: "",
               form_exam: "",
               systemForm_Exam: "",
               id_exam: "",
               exam: '',
               mode: '',
               bigBlockClassExam: '',
               roomPeopleMax: 0,
               countPeopleExam: 0,
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

    useEffect(()=>{
        listDepartment.length > 0 && setidDepartment(listDepartment[0]?.id)
    },[listDepartment])


    const changeFormExam = (e) => {
        const dataOld = { ...onFormCreate };
        dataOld.form_exam = e;
        setOnchangeFormCreate(dataOld);
    }

    // hander room exam 
    const changeMaxPeople = (e) => {
        const valueGet = e.target.value;
        if (valueGet < 1) {
            toast.error(` Số lượng sinh viên một lớp phải lớn hơn 0 `);
        }
        const dataOld = { ...onFormCreate };
        if (dataOld.roomExamAndTeacher) {
            delete dataOld.roomExamAndTeacher;
            dataOld.roomExam = [];
        }
        const dataArray = [];
        const dataArrayRoom = [];
        const numberCell = Math.ceil((onFormCreate.countPeopleExam) / (valueGet));
        for (let index = 0; index < numberCell; index++) {
            const formObject = {
                time_start_exam: '',
                time_end_exam: '',
                teacher_exam: [],
                teacher_score_student: '',
                room_exam: '',
            }
            dataArrayRoom.push('')
            dataArray.push(formObject);
        }
        dataOld.roomPeopleMax = valueGet;
        dataOld.roomExamAndTeacher = dataArray;
        dataOld.roomExam = dataArrayRoom;
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


    const onConfirm = (e, index) => {
        const dataOld = { ...onFormCreate };
        const timeExam = dataOld.time_exam;
        dataOld.roomExamAndTeacher[index].time_start_exam = dayjs(e).format('YYYY-MM-DD HH:mm');
        dataOld.roomExamAndTeacher[index].time_end_exam = dayjs(e).add(timeExam, 'minute').format('YYYY-MM-DD HH:mm');
        // dispatch()
        setOnchangeFormCreate(dataOld);
    }

    const changeTeacherRooms = (e, index) => {
        const dataOld = { ...onFormCreate };
        dataOld.roomExamAndTeacher[index].teacher_exam = e;
        if(dataOld.grading_exam === 2 && index == Math.ceil((dataOld.countPeopleExam) / (dataOld.roomPeopleMax)) -1){
          dataOld.button_submit = false
        }
        setOnchangeFormCreate(dataOld)
    }
    const changeTeacherRoomsScoreStudent = (e, index) => {
        const dataOld = { ...onFormCreate };
        dataOld.roomExamAndTeacher[index].teacher_score_student = e;
        if (dataOld.grading_exam === 1 && index == Math.ceil((dataOld.countPeopleExam) / (dataOld.roomPeopleMax))-1){
            dataOld.button_submit = false 
        }
        setOnchangeFormCreate(dataOld)
    }

    const fun_disableData = (e) => {
        let check = false;
        if (onFormCreate.roomExam.includes(e)) {
            check = true;
        }else {
            check = false;
        }
        return check;
    }

    const fun_disableData_Teacher = (e) => {
        let check = false;
        // if (onFormCreate.teachers_check.includes(e)) {
        //     check = true;
        // }else {
        //     check = false;
        // }
        return check;
    }

    const changeRoomExam = (e , index) => {
        const dataOld = {...onFormCreate}
        const rooms = dataOld.roomExam;
        rooms[index] = e 
        dataOld.roomExamAndTeacher[index].room_exam = e;
        setOnchangeFormCreate(prev => {
            return {
                ...prev,
                roomExam: rooms
            }
        })
    }

    useEffect(()=>{
        idDepartment && dispatch(callApiGetTeacherDepartment(idDepartment))
    },[idDepartment])
    
    const onChangeCallDepartment  = (e) =>{
        const dataOld = {...onFormCreate}
        const {roomExamAndTeacher} = dataOld;

        for(let i = 0  ; i < roomExamAndTeacher.length ; i ++){
            roomExamAndTeacher[i].teacher_score_student = '';
        }
        setidDepartment(e)
    }
    console.log(333333333, onFormCreate)

    return (
        <div>
            <div className='form_search'>
                <Button type='primary' onClick={showModalCreate}>Tạo Lịch Thi</Button>

            </div>


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
                            name: ["roomExam"],
                            value: onFormCreate.roomExam,
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
                        onFormCreate.id_exam > 0 && <div className='count_exam'> Có tổng cộng {onFormCreate.countPeopleExam} sinh viên </div>
                    }

                    {
                        onFormCreate.countPeopleExam > 0 && <div>
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
                                    label="Hình thức chấm thi"
                                    name="grading_exam"
                                >
                                    <Radio.Group onChange={changeFormGradingExam} value={onFormCreate.grading_exam}>
                                        {
                                            options_score_student.map(e => <Radio value={e.value}> {e.label}</Radio>)
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
                                        onFormCreate.grading_exam && onFormCreate.roomExamAndTeacher.length > 0 &&  idDepartment &&
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
                                                                onChange={(e)=>changeRoomExam(e,index)}
                                                            >
                                                                {
                                                                    rooms.map((e, index) => {
                                                                        return (
                                                                            <Option value={e.id} label={e.name} key={index} disabled={fun_disableData(e.id)}>
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
                                                                className="select_teacher"
                                                            >
                                                                {
                                                                    teachers.map(e => {
                                                                        return (
                                                                            <Option value={e.id} label={e.name} disabled={fun_disableData_Teacher(e.id)}>
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
                                                      onFormCreate.grading_exam === 1  && <div>
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
                        onFormCreate.countPeopleExam < 1 && onFormCreate.id_exam && <div className='error_canlender'>Hiện tại chưa có sinh viên nào để lên lịch thi</div>
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

        </div >
    );

}

export default ScheduleSComponent;