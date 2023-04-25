import { Button, Table, Modal, Input, Form, DatePicker, Select, Image, Radio, Drawer, Space } from 'antd';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import instance from '../configApi/axiosConfig'
import { apiGetListDataApi, setCountExamApiTl, callApiGetTeacherDepartment, createDataTestScheduleStudent, getAllTestScheduleStudent, deleteItemTestScheduleStudent,editDataSchedule } from '../slices/scheduleTest';

import { apiGetListExamBlock, callDataGetYear } from "../slices/examBlock";
import { apiGetListDepartment } from '../slices/department'
import { setCountExamApi } from "../slices/scheduleTest";
import './styleTeacher.modules.scss'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
const { Option } = Select;
const columns1 = [
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
    const { rooms, examForms, teachers, countStudnetExam, teacher_department, teacher_department_edit } = useSelector(state => state.listSchedule);
    const { dataOldSearchView, getYear } = useSelector(state => state.listExamBlock);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [listTeachers, setListTeachers] = useState([])


    const [databaseRoomsInDb, setLoadDb] = useState([]);
    console.log("databaseRoomsInDb" , databaseRoomsInDb)
    const [dataSelectRoomInNow, setDataNow] = useState([])
    const callListTeacher = async () => {
        const res = await instance.get('/teacher')
        setListTeachers(res.data);
    }
    useEffect(() => {
        callListTeacher()
    }, [])
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
        grading_exam: 1
    });

    const [dataFormEdit, setDataFormEdit] = useState({
        id_exam: "",
        id_edit : "",
        mode: '',
        bigBlockClassExam: '',
        roomPeopleMax: 0,
        time_exam: 0,
        timeYearExamStart: "",
        timeYearExamEnd: "",
        form_exam: "",
        roomExamAndTeacher: [
            {
                time_start_exam: '',
                time_end_exam: '',
                teacher_exam: [],
                teacher_score_student: '',
                room_exam: '',
                teachers: [],
                rooms: [],
                disabledRoom: false,
                id_room_edit : ""
            }
        ]
    })

    const [listDataTestSchedule, setlistDataTestSchedule] = useState([]);
    const [callApiReset, setCallApiReset] = useState(false);
    const [isModalOpenPDF, setIsModalOpenPDF] = useState(false);
    const [idDepartment, setidDepartment] = useState('');
    const [openEditData, setOpenEditData] = useState(false);
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

    const columns = [
        {
            title: 'Phòng thi số ',
            dataIndex: 'index',
        },
        {
            title: 'Thời gian bắt đầu thi',
            dataIndex: 'time_start',
        },
        {
            title: 'Thời gian kết thúc thi',
            dataIndex: 'time_end',
        },
        {
            title: 'Phòng thi',
            dataIndex: 'room',
        },
        {
            title: 'Giáo viên coi thi',
            dataIndex: 'teacher_exam',
        },

        {
            title: 'Giáo viên chấm thi',
            dataIndex: 'teacher_score',
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

    useEffect(() => {
        const dataOld = { ...onFormCreate };
        dataOld.form_exam = examForms[0]?.id;
        setOnchangeFormCreate(dataOld)
    }, [examForms])

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

    useEffect(() => {
        async function getData() {
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

    const handleOkCreate = async () => {
        try {

            const dataCretae = { ...onFormCreate, department: idDepartment }
            console.log(dataCretae)
            const dataRes = await instance.post(`/test-schedule-student`, dataCretae);
            if (dataRes) {
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
            mode: 1,
            bigBlockClassExam: '',
            roomPeopleMax: 0,
            time_exam: 0,
            button_submit: true,
            grading_exam: 2
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
                grading_exam: 2
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
            mode: 1,
            bigBlockClassExam: '',
            roomPeopleMax: 0,
            time_exam: 0,
            button_submit: true,
            grading_exam: 2
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

    const changeFormExamEdit = (e) => {
        const dataOld = { ...dataFormEdit };
        const form_exam_old = dataOld.form_exam;

        dataOld.form_exam = e;
        setDataFormEdit(dataOld);
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

    const showDelelteEdit = (id, i) => {
        const teacherDelete = teachers.find(e => e.id == id);
        const dataOld = { ...dataFormEdit };
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
        setDataFormEdit(dataOld);
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
                        let dataTeacherNew = dataTeacherOld.filter(e => e.id !== id);
                        dataOld.roomExamAndTeacher[index].teachers = dataTeacherNew;
                    }
                }
            }
        }
        setOnchangeFormCreate(dataOld);
    }

    const onSelectItemEdit = (id, i) => {
        const dataOld = { ...dataFormEdit };
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
                        let dataTeacherNew = dataTeacherOld.filter(e => e.id !== id);
                        dataOld.roomExamAndTeacher[index].teachers = dataTeacherNew;
                    }
                }
            }
        }
        setDataFormEdit(dataOld);
    }

    // hander room exam 
    const changeMaxPeople = (e) => {
        const valueGet = e.target.value;
        if (valueGet < 1) {
            return toast.error(` Số lượng sinh viên một lớp phải lớn hơn 0 `);
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
                rooms: [],
                disabledRoom: true
            }
            dataArray.push(formObject);
        }
        dataOld.roomPeopleMax = valueGet;
        dataOld.roomExamAndTeacher = dataArray;
        setOnchangeFormCreate(dataOld);
    }


    const changeMaxPeopleEdit = (e) => {
        const valueGet = e.target.value;
        if (valueGet < 1) {
            return toast.error(` Số lượng sinh viên một lớp phải lớn hơn 0 `);
        }
        const numberCell = Math.ceil((countStudnetExam) / (valueGet));
        const dataOld = { ...dataFormEdit };
        if (numberCell === Math.ceil((countStudnetExam) / (dataOld.roomPeopleMax))) {
            dataOld.roomPeopleMax = valueGet
            setDataNow([]);
        } else {
            setDataNow([]);
            if (dataOld.roomExamAndTeacher) {
                delete dataOld.roomExamAndTeacher;
            }
            const dataArray = [];

            for (let index = 0; index < numberCell; index++) {
                const formObject = {
                    time_start_exam: '',
                    time_end_exam: '',
                    teacher_exam: [],
                    teacher_score_student: '',
                    room_exam: '',
                    teachers: [],
                    rooms: [],
                    disabledRoom: true,
                    id_room_edit: ""
                }
                dataArray.push(formObject);
            }
            dataOld.roomPeopleMax = valueGet;
            dataOld.roomExamAndTeacher = dataArray;
        }


        setDataFormEdit(dataOld);
    }
    //time exam
    const changeTimeExam = (e) => {
        const dataOld = { ...onFormCreate };
        dataOld.time_exam = Number(e.target.value)
        setOnchangeFormCreate(dataOld)
    }

    const changeTimeExamEdit = (e) => {
        const dataOld = { ...dataFormEdit };
        const valueGet = e.target.value;
        if (valueGet < 1) {
            return toast.error(` thời gian thi  một lớp phải lớn hơn 0 `);
        }
        const dataArray = [];
        dataOld.time_exam = Number(e.target.value)
        const numberCell = Math.ceil((countStudnetExam) / (dataOld.roomPeopleMax));
        for (let index = 0; index < numberCell; index++) {
            const formObject = {
                time_start_exam: '',
                time_end_exam: '',
                teacher_exam: [],
                teacher_score_student: '',
                room_exam: '',
                teachers: [],
                rooms: [],
                disabledRoom: true,
                id_room_edit:""
            }
            dataArray.push(formObject);
        }
        dataOld.roomExamAndTeacher = dataArray;
        setDataFormEdit(dataOld)
    }
    // gradingExam
    // console.log("++++++++++++++++++++++++++++++++++")
    // console.log(dataFormEdit)
    // console.log("=================================")
    const changeFormGradingExam = (e) => {
        const dataOld = { ...onFormCreate };
        dataOld.grading_exam = e.target.value;
        const dataRoomExamAndTeacherOld = dataOld.roomExamAndTeacher;
        for (let i = 0; i < dataRoomExamAndTeacherOld.length; i++) {
            if (e.target.value == 2) {
                dataRoomExamAndTeacherOld[i].teacher_score_student = []
            }
        }
        dataOld.roomExamAndTeacher = dataRoomExamAndTeacherOld;
        setOnchangeFormCreate(dataOld)
    }

    const changeFormGradingExamEdit = (e) => {
        const dataOld = { ...dataFormEdit };
        dataOld.grading_exam = e.target.value;
        const dataRoomExamAndTeacherOld = dataOld.roomExamAndTeacher;
        for (let i = 0; i < dataRoomExamAndTeacherOld.length; i++) {
            if (e.target.value == 2) {
                dataRoomExamAndTeacherOld[i].teacher_score_student = []
            }
        }
        dataOld.roomExamAndTeacher = dataRoomExamAndTeacherOld;
        setDataFormEdit(dataOld)
    }

    // confime select 


    const onConfirm = async (e, index) => {

        if (Date.parse(new Date()) > Date.parse(e)) {
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
        dataOld.roomExamAndTeacher[index].teacher_exam = [];
        dataOld.roomExamAndTeacher[index].teacher_score_student = '';
        dataOld.roomExamAndTeacher[index].room_exam = '';
        setOnchangeFormCreate(dataOld);
    }

    const changeTeacherRooms = (e, index) => {
        const dataOld = { ...onFormCreate };
        dataOld.roomExamAndTeacher[index].teacher_exam = e;
        if (dataOld.grading_exam === 2 && index == Math.ceil((countStudnetExam) / (dataOld.roomPeopleMax)) - 1) {
            dataOld.button_submit = false
        }
        if (dataOld.grading_exam === 2) {
            dataOld.roomExamAndTeacher[index].disabledRoom = false
        }
        setOnchangeFormCreate(dataOld)
    }

    const changeTeacherRoomsEdit = (e, index) => {
        const dataOld = {...dataFormEdit} ;
        dataOld.roomExamAndTeacher[index].teacher_exam = e;
        if (dataOld.grading_exam === 2 && index == Math.ceil((countStudnetExam) / (dataOld.roomPeopleMax)) - 1) {
            dataOld.button_submit = false
        }
        if (dataOld.grading_exam === 2) {
            dataOld.roomExamAndTeacher[index].disabledRoom = false;
        }
        setDataFormEdit(dataOld)
        const dataRoomAndTeach = dataOld.roomExamAndTeacher;
        setDataNow(dataRoomAndTeach)
    }

    const changeTeacherRoomsScoreStudent = (e, index) => {
        const dataOld = { ...onFormCreate };
        dataOld.roomExamAndTeacher[index].teacher_score_student = e;
        if (dataOld.grading_exam === 1) {
            dataOld.roomExamAndTeacher[index].disabledRoom = false
        }
        if (dataOld.grading_exam === 1 && index == Math.ceil((countStudnetExam) / (dataOld.roomPeopleMax)) - 1) {
            dataOld.button_submit = false
        }
        setOnchangeFormCreate(dataOld)
    }

    const changeTeacherRoomsScoreStudentEdit = (e, index) => {
        const dataOld = { ...dataFormEdit };
        dataOld.roomExamAndTeacher[index].teacher_score_student = e;
        if (dataOld.grading_exam === 1) {
            dataOld.roomExamAndTeacher[index].disabledRoom = false
        }
        if (dataOld.grading_exam === 1 && index == Math.ceil((countStudnetExam) / (dataOld.roomPeopleMax)) - 1) {
            dataOld.button_submit = false
        }
        setDataFormEdit(dataOld)
    }


    // const onSelectItemRooms = (idd, i) => {
    //     const dataOld = { ...onFormCreate }
    //     const dataTeacher = dataOld.roomExamAndTeacher;
    //     const time_start = dataOld.roomExamAndTeacher[i].time_start_exam;
    //     const time_end = dataOld.roomExamAndTeacher[i].time_end_exam;
    //     const idRoomsSelectOld = dataOld.roomExamAndTeacher[i].room_exam;
    //     const itemRoomsSelectOld = rooms.find(e => e.id == idRoomsSelectOld);
    //     dataOld.roomExamAndTeacher[i].room_exam = idd;
    //     if (dataTeacher.length > 1) {
    //         for (let index = 0; index < dataTeacher.length; index++) {
    //             if (index === i) {
    //                 continue;
    //             } else {
    //                 const { time_end_exam, time_start_exam } = dataTeacher[index]
    //                 if ((Date.parse(time_start) >= Date.parse(time_start_exam) && Date.parse(time_start) <= Date.parse(time_end_exam)) || (Date.parse(time_end) >= Date.parse(time_start_exam) && Date.parse(time_end) <= Date.parse(time_end_exam))) {
    //                     const dataRoomOld = dataOld.roomExamAndTeacher[i].rooms;
    //                     const dataNew = dataRoomOld.filter(e => e.id != idd);
    //                     let dataNew1 = dataNew;
    //                     if (itemRoomsSelectOld) {
    //                         dataNew1 = dataNew.concat(itemRoomsSelectOld);
    //                     }
    //                     dataOld.roomExamAndTeacher[index].rooms = dataNew1;
    //                 }
    //             }
    //         }
    //     }
    // }


    // const onSelectItemRoomsEdit = (idd, i) => {
    //     const dataOld = { ...dataFormEdit }
    //     console.log("SelectEdit")
    //     const dataTeacher = dataOld.roomExamAndTeacher;
    //     const time_start = dataOld.roomExamAndTeacher[i].time_start_exam;
    //     const time_end = dataOld.roomExamAndTeacher[i].time_end_exam;
    //     const idRoomsSelectOld = dataOld.roomExamAndTeacher[i].room_exam;
    //     const itemRoomsSelectOld = rooms.find(e => e.id == idRoomsSelectOld);
    //     dataOld.roomExamAndTeacher[i].room_exam = idd;
    //     if (dataTeacher.length > 1) {
    //         for (let index = 0; index < dataTeacher.length; index++) {
    //             if (index === i) {
    //                 continue;
    //             } else {
    //                 const { time_end_exam, time_start_exam } = dataTeacher[index]
    //                 if ((Date.parse(time_start) >= Date.parse(time_start_exam) && Date.parse(time_start) <= Date.parse(time_end_exam)) || (Date.parse(time_end) >= Date.parse(time_start_exam) && Date.parse(time_end) <= Date.parse(time_end_exam))) {
    //                     const dataRoomOld = dataOld.roomExamAndTeacher[i].rooms;
    //                     const dataNew = dataRoomOld.filter(e => e.id != idd);
    //                     let dataNew1 = dataNew;
    //                     if (itemRoomsSelectOld) {
    //                         dataNew1 = dataNew.concat(itemRoomsSelectOld);
    //                     }
    //                     dataOld.roomExamAndTeacher[index].rooms = dataNew1;
    //                 }
    //             }
    //         }
    //     }
    // }





    const changeRoomExam = (idd, i) => {
        const dataOld = { ...onFormCreate }
        const dataTeacher = dataOld.roomExamAndTeacher;
        const time_start = dataOld.roomExamAndTeacher[i].time_start_exam;
        const time_end = dataOld.roomExamAndTeacher[i].time_end_exam;
        const idRoomsSelectOld = dataOld.roomExamAndTeacher[i].room_exam;
        let itemRoomsSelectOld = "";
        if (dataTeacher.length > 1) {
            itemRoomsSelectOld = rooms.find(e => e.id == idRoomsSelectOld);
        }
        dataOld.roomExamAndTeacher[i].room_exam = idd;
        if (dataTeacher.length > 1) {
            for (let index = 0; index < dataTeacher.length; index++) {
                if (index === i) {
                    continue;
                } else {
                    const { time_end_exam, time_start_exam } = dataTeacher[index]
                    if ((Date.parse(time_start) >= Date.parse(time_start_exam) && Date.parse(time_start) <= Date.parse(time_end_exam)) || (Date.parse(time_end) >= Date.parse(time_start_exam) && Date.parse(time_end) <= Date.parse(time_end_exam))) {
                        const dataRoomOld = dataOld.roomExamAndTeacher[index].rooms;
                        const dataNew = dataRoomOld.filter(e => e.id != idd);
                        let dataNew1 = dataNew;
                        if (itemRoomsSelectOld) {
                            dataNew1 = dataNew.concat(itemRoomsSelectOld);
                        }
                        dataOld.roomExamAndTeacher[index].rooms = dataNew1;
                    }
                }
            }
        }
        setOnchangeFormCreate(dataOld)
    }


    const changeRoomExamEdit = (idd, i) => {
        const dataOld = { ...dataFormEdit }
        dataOld.roomExamAndTeacher[i].room_exam = idd;

        const dataRoomNowOld = [...dataSelectRoomInNow];
        dataRoomNowOld[i].room_exam = idd;
        setDataNow(dataRoomNowOld);
        setDataFormEdit(dataOld)
    }
    useEffect(() => {
        idDepartment && dispatch(callApiGetTeacherDepartment(idDepartment, 'create'))
    }, [idDepartment])

    useEffect(() => {
        dataFormEdit.idDepartment && dispatch(callApiGetTeacherDepartment(dataFormEdit.idDepartment, 'edit'))
    }, [dataFormEdit.idDepartment])

    const onChangeCallDepartment = (e) => {
        const dataOld = { ...onFormCreate }
        const { roomExamAndTeacher } = dataOld;

        for (let i = 0; i < roomExamAndTeacher.length; i++) {
            roomExamAndTeacher[i].teacher_score_student = '';
        }
        setidDepartment(e)
        dataOld.roomExamAndTeacher = roomExamAndTeacher;
        setOnchangeFormCreate(dataOld)
    }

    const onChangeCallDepartmentEdit = (e) => {
        const dataOld = { ...dataFormEdit }
        const { roomExamAndTeacher } = dataOld;

        for (let i = 0; i < roomExamAndTeacher.length; i++) {
            roomExamAndTeacher[i].teacher_score_student = '';
        }
        dataOld.dataa = e
        dataOld.roomExamAndTeacher = roomExamAndTeacher;
        setDataFormEdit(dataOld)
        // setidDepartment(e)
    }



    const [listScheduleExamStudent, setlistScheduleExamStudent] = useState([]);
    const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
    const [idDeleteScheduleExam, setidDeleteScheduleExam] = useState(false);


    const getIdTeacher = (item) => {
        let listTeacher = [];
        for (let i = 0; i < item.length; i++) {
            let idTeacher = item[i].id_Teacher.id
            listTeacher.push(Number(idTeacher))
        }
        return listTeacher;
    }

    const getIdTeacherScore = (item) => {
        let listTeacher = [];
        for (let i = 0; i < item.length; i++) {
            let idTeacher = item[i].id_teacher_mark_score.id
            listTeacher.push(Number(idTeacher))
        }
        return listTeacher;
    }
    
    console.log("dataSelectRoomInNow1" ,dataSelectRoomInNow)

    const dataCallApiRoom = async (time_start, time_end, index, idRooms) => {
        //    const dataRes = await instance.post(`/test-schedule-student/${time_start}/${time_end}`,arrayExitsTeachers);
        const dataRes1 = await instance.post(`/test-schedule-student/rooms/${time_start}/${time_end}`, []);
        const roomsResponse = dataRes1.data;
        const datadbOld = { ...dataFormEdit };
        const dataRoomSelect = rooms.find(e => e.id == idRooms);
        const datarowInNoew = [...dataSelectRoomInNow]

        // DB + No DB
        for (let i = 0; i < databaseRoomsInDb.length; i++) {

            if (Date.parse(databaseRoomsInDb[i].time_start_exam) <= Date.parse(time_start) && Date.parse(time_start) <= Date.parse(databaseRoomsInDb[i].time_end_exam) || Date.parse(databaseRoomsInDb[i].time_start_exam) <= Date.parse(time_end) && Date.parse(time_end) <= Date.parse(databaseRoomsInDb[i].time_end_exam)) {
                const roomfindID = databaseRoomsInDb[i].room_exam;
                const dataFind = rooms.find(e => e.id == roomfindID);
                if (dataFind) {
                    roomsResponse.push(dataFind);
                }


            }
        }
        let datapush = roomsResponse;
        // Item select now
        if(dataSelectRoomInNow.length > 0 ){
        for (let k = 0; k < datarowInNoew.length; k++) {
            if ((Date.parse(datarowInNoew[k].time_start_exam) <= Date.parse(time_start) && Date.parse(time_start) <= Date.parse(datarowInNoew[k].time_end_exam)) || (Date.parse(datarowInNoew[k].time_start_exam) <= Date.parse(time_end) && Date.parse(time_end) <= Date.parse(datarowInNoew[k].time_end_exam))) {
                const idRoomDelete = datarowInNoew[k].room_exam;
                if (idRoomDelete) {
                    datapush = datapush.filter(e => e.id != idRoomDelete);
                }

            }
        }
        if (dataRoomSelect) {
            datapush.push(dataRoomSelect);
        }
    }

        datadbOld.roomExamAndTeacher[index].rooms = datapush;
        setDataFormEdit(datadbOld);
    }

    const dataCallApiTeacher = async (time_start, time_end, index, idRooms) => {
        const dataRes = await instance.post(`/test-schedule-student/${time_start}/${time_end}`, []);
        const teacherResponse = dataRes.data;
        const datarowInNoew = [...dataSelectRoomInNow];
        const datadbOld = { ...dataFormEdit };
        // one . push teacher_exam about time db 
        // two . Delete cac teacher dulicate db
        // three push teacher now select

        // DB + No DB
        for (let i = 0; i < databaseRoomsInDb.length; i++) {
            if (Date.parse(databaseRoomsInDb[i].time_start_exam) <= Date.parse(time_start) && Date.parse(time_start) <= Date.parse(databaseRoomsInDb[i].time_end_exam) && Date.parse(databaseRoomsInDb[i].time_start_exam) <= Date.parse(time_end) && Date.parse(time_end) <= Date.parse(databaseRoomsInDb[i].time_end_exam)) {
              
                for (let m = 0; m < databaseRoomsInDb[i].teacher_exam.length; m++) {
                    const teacherFindId = databaseRoomsInDb[i].teacher_exam[m];
                    const dataFind = listTeachers.find(e => e.id == teacherFindId);
                    if (dataFind) {
                        teacherResponse.push(dataFind);
                    }
                }
            }
        }

        let datapush = teacherResponse;
        for (let k = 0; k < datarowInNoew.length; k++) {
            if ((Date.parse(datarowInNoew[k].time_start_exam) <= Date.parse(time_start) && Date.parse(time_start) <= Date.parse(datarowInNoew[k].time_end_exam)) && (Date.parse(datarowInNoew[k].time_start_exam) <= Date.parse(time_end) && Date.parse(time_end) <= Date.parse(datarowInNoew[k].time_end_exam))) {
                console.log("undefind",datarowInNoew[k].teacher_exam)
                for (let m = 0; m < datarowInNoew[k].teacher_exam.length; m++) {
                    const teacherDelete = datarowInNoew[k].teacher_exam[m];
                    console.log("teacherDelete" , teacherDelete)
                    datapush = datapush.filter(e => e.id != teacherDelete);
                }



            }
        }

        if (datarowInNoew[index].teacher_exam.length > 0) {
            for (let i = 0; i < datarowInNoew[index].teacher_exam.length; i++) {
                const teacher = listTeachers.find(e => e.id == datarowInNoew[index].teacher_exam[i]);
                datapush.push(teacher);
            }
        }
        datadbOld.roomExamAndTeacher[index].teachers = datapush;
        setDataFormEdit(datadbOld);

    }



    const showModalEdit = (item) => {
        console.log("item", item)
        const { time_year_end, time_year_start ,id } = item;
        const id_exam_edit = item.id_exam.id;
        const id_class_exam = getClassBigExam(item?.id_big_class_exam);
        const { form_exam, mode, roomPeopleMax, time_exam, grading_exam, department } = item.id_testScheduleStudent[0];
        const formSearchCountStudent = {
            exam: id_exam_edit,
            time_start: time_year_start,
        }
        if (mode == 1) {
            dispatch(setCountExamApi(formSearchCountStudent))
        } else {
            dispatch(setCountExamApiTl(formSearchCountStudent))
        }

        const dataRoomOld = [];
        const { id_itemRoomExamAndTeacher } = item.id_testScheduleStudent[0];
        for (let i = 0; i < id_itemRoomExamAndTeacher.length; i++) {
            const objectPush = {
                time_start_exam: id_itemRoomExamAndTeacher[i].time_start,
                time_end_exam: id_itemRoomExamAndTeacher[i].time_end,
                teacher_exam: getIdTeacher(id_itemRoomExamAndTeacher[i].id_teacherTrack),
                teacher_score_student: getIdTeacherScore(id_itemRoomExamAndTeacher[i].id_teacher_mark_exam),
                room_exam: id_itemRoomExamAndTeacher[i].id_Room.id,
                teachers: listTeachers,
                rooms: rooms,
                disabledRoom: false,
                id_room_edit : id_itemRoomExamAndTeacher[i].id
            }
            dataRoomOld.push(objectPush)
        }

        setDataFormEdit({
            id_exam: id_exam_edit,
            id_edit : item.id_testScheduleStudent[0].id,
            mode: mode,
            bigBlockClassExam: id_class_exam,
            roomPeopleMax: roomPeopleMax,
            time_exam: time_exam,
            timeYearExamStart: time_year_start,
            timeYearExamEnd: time_year_end,
            form_exam: form_exam,
            idDepartment: Number(department),
            grading_exam: Number(grading_exam),
            // roomExamAndTeacher: [
            //     {
            //         time_start_exam: '',
            //         time_end_exam: '',
            //         teacher_exam: [],
            //         teacher_score_student: '',
            //         room_exam: '',
            //         teachers: [],
            //         rooms: [],
            //         disabledRoom: true
            //     }]
            roomExamAndTeacher: dataRoomOld,
           
        })
        setOpenEditData(true)
        setLoadDb(JSON.parse(JSON.stringify(dataRoomOld)))
        setDataNow(JSON.parse(JSON.stringify(dataRoomOld)))
    };


    const showModalDelete = (id) => {
        setisOpenDeleteModal(true)
        setidDeleteScheduleExam(id)
    }

    const handleOkDelete = async () => {
        try {
            const response = await instance.delete(`/test-schedule-student/${idDeleteScheduleExam}`);
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


    const [idPDF, setidPDF] = useState({});
    const handleOkPDF = async () => {
        setIsModalOpenPDF(false);
        const dataGetPdf = { ...idPDF };
        for (let i = 0; i < dataGetPdf.arrayId.length; i++) {
            let response = '';
            if (dataGetPdf.mode == 1) {
                response = await instance.post(`/students/schedule_pdf/${dataGetPdf.arrayId[i].id}`,
                    {
                        mode: dataGetPdf.mode,
                        time_start: dataGetPdf.time_start,
                        big_class: dataGetPdf.big_class,
                        nameRoom: dataGetPdf.arrayId[i].nameRoom,
                        name: dataGetPdf.name,
                        time_exam: dataGetPdf.arrayId[i].time_exam,
                        form_exam: dataGetPdf.form_exam,

                    },
                    {
                        responseType: 'blob',
                        dataType: "binary",
                    });

            } else {
                response = await instance.post(`/students/schedule_pdf/tl/${dataGetPdf.arrayId[i].id}`,
                    {
                        mode: dataGetPdf.mode,
                        time_start: dataGetPdf.time_start,
                        big_class: dataGetPdf.big_class,
                        nameRoom: dataGetPdf.arrayId[i].nameRoom,
                        name: dataGetPdf.name,
                        time_exam: dataGetPdf.arrayId[i].time_exam,
                        form_exam: dataGetPdf.form_exam,

                    },
                    {
                        responseType: 'blob',
                        dataType: "binary",
                    });
            }

            const blob = new Blob(
                [response.data],
                { type: 'application/pdf' });
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `${dataGetPdf.name}-${dataGetPdf.big_class}.pdf`
            link.click()
        }
    }

    const handleCancelPDF = () => {
        setIsModalOpenPDF(false)
    }

    const showModalPDF = (data) => {
        setIsModalOpenPDF(true);
        const { id_room, big_class, mode, name, time_start, form_exam } = data;
        const arrayId = []
        for (let i = 0; i < id_room.length; i++) {
            arrayId.push({ id: id_room[i].id, nameRoom: id_room[i].id_Room.name, time_exam: id_room[i].time_start })
        }
        setidPDF({
            arrayId,
            big_class,
            mode,
            name,
            time_start,
            form_exam,
        })
    }

    useEffect(() => {
        // if (listDataTestSchedule.length > 0) {
        let dataList = [];
        listDataTestSchedule.forEach((item, i) => {
            dataList.push({
                key: i,
                index: i + 1,
                name: item?.id_exam?.name,
                form_exam: resultFormExam(item?.form_exam),
                mode: resultMode(item?.id_testScheduleStudent[0].mode),
                bigBlockClass: getClassBigExam(item?.id_big_class_exam),
                yearExam: item?.time_year_start + "-" + item?.time_year_end,
                time_exam: item?.id_testScheduleStudent[0].time_exam,
                edit: <Button type='primary' onClick={() => showModalEdit(item)}>Edit</Button>, // chi chay 1 lan
                delete: <Button type='primary' danger onClick={() => showModalDelete(item?.id_testScheduleStudent[0].id)}>Delete</Button>,
                // export: <Button type='primary' onClick={() => showModalPDF({ id: item?.id_testScheduleStudent[0].id, subject: item?.id_exam?.name, mode: resultMode(item?.id_testScheduleStudent[0].mode), form_exam: resultFormExam(item?.form_exam), blokcclass: getClassBigExam(item?.id_big_class_exam) })}>Lấy danh sách thi</Button>
                export: <Button type='primary' onClick={() => showModalPDF({ id_room: item?.id_testScheduleStudent[0].id_itemRoomExamAndTeacher, time_start: item.time_year_start, big_class: getClassBigExam(item?.id_big_class_exam), name: item.id_exam.name, mode: item.id_testScheduleStudent[0].mode, form_exam: item?.id_testScheduleStudent[0].id_ExamForm.name })}>Lấy danh sách thi</Button>
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
                        idRoomsUnless.push(Number(dataTeacher[index].room_exam))
                    }
                }
            }
        }
        return idRoomsUnless;
    }



    const dataTable = () => {
        const data = [];
        if (onFormCreate?.roomExamAndTeacher?.length > 0) {
            for (let index = 0; index < onFormCreate.roomExamAndTeacher.length; index++) {
                data.push({
                    key: index,
                    index: index + 1,
                    time_start:
                        <DatePicker
                            showTime
                            format="YYYY/MM/DD HH:mm"
                            className="time_start_begin"
                            value={onFormCreate.roomExamAndTeacher[index].time_start_exam && dayjs(onFormCreate.roomExamAndTeacher[index].time_start_exam)}
                            onOk={(e) => onConfirm(e, index)}
                            allowClear={false}
                            disabled={onFormCreate.roomExamAndTeacher.length === 1 ? false : (onFormCreate.roomExamAndTeacher[index - 1]?.disabledRoom)}
                        />
                    ,
                    time_end:
                        <div className="time_start_end">{onFormCreate.roomExamAndTeacher[index].time_end_exam
                            && dayjs(onFormCreate.roomExamAndTeacher[index].time_end_exam).format("YYYY/MM/DD HH:mm")
                        }</div>
                    ,
                    room: <Select
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
                    // onSelect={(e) => onSelectItemRooms(e, index)}
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
                    ,
                    teacher_exam: <Select
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

                    </Select>,
                    teacher_score:
                        <div>
                            {onFormCreate?.grading_exam == 1 ?
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
                                : "Máy chấm điểm tự động"}
                        </div>
                });
            }
        }
        return data;
    };


    // logic edit exam

    const getTeacherSelectsEdit = (time_start, time_end, i) => {
        const dataTeacher = dataFormEdit.roomExamAndTeacher;
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



    const getRoomsSelectsEdit = (time_start, time_end, i) => {
        const dataTeacher = dataFormEdit.roomExamAndTeacher;
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
                        idRoomsUnless.push(Number(dataTeacher[index].room_exam))
                    }
                }
            }
        }
        return idRoomsUnless;
    }


    const onConfirmEdit = async (e, index) => {

        if (Date.parse(new Date()) > Date.parse(e)) {
            return toast.error("Thời gian bạn chọn phải lớn hơn thời gian hiện tại");
        }
        const dataOld = { ...dataFormEdit };
        const timeExam = dataOld.time_exam;
        dataOld.roomExamAndTeacher[index].time_start_exam = dayjs(e).format('YYYY-MM-DD HH:mm');
        dataOld.roomExamAndTeacher[index].time_end_exam = dayjs(e).add(timeExam, 'minute').format('YYYY-MM-DD HH:mm');
        const idUnLess = getTeacherSelectsEdit(dayjs(e).format('YYYY-MM-DD HH:mm'), dayjs(e).add(timeExam, 'minute').format('YYYY-MM-DD HH:mm'), index);
        const idUnLessRoom = getRoomsSelectsEdit(dayjs(e).format('YYYY-MM-DD HH:mm'), dayjs(e).add(timeExam, 'minute').format('YYYY-MM-DD HH:mm'), index);
        const dataRes = await instance.post(`/test-schedule-student/${dataOld.roomExamAndTeacher[index].time_start_exam}/${dataOld.roomExamAndTeacher[index].time_end_exam}`, idUnLess);
        const dataRes1 = await instance.post(`/test-schedule-student/rooms/${dataOld.roomExamAndTeacher[index].time_start_exam}/${dataOld.roomExamAndTeacher[index].time_end_exam}`, idUnLessRoom);
        dataOld.roomExamAndTeacher[index].teachers = dataRes.data
        dataOld.roomExamAndTeacher[index].rooms = dataRes1.data
        dataOld.roomExamAndTeacher[index].teacher_exam = []
        dataOld.roomExamAndTeacher[index].room_exam = ""
        dataOld.roomExamAndTeacher[index].teacher_score_student = "";
        setDataFormEdit(dataOld);
        const dataOldTime = JSON.parse(JSON.stringify(dataSelectRoomInNow));
        dataOldTime[index].time_start_exam = dayjs(e).format('YYYY-MM-DD HH:mm');
        dataOldTime[index].time_end_exam = dayjs(e).add(timeExam, 'minute').format('YYYY-MM-DD HH:mm');
        dataOldTime[index].room_exam = 0;
        dataOldTime[index].teacher_exam = [];
        dataOldTime[index].teacher_score_student = "";
        setDataNow(dataOldTime);
    }



    const dataTableEdit = (dataFormEdit) => {
        const { roomExamAndTeacher, grading_exam } = dataFormEdit;
        // this data create begin
        const data = [];
        if (roomExamAndTeacher?.length > 0) {
            for (let index = 0; index < roomExamAndTeacher.length; index++) {
                data.push({
                    key: index,
                    index: index + 1,
                    time_start:
                        <DatePicker
                            showTime
                            format="YYYY/MM/DD HH:mm"
                            className="time_start_begin"
                            value={roomExamAndTeacher[index].time_start_exam && dayjs(roomExamAndTeacher[index].time_start_exam)}
                            onOk={(e) => onConfirmEdit(e, index)}
                            allowClear={false}
                            disabled={roomExamAndTeacher.length === 1 ? false : (roomExamAndTeacher[index - 1]?.disabledRoom)}
                        />
                    ,
                    time_end:
                        <div className="time_start_end">{roomExamAndTeacher[index].time_end_exam
                            && dayjs(roomExamAndTeacher[index].time_end_exam).format("YYYY/MM/DD HH:mm")
                        }</div>
                    ,
                    room: <Select
                        showSearch
                        style={{ width: '100%' }}
                        disabled={roomExamAndTeacher[index].time_start_exam ? false : true}
                        placeholder="Chọn phòng thi"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        value={roomExamAndTeacher[index].room_exam}
                        onChange={(e) => changeRoomExamEdit(e, index)}
                        // onSelect={(e) => onSelectItemRoomsEdit(e, index)}
                        onFocus={() => dataCallApiRoom(roomExamAndTeacher[index].time_start_exam, roomExamAndTeacher[index].time_end_exam, index, roomExamAndTeacher[index].room_exam)}
                    >
                        {
                            roomExamAndTeacher[index]?.rooms.map((e, index) => {
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
                    ,
                    teacher_exam: <Select
                        showSearch
                        // disabled={roomExamAndTeacher[index].time_start_exam ? false : true}
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
                        value={roomExamAndTeacher[index]?.teacher_exam}
                        onChange={(e) => changeTeacherRoomsEdit(e, index)}
                        onDeselect={(e) => showDelelteEdit(e, index)}
                        // onSelect={(e) => onSelectItemEdit(e, index)}
                        onFocus={() => dataCallApiTeacher(roomExamAndTeacher[index].time_start_exam, roomExamAndTeacher[index].time_end_exam, index)}
                        className="select_teacher"
                    >
                        {
                            roomExamAndTeacher[index].teachers.map(e => {
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

                    </Select>,
                    teacher_score:
                        <div>
                            {dataFormEdit.grading_exam == 1 ?
                                <Select
                                    showSearch
                                    disabled={roomExamAndTeacher[index]?.teacher_exam.length > 0 ? false : true}
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
                                    value={roomExamAndTeacher[index]?.teacher_score_student}
                                    onChange={(e) => changeTeacherRoomsScoreStudentEdit(e, index)}
                                    className="select_teacher"
                                >
                                    {
                                        teacher_department_edit.map(e => {
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
                                : "Máy chấm điểm tự động"}
                        </div>
                });
            }
        }
        return data;
    }

    // handele Edit

    const onCloseEdit = () => {
        setOpenEditData(false);
    }

    const handleCancelEdit = () => {
        setOpenEditData(false);
    }

    const handleOkEdit = async() => {
        const data = {
            ...dataFormEdit,
            department : dataFormEdit.idDepartment
        }
     //   console.log(data)
        dispatch(editDataSchedule(data))
       // const dataRes = await instance.post(`/test-schedule-student/edit`, dataFormEdit);
        console.log( "dataFormEdit" ,dataFormEdit)
        setOpenEditData(false);
        setCallApiReset(!callApiReset)
    }

    ///// logic edit 

    const [openNoti, setOpenNoti] = useState(false)
    const onChangeExamEdit = () => {
        setOpenNoti(true)
    }
    const handleChangeModeEdit = () => {
        setOpenNoti(true)
    }
    const onChangeSearchYearEdit = () => {
        setOpenNoti(true)
    }

    const handleOkDeleteAndCreate = () => {
        setOpenNoti(false)
        setOpenEditData(false)
        setIsModalOpenCreate(true)
        const { id_exam, mode, timeYearExamStart } = dataFormEdit;
        // const dataOnFormCreate
    }

    const handleCancelDeleteAndCreate = () => {
        setOpenNoti(false)
    }


    return (
        <div>
            <div className='form_search'>
                <Button type='primary' onClick={showModalCreate}>Tạo Lịch Thi</Button>

            </div>

            <Table columns={columns1} dataSource={listScheduleExamStudent} />



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


            {/* Modal PDF */}
            {/* <Modal title="Xóa danh sách thi này tạo lại danh sach thi khác" open={openNoti} onOk={handleOkDeleteAndCreate} onCancel={handleCancelDeleteAndCreate}>
                <p> Nếu bạn đồng ý thì lịch thi này sẽ bị xóa và tạo lại từ đầu </p>
            </Modal> */}
            {/* End Modal PDF */}



            <Drawer
                title="Tạo Lịch Thi"
                placement="right"
                onClose={handleCancelCreate}
                open={isModalOpenCreate}
                extra={
                    <Space>
                        <Button onClick={handleCancelCreate}>Hủy</Button>
                        <Button type="primary" onClick={handleOkCreate}>
                            Tạo lịch thi
                        </Button>
                    </Space>
                }
            >
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
                            name: ["grading_exam"],
                            value: onFormCreate.grading_exam
                        },
                        {
                            name: ["idDepartment"],
                            value: idDepartment
                        }
                    ]}

                >

                    <div className='tt_information_exam'>
                        {
                            onFormCreate.id_exam > 0 && countStudnetExam > 1 && <span className='count_exam'> Khóa Dự Thi : {onFormCreate.bigBlockClassExam}  {
                                onFormCreate.id_exam > 0 && <div className='count_exam1'> - Có tổng cộng {countStudnetExam} sinh viên </div>
                            } </span>
                        }
                    </div>

                    {
                        countStudnetExam < 1 && onFormCreate.id_exam && <div className='error_canlender'>Hiện tại chưa có sinh viên nào để lên lịch thi</div>
                    }

                    <div className='form_create_table'>
                        <Form.Item
                            label="Môn thi : "
                            name="id_exam"
                            className='form_item'
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
                            className='form_item'
                        >  <Select
                                name="mode"
                                value={onFormCreate.mode}
                                onChange={handleChangeMode}
                                style={{ width: '100%' }}
                                options={options}
                            />
                        </Form.Item>



                        <Form.Item
                            label="Năm học : "
                            name="year"
                            className='form_item'
                            disabled={true}
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                disabled={onFormCreate.id_exam > 0 ? false : true}
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
                    </div>




                    <div className='form_2'>
                        <Form.Item
                            label="Hình thức thi : "
                            name="form_exam"
                            className='form_item'
                        >
                            <Select
                                showSearch
                                disabled={onFormCreate.id_exam > 0 ? false : true}
                                style={{ width: '100%' }}
                                placeholder="Chọn hình thức thi :"
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

                        <Form.Item
                            label="Số lượng sinh viên tối đa của 1 phòng : "
                            name="roomPeopleMax"
                            className='form_item'
                        >
                            <Input name="roomPeopleMax" value={onFormCreate.roomPeopleMax} onChange={changeMaxPeople} type="number" disabled={onFormCreate.id_exam > 0 ? false : true} />

                        </Form.Item>

                        {
                            <Form.Item
                                label="Tổng thời gian thi môn (Phút) : "
                                name="time_exam"
                                className='form_item'
                            >
                                <Input name="time_exam" value={onFormCreate.time_exam} onChange={changeTimeExam} type="number" disabled={onFormCreate.roomPeopleMax > 0 ? false : true} />

                            </Form.Item>
                        }
                    </div>


                    <div className='form_3'>
                        {
                            <Form.Item
                                label="Hình thức chấm thi : "
                                name="grading_exam"
                                className='form_item'
                            >
                                <Radio.Group onChange={changeFormGradingExam} value={onFormCreate.grading_exam} className="radio1" disabled={onFormCreate.time_exam <= 0}>
                                    {
                                        options_score_student.map(e => <Radio value={e.value} key={e.value}> {e.label}</Radio>)
                                    }
                                </Radio.Group>
                            </Form.Item>
                        }


                        <div>

                            <Form.Item
                                label=" Khoa chấm thi :"
                                name="idDepartment"
                                className='form_item'
                            >
                                <Select
                                    showSearch
                                    disabled={onFormCreate.grading_exam === 1 && onFormCreate?.roomExamAndTeacher?.length > 0 ? false : true}
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
                    </div>




                </Form>

                <p className='list_room'>Danh sách đăng kí phòng thi : </p>
                <div className='table_select_time'>
                    <Table columns={columns} dataSource={dataTable()} />
                </div>

            </Drawer>


            {/* Edit data room */}
            <Drawer title="Sửa dữ liệu phòng thi" placement="right"
                onClose={onCloseEdit}
                open={openEditData}
                extra={
                    <Space>
                        <Button onClick={handleCancelEdit}>Hủy</Button>
                        <Button type="primary" onClick={handleOkEdit}>
                            Sửa  lịch thi
                        </Button>
                    </Space>
                }
            >
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
                            value: dataFormEdit.id_exam,
                        },
                        {
                            name: ["mode"],
                            value: dataFormEdit.mode,
                        },
                        {
                            name: ["year"],
                            value: dataFormEdit.timeYearExamStart + "-" + dataFormEdit.timeYearExamEnd,
                        },
                        {
                            name: ["form_exam"],
                            value: dataFormEdit.form_exam,
                        },

                        {
                            name: ["roomPeopleMax"],
                            value: dataFormEdit.roomPeopleMax,
                        },
                        {
                            name: ["time_exam"],
                            value: dataFormEdit.time_exam,
                        },
                        {
                            name: ["grading_exam"],
                            value: dataFormEdit.grading_exam
                        },
                        {
                            name: ["idDepartment"],
                            value: dataFormEdit.idDepartment
                        },
                        {
                            name: ["grading_exam"],
                            value: dataFormEdit.grading_exam
                        },

                    ]}

                >

                    <div className='tt_information_exam'>
                        {
                            dataFormEdit.id_exam > 0 && countStudnetExam > 1 && <span className='count_exam'> Khóa Dự Thi : {dataFormEdit.bigBlockClassExam}  {
                                dataFormEdit.id_exam > 0 && <div className='count_exam1'> - Có tổng cộng {countStudnetExam} sinh viên </div>
                            } </span>
                        }
                    </div>

                    {
                        countStudnetExam < 1 && dataFormEdit.id_exam && <div className='error_canlender'>Hiện tại chưa có sinh viên nào để lên lịch thi</div>
                    }

                    <div className='form_create_table'>
                        <Form.Item
                            label="Môn thi : "
                            name="id_exam"
                            className='form_item'
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Chọn Môn Thi"
                                value={dataFormEdit.id_exam}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={onChangeExamEdit}
                                disabled

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
                            className='form_item'
                        >  <Select
                                name="mode"
                                value={dataFormEdit.mode}
                                onChange={handleChangeModeEdit}
                                style={{ width: '100%' }}
                                options={options}
                                disabled
                            />
                        </Form.Item>



                        <Form.Item
                            label="Năm học : "
                            name="year"
                            className='form_item'
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                disabled={dataFormEdit.id_exam > 0 ? false : true}
                                placeholder="Năm học"
                                value={dataFormEdit.timeYearExamStart + "-" + dataFormEdit.timeYearExamEnd}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={onChangeSearchYearEdit}
                                disabled
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
                    </div>




                    <div className='form_2'>
                        <Form.Item
                            label="Hình thức thi : "
                            name="form_exam"
                            className='form_item'
                        >
                            <Select
                                showSearch
                                disabled={dataFormEdit.id_exam > 0 ? false : true}
                                style={{ width: '100%' }}
                                placeholder="Chọn hình thức thi :"
                                value={dataFormEdit.form_exam}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={changeFormExamEdit}

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

                        <Form.Item
                            label="Số lượng sinh viên tối đa của 1 phòng : "
                            name="roomPeopleMax"
                            className='form_item'
                        >
                            <Input name="roomPeopleMax" value={dataFormEdit.roomPeopleMax} onChange={changeMaxPeopleEdit} type="number" disabled={dataFormEdit.id_exam > 0 ? false : true} />

                        </Form.Item>

                        {
                            <Form.Item
                                label="Tổng thời gian thi môn (Phút) : "
                                name="time_exam"
                                className='form_item'
                            >
                                <Input name="time_exam" value={dataFormEdit.time_exam} onChange={changeTimeExamEdit} type="number" disabled={dataFormEdit.roomPeopleMax > 0 ? false : true} />

                            </Form.Item>
                        }
                    </div>


                    <div className='form_3'>
                        {
                            <Form.Item
                                label="Hình thức chấm thi : "
                                name="grading_exam"
                                className='form_item'
                            >
                                <Radio.Group onChange={changeFormGradingExamEdit} value={dataFormEdit.grading_exam} className="radio1" disabled={dataFormEdit.time_exam <= 0}>
                                    {
                                        options_score_student.map(e => <Radio value={e.value} key={e.value}> {e.label}</Radio>)
                                    }
                                </Radio.Group>
                            </Form.Item>
                        }


                        <div>

                            <Form.Item
                                label=" Khoa chấm thi :"
                                name="idDepartment"
                                className='form_item'
                            >
                                <Select
                                    showSearch
                                    disabled={dataFormEdit.grading_exam === 1 && dataFormEdit?.roomExamAndTeacher?.length > 0 ? false : true}
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
                                    value={dataFormEdit.idDepartment}
                                    onChange={(e) => onChangeCallDepartmentEdit(e)}
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
                    </div>
                </Form>
                <p className='list_room'>Danh sách đăng kí phòng thi : </p>
                <div className='table_select_time'>
                    <Table columns={columns} dataSource={dataTableEdit(dataFormEdit)} />
                </div>
            </Drawer>


            {/* end edit data */}

        </div >
    );

}

export default ScheduleSComponent;