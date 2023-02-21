import { Button, Table, Modal, Input, Form, Radio } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListRoom, deleteItemRoom, createRoom, searchDataApi, editDataRoomApi } from '../slices/room'
const TestScoreComponent = () => {
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Index',
            dataIndex: 'index',
        },
        {
            title: 'Mã Sinh Viên',
            dataIndex: 'ma_id',
        },
        {
            title: 'Tên Sinh Viên',
            dataIndex: 'name',
        },
        {
            title: 'Điểm chuyên cần',
            dataIndex: 'name',
        },
        {
            title: 'Điểm giữa kì',
            dataIndex: 'name',
        },
        {
            title: 'Điểm Cuối Kì',
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

    const options = [
        { label: 'Phòng tự luận', value: 'Phòng tự luận' },
        { label: 'Phòng máy', value: 'Phòng máy' },
        { label: 'Sân tập', value: 'Sân tập' },
    ];
    const { data } = useSelector(state => state.listRoom)
    const [listExamState, setListExamState] = useState([])
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [idDelete, setIdDelete] = useState(-1);
    const [formRoomCreate, setFromCreateRoom] = useState({
        name: '',
        form_room: options[0].value
    });
    const [nameSearch, setNameSearch] = useState('');
    const [formDataEdit, setFormDataEdit] = useState({
        name: '',
        form_room: '',
        id: ''
    });


    useEffect(() => {
        dispatch(apiGetListRoom())
    }, [dispatch])
    useEffect(() => {
        if (data.length > 0) {
            let dataList = [];
            data.forEach((item, i) => {
                dataList.push({
                    key: i,
                    index: i,
                    name: item?.name,
                    form_room: item?.form_room,
                    edit: <Button type='primary' onClick={() => showModalEdit(item)}>Edit</Button>,
                    delete: <Button type='primary' danger onClick={() => showModalDelete(item?.id)}>Delete</Button>
                });
            })
            setListExamState(dataList)
        } else {
            setListExamState([])
        }
    }, [data])



    const showModalDelete = (id) => {
        setIdDelete(id)
        setIsModalOpenDelete(true);
    };

    const handleOkDelete = () => {
        dispatch(deleteItemRoom(idDelete))
        setIsModalOpenDelete(false);
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    // hande create


    const showModalCreate = () => {
        setIsModalOpenCreate(true);
    };

    const handleOkCreate = async () => {
        dispatch(createRoom(formRoomCreate))

        setIsModalOpenCreate(false);
    };

    const handleCancelCreate = () => {
        setIsModalOpenCreate(false);
    };

    const onChanheFormCreate = (e) => {
        setFromCreateRoom(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value

            }
        })
    }



    // search Data

    const searchData = () => {
        dispatch(searchDataApi(nameSearch))
    };

    // edit data


    const showModalEdit = (data) => {
        setIsModalOpenEdit(true);
        const { name, id, form_room} = data
        setFormDataEdit({
            name,
            id,
            form_room,
        })
    };

    const handleOkEdit = () => {
        dispatch(editDataRoomApi(formDataEdit))
        setIsModalOpenEdit(false);
    };


    const handleCancelEdit = () => {
        setIsModalOpenEdit(false);
    };

    const onChanheFormEdit = (e) => {
        setFormDataEdit(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value

            }
        })
    }


    return (
        <div>
            <div className='form_search'>
                <Button type='primary' onClick={showModalCreate}>Tạo Phòng Thi</Button>
                <Input placeholder='Search name' className='input_search' onChange={e => setNameSearch(e.target.value)} />
                <Button type='primary' onClick={searchData}> Tìm kiếm </Button>
            </div>

            <Table columns={columns} dataSource={listExamState} />

            {/* Modal delete */}
            <Modal title="Delete Giáo Viên" open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}>
                <p> Bạn chắc chắn xóa dữ liệu này chứ </p>
            </Modal>
            {/* End Modal delete */}


            {/* Modal Create */}
            <Modal title="Tạo Phòng Thi" open={isModalOpenCreate} footer={null}>

                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 500 }}
                    layout="vertical"
                    autoComplete="off"
                    fields={[
                        {
                            name: ["name"],
                            value: formRoomCreate.name,
                        },
                        {
                            name: ["form_room"],
                            value: formRoomCreate.form_room,
                        },
                    ]}

                >
                    <Form.Item
                        label="Tên phòng"
                        name="name"
                    >
                        <Input value={formRoomCreate.name} onChange={onChanheFormCreate} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Loại phòng"
                        name="form_room"
                    >
                        <Radio.Group name="form_room" onChange={onChanheFormCreate}  >
                            {
                                options.map(e => {
                                    return <Radio value={e.value} key={e.value}>{e.value}</Radio>
                                })
                            }
                        </Radio.Group>

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





            {/* Modal Edit */}
            <Modal title="Edit Giao Viên" open={isModalOpenEdit} footer={null}>

                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 500 }}
                    layout="vertical"
                    autoComplete="off"
                    fields={[
                        {
                            name: ["name"],
                            value: formDataEdit.name,
                        },
                        {
                            name: ["form_room"],
                            value: formDataEdit.form_room,
                        },
                    ]}

                >
                    <Form.Item
                        label="Tên phòng"
                        name="name"
                    >
                        <Input value={formDataEdit.id_teacher} onChange={onChanheFormEdit} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Loại phòng"
                        name="form_room"
                    >
                        <Radio.Group name="form_room" onChange={onChanheFormEdit}>
                            {
                                options.map(e => {
                                    return <Radio value={e.value}>{e.value}</Radio>
                                })
                            }
                        </Radio.Group>

                    </Form.Item>




                    <div className='form_button_group'>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit" onClick={handleCancelEdit}>
                                Cancel
                            </Button>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={handleOkEdit}>
                                Submit
                            </Button>
                        </Form.Item>
                        <div />
                    </div>


                </Form>
            </Modal>
            {/* End Modal Edit */}

        </div >
    );

}

export default TestScoreComponent;