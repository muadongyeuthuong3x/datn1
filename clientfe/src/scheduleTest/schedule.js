import { Button, Table, Modal, Input, Form, Radio, DatePicker, Space,Select  } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListDataApi, deleteItemRoom, createRoom, searchDataApi, editDataRoomApi } from '../slices/scheduleTest'
const { RangePicker } = DatePicker;
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

    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [onFormCreate, setOnchangeFormCreate] = useState({
        time_start: '',
        time_end: '',
        id_big_block_class: '',
        idExam: ''
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
            <Modal title="Tạo Khối" open={isModalOpenCreate} footer={null}>

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
                    <Form.Item
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
                            options={[
                                {
                                    value: '1',
                                    label: 'Not Identified',
                                },
                                {
                                    value: '2',
                                    label: 'Closed',
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Môn Thi"
                        name="bigBlockClass"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Chọn môn thi"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                {
                                    value: '1',
                                    label: 'Not Identified',
                                },
                                {
                                    value: '2',
                                    label: 'Closed',
                                },
                            ]}
                        />
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