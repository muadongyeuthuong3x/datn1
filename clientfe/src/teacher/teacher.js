import { Button, Table, Modal, Input, Form, Image, Select, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListTeacherApi, deleteItemTeacherApi, createTeacherApi, searchDataApi, editDataTeacherApi } from '../slices/teacher'
import { apiGetListDepartment } from '../slices/department'
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const TeacherComponent = () => {
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Index',
            dataIndex: 'index',
        },
        {
            title: 'Id teacher',
            dataIndex: 'id_teacher',
        },
        {
            title: 'Tên giáo viên',
            dataIndex: 'name',
        },
        {
            title: 'Ảnh giáo viên',
            dataIndex: 'avatar',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
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


    const { data } = useSelector(state => state.listTeacher)
    const { data: dataDepartment } = useSelector(state => state.listDepartment)
    const [listExamState, setListExamState] = useState([])
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [idDelete, setIdDelete] = useState(-1);
    const [fileEdit, setFileEdit] = useState([])
    const [formTeacherCreate, setFromCreateTeacher] = useState({
        name: '',
        id_teacher: '',
        avatar: [],
        phone_number: '',
        idDepartment: ''
    });
    const [nameSearch, setNameSearch] = useState('');
    const [formDataEdit, setFormDataEdit] = useState({
        name: '',
        id_teacher: '',
        avatar: '',
        avatar_new: '',
        phone_number: '',
        id: '',
        idDepartment: ''
    });
    //

    useEffect(() => {
        dispatch(apiGetListDepartment())
    }, [dispatch])

    useEffect(() => {
        if (!formTeacherCreate.idDepartment) {
            setFromCreateTeacher(prev => {
                return {
                    ...prev,
                    idDepartment: dataDepartment[0]?.id
                }
            })
        }
    }, [dataDepartment])

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    // handele image :

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([

    ]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => {
        setFromCreateTeacher(prev => ({
            ...prev,
            avatar: newFileList
        }))
        setFileList(newFileList)
    }

    const handleChangeEdit = ({ fileList: newFileList }) => {
        setFormDataEdit(prev => ({
            ...prev,
            avatar_new: newFileList
        }))
        setFileEdit(newFileList)
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    // end 
    useEffect(() => {
        dispatch(apiGetListTeacherApi())
    }, [dispatch])

    useEffect(() => {
        if (data.length > 0) {
            let dataList = [];
            data.forEach((item, i) => {
                console.log(data)
                dataList.push({
                    key: i,
                    index: i,
                    id_teacher: item?.id_teacher,
                    name: item?.name,
                    avatar: <Image
                        width={100}
                        height={100}
                        src={item?.avatar}
                    />,
                    phone_number: item?.phone_number,
                    idDepartment : item?.id_teacher_department_query,
                    edit: <Button type='primary' onClick={() => showModalEdit(item)}>Edit</Button>,
                    delete: <Button type='primary' danger onClick={() => showModalDelete(item?.id)}>Delete</Button>
                });
            })
            setListExamState(dataList)
        } else {
            setListExamState([])
        }
    }, [data])

    const onChangeGetDepartment = (id) => {
        setFromCreateTeacher(prev => {
            return {
                ...prev,
                idDepartment: id
            }
        })
    }

    const onChangeGetDepartmentEdit = (id) => {
        setFormDataEdit(prev => {
            return {
                ...prev,
                idDepartment: id
            }
        })
    }

    const showModalDelete = (id) => {
        setIdDelete(id)
        setIsModalOpenDelete(true);
    };

    const handleOkDelete = () => {
        dispatch(deleteItemTeacherApi(idDelete))
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
        dispatch(createTeacherApi(formTeacherCreate))

        setIsModalOpenCreate(false);
    };

    const handleCancelCreate = () => {
        setIsModalOpenCreate(false);
    };

    const onChanheFormCreate = (e) => {
        setFromCreateTeacher(prev => {
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
        const { name, id, id_teacher, avatar, phone_number ,id_teacher_department_query  } = data
        setFormDataEdit({
            name,
            id,
            id_teacher,
            avatar,
            phone_number,
            idDepartment: Number(id_teacher_department_query)
        })
    };
    const handleOkEdit = () => {
        dispatch(editDataTeacherApi(formDataEdit))
        setIsModalOpenEdit(false);
        setFileEdit([])
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
                <Button type='primary' onClick={showModalCreate}>Tạo Giáo Viên</Button>
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
            <Modal title="Tạo Thông Tin Giáo Viên" open={isModalOpenCreate} footer={null}>

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
                            value: formTeacherCreate.name,
                        },
                        {
                            name: ["id_teacher"],
                            value: formTeacherCreate.id_teacher,
                        },
                        {
                            name: ["phone_number"],
                            value: formTeacherCreate.phone_number,
                        },
                        {
                            name: ["avatar"],
                            value: formTeacherCreate.avatar,
                        },
                        {
                            name: ["idDepartment"],
                            value: formTeacherCreate.idDepartment,
                        },
                    ]}

                >
                    <Form.Item
                        label="Khoa phù hợp với giáo viên : "
                        name="idDepartment"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Khoa phù hợp với giáo viên"
                            value={formTeacherCreate.idDepartment}
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            onChange={onChangeGetDepartment}

                        >
                            {
                                dataDepartment.map((e, index) => {
                                    return (
                                        <Option value={e.id} label={e.department} key={index}>
                                            <Space>
                                                {e.department}
                                            </Space>
                                        </Option>
                                    )
                                })
                            }

                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="ID Giáo Viên"
                        name="id_teacher"
                    >
                        <Input value={formTeacherCreate.id_teacher} onChange={onChanheFormCreate} name="id_teacher" />
                    </Form.Item>


                    <Form.Item
                        label="Name"
                        name="name"
                    >
                        <Input value={formTeacherCreate.name} onChange={onChanheFormCreate} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại liên hệ"
                        name="phone_number"
                    >
                        <Input value={formTeacherCreate.phone_number} onChange={onChanheFormCreate} name="phone_number" />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh đại diện"
                        name="avatar"
                    >
                        <Upload
                            listType="picture-card"
                            fileList={formTeacherCreate.avatar}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            accept=".png,.jpeg"
                            beforeUpload={() => {
                                return false;
                            }}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>

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
            <Modal title="Sửa thông tin giáo viên" open={isModalOpenEdit} footer={null}>

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
                            name: ["id_teacher"],
                            value: formDataEdit.id_teacher,
                        },
                        {
                            name: ["phone_number"],
                            value: formDataEdit.phone_number,
                        },
                        {
                            name: ["avatar"],
                            value: formDataEdit.avatar,
                        },
                        {
                            name: ["idDepartment"],
                            value: formDataEdit.idDepartment,
                        },
                    ]}

                >

                    <Form.Item
                        label="Khoa phù hợp với giáo viên : "
                        name="idDepartment"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Khoa phù hợp với giáo viên"
                            value={formDataEdit.idDepartment}
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            onChange={onChangeGetDepartmentEdit}

                        >
                            {
                                dataDepartment.map((e, index) => {
                                    return (
                                        <Option value={e.id} label={e.department} key={index}>
                                            <Space>
                                                {e.department}
                                            </Space>
                                        </Option>
                                    )
                                })
                            }

                        </Select>
                    </Form.Item>


                    <Form.Item
                        label="ID Giáo Viên"
                        name="id_teacher"
                    >
                        <Input value={formDataEdit.id_teacher} onChange={onChanheFormEdit} name="id_teacher" />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                    >
                        <Input value={formDataEdit.name} onChange={onChanheFormEdit} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại liên hệ"
                        name="phone_number"
                    >
                        <Input value={formDataEdit.phone_number} onChange={onChanheFormEdit} name="phone_number" />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh đại diện cũ"
                        name="avatar"
                    >
                        <Image
                            width={100}
                            height={100}
                            src={formDataEdit.avatar}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh đại diện mới"
                        name="avatar"
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileEdit}
                            onPreview={handlePreview}
                            accept=".png,.jpeg"
                            onChange={handleChangeEdit}

                        >
                            {fileEdit.length >= 1 ? null : uploadButton}
                        </Upload>

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


            {/* modal open avatar */}

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>

            {/* end modal */}
        </div>
    );

}

export default TeacherComponent;