import { Button, Table, Modal, Input, Form,Select } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListExam, deleteItemExam, createExam, searchDataApi, editDataExamApi } from '../slices/exam'

const ExamComponent = () => {
    const dispatch = useDispatch();
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
            title: 'Edit',
            dataIndex: 'edit',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
        },
    ];


    const { data } = useSelector(state => state.listExam)
    const [listExamState, setListExamState] = useState([])
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [idDelete, setIdDelete] = useState(-1);
    const [formExamCreate, setFromCreateSearch] = useState({
        name: '',
    });
    const [nameSearch, setNameSearch] = useState('');
    const [formDataEdit, setFormDataEdit] = useState({
        name: '',
        id: ''
    });
    useEffect(() => {
        dispatch(apiGetListExam())
    }, [dispatch])
    useEffect(() => {
        if (data.length > 0) {
            let dataList = [];
            data.forEach((item, i) => {
                dataList.push({
                    key: i,
                    index: i,
                    name: item?.name,
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
        dispatch(deleteItemExam(idDelete))
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
        dispatch(createExam(formExamCreate))
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
        const { name, id } = data
        setFormDataEdit({
            name: name,
            id: id
        })
    };

    const handleOkEdit = () => {
        dispatch(editDataExamApi(formDataEdit))
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
                <Button type='primary' onClick={showModalCreate}>Tạo Môn Thi</Button>
                <Input placeholder='Search name' className='input_search' onChange={e => setNameSearch(e.target.value)} />
                <Button type='primary' onClick={searchData}> Tìm kiếm </Button>
            </div>

            <Table columns={columns} dataSource={listExamState} />

            {/* Modal delete */}
            <Modal title="Delete Khối" open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}>
                <p> Bạn chắc chắn xóa dữ liệu này chứ </p>
            </Modal>
            {/* End Modal delete */}


            {/* Modal Create */}
            <Modal title="Tạo Môn Thi" open={isModalOpenCreate} footer={null}>

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
                            value: formExamCreate.name,
                        },
                    ]}

                >
                    <Form.Item
                        label="Name"
                        name="name"
                    >
                        <Input value={formExamCreate.name} onChange={onChanheFormCreate} name="name" />
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
                            name: ["name"],
                            value: formDataEdit.name,
                        },
                    ]}

                >


                    <Form.Item
                        label="Name"
                        name="name"
                    >
                        <Input onChange={onChanheFormEdit} name="name" />
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

export default ExamComponent;