
import { useEffect, useMemo, useState } from 'react';
import { Button, Table, Modal, Form, Space, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListExamBlock, createExamBlock, deleteItemExamBlock, searchDataApi, editDataExamBlockApi } from "../slices/examBlock";
import './exam.modules.scss'
const { Option } = Select;



const ExamBlockComponent = () => {

    const { bigClass, exams, listDataExamBigClass, dataOldSearchView } = useSelector(state => state.listExamBlock);
    const dispatch = useDispatch();
    const yearCheck = new Date().getFullYear();
    const monthCheck = new Date().getMonth();
    const year = monthCheck > 6 ? yearCheck : yearCheck - 1;
    const [isModalOpenCreate, setShowModalCreate] = useState(false);
    const [isModalOpenDelete, setShowModalDelete] = useState(false);
    const [callRefesh, setCallRefesh] = useState(false);
    const [isModalOpenEdit, setShowModalEdit] = useState(false);
    const [formCreate, setFormCreate] = useState({
        id_big_class_exam: [],
        id_exam: '',
        time_year_start: year,
        time_year_end: year + 1
    });

    const [idDelete, setIdDelete] = useState()

    const [formSearch, setFormSearch] = useState({
        id_exam_where: '',
        time_year_start: '',
        time_year_end: ''
    })

    const [formEdit, setFormEdit] = useState({
        id_big_class_exam: [],
        id_exam: '',
        time_year_start: '',
        time_year_end: '',
        id: ''
    })
    useEffect(() => {
        dispatch(apiGetListExamBlock())
    }, [dispatch, callRefesh])

    // create
    const showModalCreate = () => {
        setShowModalCreate(true)
    }


    const handleCancelCreate = () => {
        setShowModalCreate(false)
    }


    const handleOkCreate = () => {
        dispatch(createExamBlock(formCreate))
        setShowModalCreate(false)
        setCallRefesh(!callRefesh)
    }

    const handleChangeExam = (e) => {
        setFormCreate(prev => {
            return {
                ...prev,
                "id_exam": e
            }
        })
    }

    const handleChangeExamEdit = (e) => {
        setFormEdit(prev => {
            return {
                ...prev,
                "id_exam": e
            }
        })
    }

    const fetchDataBigClassExam = (data) => {
        const result = [];
        // eslint-disable-next-line array-callback-return
        data.map(e => {
            const { id, id_big_class_exam } = e
            result.push({
                id: id,
                id_big_class_exam: id_big_class_exam.bigBlockClass,
                idClass: id_big_class_exam.id,
            })
        })
        return data
    }

    const deleteExamBlock = (id) => {
        setIdDelete(id)
        setShowModalDelete(true)
        setCallRefesh(!callRefesh)
    }

    const getArrayIdBigClass = (data) => {
        const array = [];
        data.map(e => {
            console.log(e)
            return array.push(e.id_big_class_exam.id);
        })
        return array;
    }

    const editExamBlock = (idEdit) => {
        const dataEdit = listDataExamBigClass.find(item => item.id === idEdit);
        const { time_year_start, time_year_end } = dataEdit;
        const data = getArrayIdBigClass(dataEdit.id_big_class_exam);
        setFormEdit(prev => {
            return {
                ...prev,
                id: idEdit,
                time_year_start: time_year_start,
                time_year_end: time_year_end,
                id_exam: dataEdit.id_exam.id,
                id_big_class_exam: data,
            }
        })
        setShowModalEdit(true)
    }
    const dataTableMemo = useMemo(() => {
        const dataFormat = [
            {
                title: 'M??n thi',
                dataIndex: 'id_exam',
                key: 'id_exam',
                render: (item) => <div value={item.id}>
                    {item.name}</div>,
            },
            {
                title: 'N??m h???c thi',
                dataIndex: 'time',
                key: 'time',
                render: (item) => <div value={item.id} >{item.time_year_start + `-` + item.time_year_end}</div>,
            },
            {
                title: 'Kh???i Thi',
                dataIndex: 'id_big_class_exam',
                key: 'id_big_class_exam',
                render: (list) => {
                    return list.map((e, index) => {
                        return (
                            <span key={e.id}>
                                <span >  {e.id_big_class_exam.bigBlockClass}
                                    {

                                        list.length !== index + 1 ? ',' : ''
                                    }
                                </span>
                            </span>
                        )
                    })


                },
            },
            {
                title: 'Edit',
                dataIndex: 'button_edit',
                key: 'button_edit',
                render: (item) => <Button type='primary' onClick={() => editExamBlock(item)}>Edit</Button>,
            },
            {
                title: 'Delete',
                dataIndex: 'button_delete',
                key: 'button_delete',
                render: (item) => <Button danger onClick={() => deleteExamBlock(item)}>X??a</Button>,
            },

        ]
        return dataFormat;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listDataExamBigClass]);

    const dataSources = useMemo(() => {
        const data = [];
        // eslint-disable-next-line array-callback-return
        listDataExamBigClass.map((e, index) => {
            data.push({
                key: index,
                time: {
                    id: e.id,
                    time_year_start: e.time_year_start,
                    time_year_end: e.time_year_end,
                },
                id_big_class_exam: fetchDataBigClassExam(e.id_big_class_exam),
                id_exam: {
                    id: e.id_exam.id,
                    name: e.id_exam.name
                },
                button_delete: e.id,
                button_edit: e.id
            })
        });
        return data;
    }, [listDataExamBigClass]);


    const listTimeSelect = useMemo(() => {
        const data = [];
        // eslint-disable-next-line array-callback-return
        dataOldSearchView.map((e) => {
            const timeConcat = e.time_year_start + "-" + e.time_year_end;
            if (!data.includes(timeConcat)) {
                data.push(timeConcat)
            }
        })
        return data;
    }, [dataOldSearchView])

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




    const handleChangeBlockClass = (e) => {
        setFormCreate(prev => {
            return {
                ...prev,
                "id_big_class_exam": e
            }
        })
    }

    const handleChangeBlockClassEdit = (e) => {
        setFormEdit(prev => {
            return {
                ...prev,
                "id_big_class_exam": e
            }
        })
    }


    const onChangeSearchExam = (e) => {
        setFormSearch(prev => {
            return {
                ...prev,
                "id_exam_where": e
            }
        })
    }

    const onChangeSearchYear = (e) => {
        const [time_start, time_end] = e.split('-');
        setFormSearch(prev => {
            return {
                ...prev,
                "time_year_start": time_start,
                "time_year_end": time_end,
            }
        })
    }

    const searchData = () => {
        dispatch(searchDataApi(formSearch))
    }

    // delete data 


    const handleOkDelete = () => {
        dispatch(deleteItemExamBlock(idDelete))
        setShowModalDelete(false)
    }

    const handleCancelDelete = () => {
        setShowModalDelete(false)
    }


    // edit tt

    const handleCancelEdit = () => {
        setShowModalEdit(false)
    }

    const handleOkEdit = () => {
        dispatch(editDataExamBlockApi(formEdit))
        setShowModalEdit(false)
        setCallRefesh(!callRefesh)
    }
    return <div>
        <div className='form_search'>
            <Button type='primary' onClick={showModalCreate}>T???o M??n Thi N??m H???c {year} - {year + 1}</Button>

            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Ch???n M??n Thi"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={onChangeSearchExam}
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


            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="N??m h???c"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                className="select_time"
                onChange={onChangeSearchYear}
            >
                {
                    listTimeSelect.map((e, index) => {
                        return (
                            <Option value={e} label={e + "1"} key={index}>
                                <Space>
                                    {e}
                                </Space>
                            </Option>
                        )
                    })
                }
            </Select>


            <Button type='primary' onClick={searchData}> T??m ki???m </Button>

        </div>

        <div className='container'>
            <Table dataSource={dataSources} columns={dataTableMemo} />
        </div>

        {/* Modal Create */}
        <Modal title={`T???o M??n Thi N??m H???c ${year} - ${year + 1}`} open={isModalOpenCreate} footer={null}>

            <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 500 }}
                layout="vertical"
                autoComplete="off"
                fields={[
                    {
                        name: ["id_exam"],
                        value: formCreate.id_exam,
                    },
                    {
                        name: ["id_big_class_exam"],
                        value: formCreate.id_big_class_exam,
                    },
                ]}

            >
                <Form.Item
                    label="M??n h???c"
                    name="id_exam"
                >

                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Ch???n M??n"
                        value={formCreate.id_exam}
                        optionLabelProp="label"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={handleChangeExam}
                    >
                        {
                            exams.map(e => {
                                return (

                                    <Option value={e.id} label={e.name} key={e.id}>
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
                    label="C??c kh???i tham gia thi"
                    name="id_big_class_exam"
                >
                    <Select
                        showSearch
                        mode="multiple"
                        style={{ width: '100%' }}
                        name="id_big_class_exam"
                        placeholder="Ch???n Kh???i Thi"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={handleChangeBlockClass}
                    >
                        {
                            bigClass.map(e => {
                                return (
                                    <Option value={e.id} label={e.bigBlockClass} key={e.id}>
                                        <Space>
                                            {e.bigBlockClass}
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

        {/* Modal delete */}
        <Modal title="Delete Kh???i" open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}>
            <p> B???n ch???c ch???n x??a d??? li???u n??y ch??? </p>
        </Modal>
        {/* End Modal delete */}


        {/* Modal Edit */}
        <Modal title={`S???a M??n Thi N??m H???c ${formEdit.time_year_start} - ${formEdit.time_year_end}`} open={isModalOpenEdit} footer={null}>

            <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 500 }}
                layout="vertical"
                autoComplete="off"
                fields={[
                    {
                        name: ["id_exam"],
                        value: formEdit.id_exam,
                    },
                    {
                        name: ["id_big_class_exam"],
                        value: formEdit.id_big_class_exam,
                    },
                ]}

            >
                <Form.Item
                    label="M??n h???c"
                    name="id_exam"
                >
                    {
                        console.log(formEdit.id_big_class_exam)
                    }
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Ch???n M??n"
                        value={formEdit.id_exam}
                        optionLabelProp="label"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={handleChangeExamEdit}
                    >
                        {
                            exams.map(e => {
                                return (

                                    <Option value={e.id} label={e.name} key={e.id}>
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
                    label="C??c kh???i tham gia thi"
                    name="id_big_class_exam"
                >
                    <Select
                        showSearch
                        mode="multiple"
                        style={{ width: '100%' }}
                        value={formEdit.id_big_class_exam}
                        name="id_big_class_exam"
                        placeholder="Ch???n Kh???i Thi"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={handleChangeBlockClassEdit}
                    >
                        {
                            bigClass.map(e => {
                                return (
                                    <Option value={e.id} label={e.bigBlockClass} key={e.id}>
                                        <Space>
                                            {e.bigBlockClass}
                                        </Space>
                                    </Option>
                                )
                            })
                        }

                    </Select>
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
}

export default ExamBlockComponent