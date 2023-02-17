import { Button, Table, Modal, Input, Form, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListUsers, deleteItemUser ,createUser , searchDataApi} from '../slices/users'
import './user.modules.scss';
const UsersComponent = () => {
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
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

    const { data } = useSelector(state => state.listUsers)
    const [listUserState, setListUserState] = useState([])
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [idDelete, setIdDelete] = useState(-1);
    const [formUserCreate, setFromCreateSearch] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    })
    const [emailSearch , setEmailSearch] = useState('')
    useEffect(() => {
        dispatch(apiGetListUsers())
    }, [dispatch])
    useEffect(() => {
        if (data.length > 0) {
            let dataList = [];
            data.forEach((item, i) => {
                dataList.push({
                    key: i,
                    name: item?.name,
                    email: item?.email,
                    role: item?.role,
                    edit: <Button type='primary'>Edit</Button>,
                    delete: <Button type='primary' danger onClick={() => showModalDelete(item?.id)}>Delete</Button>
                });
            })
            setListUserState(dataList)
        } else {
            setListUserState([])
        }
    }, [data])


    const showModalDelete = (id) => {
        setIdDelete(id)
        setIsModalOpenDelete(true);
    };

    const handleOkDelete = () => {
        dispatch(deleteItemUser(idDelete))
        setIsModalOpenDelete(false);
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    // hande create


    const showModalCreate = () => {
        setIsModalOpenCreate(true);
    };

    const handleOkCreate = () => {
        dispatch(createUser(formUserCreate))
        setIsModalOpenCreate(false);
    };

    const handleCancelCreate = () => {
        setIsModalOpenCreate(false);
    };

    const onChanheFormCreate = (e) => {
        setFromCreateSearch(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value

            }
        })
    }

    const handleChangeCreateRole = (value) => {
        setFromCreateSearch(prev => {
            return {
                ...prev,
                role: value

            }
        })
    };

    // search Data

    const searchData = () => {
        dispatch(searchDataApi(emailSearch))
    };


    return (
        <div>
            <div className='form_search'>
                <Button type='primary' onClick={showModalCreate}>Tạo user</Button>
                <Input placeholder='Search email' className='input_search' onChange={e=>setEmailSearch(e.target.value)} />
                <Button type='primary' onClick={searchData}> Tìm kiếm </Button>
            </div>
            <Table columns={columns} dataSource={listUserState} />

            {/* Modal delete */}
            <Modal title="Delete user" open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}>
                <p> Bạn chắc chắn xóa dữ liệu này chứ </p>
            </Modal>
            {/* End Modal delete */}


            {/* Modal Create */}
            <Modal title="Tạo user" open={isModalOpenCreate} footer={null}>

                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 500 }}
                    layout="vertical"
                    autoComplete="off"
                    fields={[
                        {
                          name: ["role"],
                          value:formUserCreate.role,
                        },
                      ]}
                    
                >
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input value={formUserCreate.email} onChange={onChanheFormCreate} name="email"/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                    >
                        <Input.Password value={formUserCreate.password} onChange={onChanheFormCreate} name="password"/>
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                    >
                        <Input value={formUserCreate.name} onChange={onChanheFormCreate} name="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Quyền hệ thống"
                        name="role"
                    >
                        <Select
                            className="select_role"
                            value={formUserCreate.role}
                            name="role"
                            onChange={handleChangeCreateRole}
                            options={[
                                { value: 'admin', label: 'admin' },
                                { value: 'user', label: 'user' },
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


        </div>
    );

}

export default UsersComponent;