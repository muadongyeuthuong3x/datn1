import { Button, Table, Modal, Input, Form, DatePicker, Space, Select, Image } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListDataApi, setCountExamApiTl } from '../slices/scheduleTest';
import { apiGetListExamBlock, callDataGetYear } from "../slices/examBlock";
import { setCountExamApi } from "../slices/scheduleTest";
import './styleTeacher.modules.scss'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
const { Option } = Select;
const ScheduleComponent = () => {
    const dispatch = useDispatch();


    const { rooms, examForms, teachers, countStudnetExam } = useSelector(state => state.listSchedule);
    const { dataOldSearchView, getYear } = useSelector(state => state.listExamBlock);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    // hình thức thi + môn thi + time => array name  timeExamAndFormExam
    const [onFormCreate, setOnchangeFormCreate] = useState({
        roomExam: [],
        timeExamAndFormExam: [{
            time_year_start: "",
            time_year_end: "",
            form_exam: '',
            systemForm_Exam: '',
            id_exam: '',
        }],
        exam: '',
        mode: '',
        bigBlockClassExam: '',
        roomPeopleMax: 0,
        countPeopleExam: 0,
        time_exam: 0
    });

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
        if (onFormCreate.timeExamAndFormExam[0]?.id_exam?.length < 1) {
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
                dataOld.timeExamAndFormExam[0].time_year_start = e.time_year_start;
                dataOld.timeExamAndFormExam[0].time_year_end = e.time_year_end;
                dataOld.bigBlockClassExam = getClassBigExam(e.id_big_class_exam);
                setOnchangeFormCreate(dataOld);
            }
        });
        return data;
    }, [onFormCreate, getYear])

    useEffect(() => {
        dispatch(apiGetListExamBlock());
        dispatch(apiGetListDataApi())
    }, [dispatch])




    // hande create


    const showModalCreate = () => {
        setIsModalOpenCreate(true);
    };

    const handleOkCreate = () => {
        // check room submit 

        //check tt 
        if (!onFormCreate.timeExamAndFormExam[0].id_exam) {
            return toast.error("Thiếu thông tin môn thi")
        }

        if (!onFormCreate.timeExamAndFormExam[0].form_exam) {
            return toast.error("Thiếu hình thức thi")
        }

        if (!onFormCreate.roomPeopleMax || onFormCreate.roomPeopleMax < 1) {
            return toast.error("Thiếu số lượng sinh viên tối đa của một phòng")
        }

        if (Math.ceil((onFormCreate.countPeopleExam) / (onFormCreate.roomPeopleMax)) !== onFormCreate.roomExam.length) {
            return toast.error("Tổng số phòng thi chưa đủ")
        }

        if (!onFormCreate.time_exam || onFormCreate.time_exam < 1) {
            return toast.error("Thời gian thi phải lớn hơn 0 ")
        }

        setIsModalOpenCreate(false);
    };

    const handleCancelCreate = () => {
        setIsModalOpenCreate(false);
    };

    const onChangeSearchYear = (e) => {
        console.log(e)
        const [time_start, time_end] = e.split('-');
        const dataOld = onFormCreate;
        dataOld.timeExamAndFormExam[0].time_year_start = time_start;
        dataOld.timeExamAndFormExam[0].time_year_end = time_end;
        const dataFind = getYear.find(e => (e.time_year_start === time_start && e.time_year_end === time_end))
        dataOld.bigBlockClassExam = getClassBigExam(dataFind.id_big_class_exam);
        console.log(dataOld)
        setOnchangeFormCreate(dataOld)
        if (!onFormCreate.timeExamAndFormExam[0].time_year_start ) {
            return
        }
    }
    console.log(onFormCreate)
    const onChangeExam = (e) => {
        let dataOld = onFormCreate;
        if (dataOld.timeExamAndFormExam[0].id_exam) {
            dataOld = {
                roomExam: [],
                timeExamAndFormExam: [{
                    time_year_start: "",
                    time_year_end: "",
                    form_exam: '',
                    systemForm_Exam: '',
                    id_exam: '',
                }],
                exam: '',
                mode: '',
                bigBlockClassExam: '',
                roomPeopleMax: 0,
                countPeopleExam: 0,
                time_exam: 0
            }
        }
        dataOld.timeExamAndFormExam[0].id_exam = e;
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
        let dataOld = onFormCreate;
        let id_exam_old = dataOld.timeExamAndFormExam[0].id_exam

        if (e !== dataOld.mode) {
            dataOld = {
                roomExam: [],
                timeExamAndFormExam: [{
                    time_year_start: "",
                    time_year_end: "",
                    form_exam: '',
                    systemForm_Exam: '',
                    id_exam: id_exam_old,
                }],
                exam: '',
                mode: '',
                bigBlockClassExam: '',
                roomPeopleMax: 0,
                countPeopleExam: 0,
                time_exam: 0
            }
        }
        dataOld.mode = e
        setOnchangeFormCreate(dataOld) 
        if (!onFormCreate.timeExamAndFormExam[0].time_year_start) {
            return
        }
        const formSearchCountStudent = {
            exam: onFormCreate.timeExamAndFormExam[0].id_exam,
            time_start: getYear[0].time_year_start,
        }
        if(e == 1){
            dispatch(setCountExamApi(formSearchCountStudent))
        }else if(e==2){
            dispatch(setCountExamApiTl(formSearchCountStudent))
        }
      

    }


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

        const dataArray = []
        const numberCell = Math.ceil((onFormCreate.countPeopleExam) / (valueGet));
        for (let index = 0; index < numberCell; index++) {
            const formObject = {
                time_start_exam: '',
                time_end_exam: '',
                teacher_exam: [],
                people_room: valueGet,
                room_exam: ''
            }
            dataArray.push(formObject);
        }

        dataOld.roomPeopleMax = valueGet;
        dataOld.roomExamAndTeacher = dataArray;


        setOnchangeFormCreate(dataOld);

    }

    const changeFormExam = (e) => {
        const dataOld = { ...onFormCreate };
        dataOld.timeExamAndFormExam[0].form_exam = e;
        setOnchangeFormCreate(dataOld);
    }


    const changeRoomExam = (e) => {
        setOnchangeFormCreate(prev => {
            return {
                ...prev,
                roomExam: e
            }
        })
    }

    const renderTextRoom = (data) => {
        const dataFind = rooms.find(e => e.id === data);
        return dataFind?.name + "-" + dataFind?.form_room;
    }

    const changeTimeExam = (e) => {
        const dataOld = { ...onFormCreate }
        for (let index = 0; index < dataOld.roomExamAndTeacher.length; index++) {
            dataOld.roomExamAndTeacher[index].room_exam = dataOld.roomExam[index]
        }
        dataOld.time_exam = Number(e.target.value)
        setOnchangeFormCreate(dataOld)

    }

    const changeTeacherRooms = (e, index) => {
        const dataOld = { ...onFormCreate }
        dataOld.roomExamAndTeacher[index].teacher_exam = e;
        setOnchangeFormCreate(dataOld)
    }

    const fun_disableData = (e) => {
        let check = false;
        if (onFormCreate.roomExam.length > Math.ceil((onFormCreate.countPeopleExam) / (onFormCreate.roomPeopleMax)) - 1) {
            check = true;
        }
        if (onFormCreate.roomExam.includes(e)) {
            check = false;
        }
        return check;
    }

    const onConfirm = (e, index) => {
        const dataOld = { ...onFormCreate };
        const timeExam = dataOld.time_exam;
        dataOld.roomExamAndTeacher[index].time_start_exam = dayjs(e).format('YYYY-MM-DD HH:mm');
        dataOld.roomExamAndTeacher[index].time_end_exam = dayjs(e).add(timeExam, 'minute').format('YYYY-MM-DD HH:mm');
        setOnchangeFormCreate(dataOld);
    }


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
                            value: onFormCreate.timeExamAndFormExam[0].id_exam,
                        },
                        {
                            name: ["mode"],
                            value: onFormCreate.mode,
                        },
                        {
                            name: ["year"],
                            value: onFormCreate.timeExamAndFormExam[0].time_year_start + "-" + onFormCreate.timeExamAndFormExam[0].time_year_end,
                        },
                        {
                            name: ["roomExam"],
                            value: onFormCreate.roomExam,
                        },

                        {
                            name: ["roomPeopleMax"],
                            value: onFormCreate.roomPeopleMax,
                        },
                        {
                            name: ["time_exam"],
                            value: onFormCreate.time_exam,
                        },
                    ]}

                >
                    <Form.Item
                        label="Môn thi"
                        name="id_exam"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Chọn Môn Thi"
                            value={onFormCreate.timeExamAndFormExam[0].id_exam}
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
                        label="Thi cuối kì - Thi Lại"
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
                        onFormCreate.timeExamAndFormExam[0].id_exam > 0 && <Form.Item
                            label="Năm học"
                            name="year"
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Năm học"
                                value={onFormCreate.timeExamAndFormExam[0].time_year_start + "-" + onFormCreate.timeExamAndFormExam[0].time_year_end}
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
                                            <Option value={e} label={e} key={e}>
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
                        onFormCreate.timeExamAndFormExam[0].id_exam > 0 && <Form.Item
                            label="Khóa Dự Thi"
                            name="bigBlockClass"
                        >
                            <div> {onFormCreate.bigBlockClassExam}</div>
                        </Form.Item>

                    }



                    {
                        onFormCreate.timeExamAndFormExam[0].id_exam > 0 &&
                        <div>
                            <div className='count_exam'> Có tổng cộng {onFormCreate.countPeopleExam} sinh viên đăng kí học môn</div>
                            <Form.Item
                                label="Hình thức thi"
                                name="form_exam"
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Chọn hình thức thi"
                                    value={onFormCreate.timeExamAndFormExam[0].form_exam}
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
                        </div>}



                    {
                        (onFormCreate.timeExamAndFormExam[0]?.form_exam) > 0 && <Form.Item
                            label="Số lượng sinh viên tối đa của 1 phòng"
                            name="roomPeopleMax"
                        >
                            <Input name="roomPeopleMax" value={onFormCreate.roomPeopleMax} onChange={changeMaxPeople} type="number" />

                        </Form.Item>
                    }




                    {onFormCreate.roomPeopleMax > 0 &&
                        <Form.Item
                            label={`Số phòng thi cần chọn là : ${Math.ceil((onFormCreate.countPeopleExam) / (onFormCreate.roomPeopleMax))} phòng`}
                            name="roomExam"
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                mode="multiple"
                                placeholder="Chọn phòng thi"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                value={onFormCreate.roomExam}
                                onChange={changeRoomExam}
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
                        </Form.Item>
                    }


                    {
                        (onFormCreate.timeExamAndFormExam[0]?.form_exam) > 0 && <Form.Item
                            label="Tổng thời gian thi môn (Phút)"
                            name="time_exam"
                        >
                            <Input name="time_exam" value={onFormCreate.time_exam} onChange={changeTimeExam} type="number" />

                        </Form.Item>
                    }


                    {
                        onFormCreate?.time_exam > 0 && (onFormCreate.roomExam).map((e, index) => {
                            return (
                                <div key={index}>
                                    <p className='ex_room_item'>Phòng thi : {renderTextRoom(e)} </p>
                                    <Form.Item
                                        label="Thời gian bắt đầu thi"
                                        name="time_exam_start"
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
                                    <div className="teacher_exam">Giáo Viên Coi Thi : </div>
                                    <Select
                                        showSearch
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
                            )
                        })
                    }







                    <div className='form_button_group'>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit" onClick={handleCancelCreate}>
                                Cancel
                            </Button>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={handleOkCreate} disabled={onFormCreate.countPeopleExam < 1 ? true : false}>
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

export default ScheduleComponent;