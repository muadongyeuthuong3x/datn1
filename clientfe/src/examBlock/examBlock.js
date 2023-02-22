
import { useEffect, useState } from 'react';
import { Button, Table, Modal, Input, Form, Radio, DatePicker, Space, Select, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListExamBlock ,createExamBlock } from "../slices/examBlock"
const { Option } = Select
const searchData = () => {

}


const ExamBlockComponent = () => {

    const { bigClass, exams } = useSelector(state => state.listExamBlock);
    const dispatch = useDispatch();
    const year = new Date().getFullYear();
    const [isModalOpenCreate, setShowModalCreate] = useState(false);
    const [nameSearch, setNameSearch] = useState('');
    const [formCreate, setFormCreate] = useState({
        id_big_block_class : [],
        id_exam : '',
        time_year_start : year,
        time_year_end : year+1
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

    

    const handleChangeBlockClass = (e) => {
        setFormCreate(prev => {
            return {
                ...prev,
                "id_big_block_class": e
            }
        })
    }


    return <div>
        <div className='form_search'>
            <Button type='primary' onClick={showModalCreate}>Tạo Môn Thi Năm Học {year} - {year + 1}</Button>
            <Input placeholder='Search name' className='input_search' onChange={e => setNameSearch(e.target.value)} />
            <Button type='primary' onClick={searchData}> Tìm kiếm </Button>
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
                    name: ["id_big_block_class"],
                    value: formCreate.id_big_block_class,
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
                    name="id_big_block_class"
                >
                    <Select
                        showSearch
                        mode="multiple"
                        style={{ width: '100%' }}
                        name="id_big_block_class"
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