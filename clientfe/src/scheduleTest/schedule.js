import { Button, Table, Modal, Input, Form, Radio, DatePicker, Space, Select, Image } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListDataApi, deleteItemRoom, createRoom, searchDataApi, editDataRoomApi } from '../slices/scheduleTest'
import './styleTeacher.modules.scss'
const { RangePicker } = DatePicker;
const { Option } = Select;
const ScheduleComponent = () => {
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Index',
            dataIndex: 'index',
        },
        {
            title: 'Khóa',
            dataIndex: 'ma_id',
        },
        {
            title: 'Môn Thi',
            dataIndex: 'name',
        },
        {
            title: 'Hình thức thi',
            dataIndex: 'name',
        },
        {
            title: 'Phòng thi',
            dataIndex: 'name',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
        },
    ];

    const { bigBlockClass, rooms, examForms, teachers, exams } = useSelector(state => state.listSchedule);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    // hình thức thi + môn thi + time => array name  timeExamAndFormExam
    const [onFormCreate, setOnchangeFormCreate] = useState({
        idExam: '',
        roomExam: [],
        timeExamAndFormExam: [{
            time_start: '',
            time_end: '',
            form_exam: '',
            systemForm_Exam: ''
        }],
        exam: '',
        roomExamAndTeacher: [{
            room: '',
            teachers: [],
            count_student_room: ''
        }],


    });





    useEffect(() => {
        dispatch(apiGetListDataApi())
    }, [dispatch])


    // hande create


    const showModalCreate = () => {
        setIsModalOpenCreate(true);
    };

    const handleOkCreate = () => {
        // dispatch(createSubject(formSubjectCreate))
        setIsModalOpenCreate(false);
    };

    const handleCancelCreate = () => {
        setIsModalOpenCreate(false);
    };

    const onChanheFormCreate = (e) => {
        setOnchangeFormCreate(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value

            }
        })
    }

    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };


    return (
        <div>
            <div className='form_search'>
                <Button type='primary' onClick={showModalCreate}>Tạo Lịch Thi</Button>

            </div>


            {/* Modal Create */}
            <Modal title="Tạo Lịch Thi Môn" open={isModalOpenCreate} footer={null}>

                <Form
                    name="basic"
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: "100%" }}
                    layout="vertical"
                    autoComplete="off"
                    fields={[
                        {
                            name: ["bigBlockClass"],
                            value: onFormCreate.bigBlockClass,
                        },
                    ]}

                >
                    {/* <Form.Item
                        label="Thời gian thi môn"
                        name="bigBlockClass"
                    >
                        <Space direction="vertical" size={12}>
                            <RangePicker
                                showTime
                                format="YYYY/MM/DD HH:mm"
                                onChange={onRangeChange}
                            />
                        </Space>
                    </Form.Item> */}
                    <Form.Item
                        label="Môn thi"
                        name="bigBlockClass"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Chọn Khối"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }

                        >
                            {
                                exams.map(e => {
                                    return (
                                        <Option value={e.id} label={e.name}>
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
                        label="Khóa"
                        name="bigBlockClass"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Chọn Khối"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }

                        >
                            {
                                bigBlockClass.map(e => {
                                    return (
                                        <Option value={e.id} label={e.bigBlockClass}>
                                            <Space>
                                                {e.bigBlockClass}
                                            </Space>
                                        </Option>
                                    )
                                })
                            }

                        </Select>
                    </Form.Item>




                    <div className='count_exam'> Có tổng cộng 300 sinh viên đăng kí học môn</div>
                    <Form.Item
                        label="Số lượng sinh viên tối đa của 1 phòng"
                        name="bigBlockClass"
                    >
                        <Input />

                    </Form.Item>



                    <Form.Item
                        label="Phòng thi"
                        name="bigBlockClass"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Chọn Khối"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }

                        >
                            {
                                rooms.map(e => {
                                    return (
                                        <Option value={e.id} label={e.name}>
                                            <Space>
                                                {e.name}-{e.form_room}
                                            </Space>
                                        </Option>
                                    )
                                })
                            }

                        </Select>
                    </Form.Item>



                    <Form.Item
                        label="Giáo viên coi thi"
                        name="bigBlockClass"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Chọn Khối"
                            optionFilterProp="children"
                            optionLabelProp="label"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }

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
                    </Form.Item>


                    <Form.Item
                        label="Hình thức thi"
                        name="bigBlockClass"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Chọn Khối"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }

                        >
                            {
                                examForms.map(e => {
                                    return (
                                        <Option value={e.id} label={e.name}>
                                            <Space>
                                                {e.name}
                                            </Space>
                                        </Option>
                                    )
                                })
                            }

                        </Select>
                    </Form.Item>






                    <div className='form_button_group'>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit" onClick={handleCancelCreate}>
                                Cancel
                            </Button>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={handleOkCreate}>
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