import { Button, Table, Modal, Input, Form, } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListSubject, deleteItemSubject, createSubject, searchDataApi, editDataSubjectApi } from '../slices/subject'

const SubjectComponent = () => {
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Index',
            dataIndex: 'index',
        },
        {
            title: 'Tên',
            dataIndex: 'bigBlockClass',
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
    

    const { data } = useSelector(state => state.listSubjects)
    const [listSubjectState, setListSubjectState] = useState([])
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [idDelete, setIdDelete] = useState(-1);
    const [formSubjectCreate, setFromCreateSearch] = useState({
        bigBlockClass: '',
    });
    const [nameSearch, setNameSearch] = useState('');
    const [formDataEdit, setFormDataEdit] = useState({
        bigBlockClass: '',
        id :''
    });
    useEffect(() => {
        dispatch(apiGetListSubject())
    }, [dispatch])
    useEffect(() => {
        if (data.length > 0) {
            let dataList = [];
            data.forEach((item, i) => {
                dataList.push({
                    key: i,
                    index : i,
                    bigBlockClass: item?.bigBlockClass,
                    edit: <Button type='primary' onClick={() => showModalEdit(item)}>Edit</Button>,
                    delete: <Button type='primary' danger onClick={() => showModalDelete(item?.id)}>Delete</Button>
                });
            })
            setListSubjectState(dataList)
        } else {
            setListSubjectState([])
        }
    }, [data])


    const showModalDelete = (id) => {
        setIdDelete(id)
        setIsModalOpenDelete(true);
    };

    const handleOkDelete = () => {
        dispatch(deleteItemSubject(idDelete))
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
        dispatch(createSubject(formSubjectCreate))
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



    // search Data

    const searchData = () => {
        dispatch(searchDataApi(nameSearch))
    };

    // edit data


    const showModalEdit = (data) => {
        setIsModalOpenEdit(true);
        const { bigBlockClass , id} = data
        setFormDataEdit({
            bigBlockClass: bigBlockClass,
            id: id
        })
    };

    const handleOkEdit = () => {
        dispatch(editDataSubjectApi(formDataEdit))
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
                <Button type='primary' onClick={showModalCreate}>Tạo Khối</Button>
                <Input placeholder='Search name' className='input_search' onChange={e => setNameSearch(e.target.value)} />
                <Button type='primary' onClick={searchData}> Tìm kiếm </Button>
            </div>
         
            <Table columns={columns} dataSource={listSubjectState} />

            {/* Modal delete */}
            <Modal title="Delete Khối" open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}>
                <p> Bạn chắc chắn xóa dữ liệu này chứ </p>
            </Modal>
            {/* End Modal delete */}


            {/* Modal Create */}
            <Modal title="Tạo Khối" open={isModalOpenCreate} footer={null}>

                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 500 }}
                    layout="vertical"
                    autoComplete="off"
                    fields={[
                        {
                            name: ["bigBlockClass"],
                            value: formSubjectCreate.bigBlockClass,
                        },
                    ]}

                >
                    <Form.Item
                        label="Name"
                        name="bigBlockClass"
                    >
                        <Input value={formSubjectCreate.bigBlockClass} onChange={onChanheFormCreate} name="bigBlockClass" />
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
            <Modal title="Edit khối" open={isModalOpenEdit} footer={null}>

                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 500 }}
                    layout="vertical"
                    autoComplete="off"
                    fields={[
                        {
                            name: ["bigBlockClass"],
                            value: formDataEdit.bigBlockClass,
                        },
                    ]}

                >
                

                    <Form.Item
                        label="Name"
                        name="bigBlockClass"
                    >
                        <Input onChange={onChanheFormEdit} name="bigBlockClass" />
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



        </div>
    );

}

export default SubjectComponent;