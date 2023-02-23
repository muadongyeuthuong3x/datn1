
import { useEffect, useMemo, useState } from 'react';
import { Button, Table, Modal, Input, Form, Radio, DatePicker, Space, Select, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListExamBlock, createExamBlock } from "../slices/examBlock"
const { Option } = Select;
const { Column } = Table;
const searchData = () => {

}


const ExamBlockComponent = () => {

    const { bigClass, exams, listDataExamBigClass } = useSelector(state => state.listExamBlock);
    const dispatch = useDispatch();
    const year = new Date().getFullYear();
    const [isModalOpenCreate, setShowModalCreate] = useState(false);
    const [nameSearch, setNameSearch] = useState('');
    const [formCreate, setFormCreate] = useState({
        id_big_class_exam: [],
        id_exam: '',
        time_year_start: year,
        time_year_end: year + 1
    })

    useEffect(() => {
        dispatch(apiGetListExamBlock())
    }, [])

    // create
    const showModalCreate = () => {
        setShowModalCreate(true)
    }

    const onChanheFormCreate = () => {

    }

    const handleCancelCreate = () => {
        setShowModalCreate(false)
    }


    const handleOkCreate = () => {
        dispatch(createExamBlock(formCreate))
    }

    const handleChangeExam = (e) => {
        setFormCreate(prev => {
            return {
                ...prev,
                "id_exam": e
            }
        })
    }

    const fetchDataBigClassExam = (data) => {
        const result = [];
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

    const dataTableMemo = useMemo(() => {

        const data = [];
        listDataExamBigClass.map(e => {
            data.push({
                time: {
                    id: e.id,
                    time_year_start: e.time_year_start,
                    time_year_end: e.time_year_end,
                },
                id_big_class_exam: fetchDataBigClassExam(e.id_big_class_exam),
                id_exam: [{
                    id: e.id_exam.id,
                    name: e.id_exam.name
                }]

            })
        })
        return data;
    }, [listDataExamBigClass]);

    console.log(5551, dataTableMemo);


    const handleChangeBlockClass = (e) => {
        setFormCreate(prev => {
            return {
                ...prev,
                "id_big_class_exam": e
            }
        })
    }


    return <div>
        <div className='form_search'>
            <Button type='primary' onClick={showModalCreate}>Tạo Môn Thi Năm Học {year} - {year + 1}</Button>
            <Input placeholder='Search name' className='input_search' onChange={e => setNameSearch(e.target.value)} />
            <Button type='primary' onClick={searchData}> Tìm kiếm </Button>
        </div>

        <div className='container'>
            <Table dataSource={listDataExamBigClass}>
                <Column title="Tên môn thi" dataIndex="id_exam" key="id_exam" render={(item) => (
                    <>
                        
                        {
                         
                          
                                <div color="blue" key={item.id}>
                                    {item.name}
                                </div>
                            
                        }
                    </>
                )} />
                <Column title="Năm Học" dataIndex="time" key="time" />
                <Column title="Khóa Thi" dataIndex='id_big_class_exam' key="id_big_class_exam" />
            </Table>


        </div>

        {/* Modal Create */}
        <Modal title={`Tạo Môn Thi Năm Học ${year} - ${year + 1}`} open={isModalOpenCreate} footer={null}>

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
                    label="Môn học"
                    name="id_exam"
                >

                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Chọn Môn"
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
                    label="Các khối tham gia thi"
                    name="id_big_class_exam"
                >
                    <Select
                        showSearch
                        mode="multiple"
                        style={{ width: '100%' }}
                        name="id_big_class_exam"
                        placeholder="Chọn Khối Thi"
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


    </div>
}

export default ExamBlockComponent