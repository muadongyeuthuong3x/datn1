import { Button, Table, Space, Select, Upload, message, Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListExamBlock, searchDataApi } from "../slices/examBlock";
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Dragger } = Upload;


const StudentComponent = () => {

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [formSearch, setFormSearch] = useState({
        id_exam_where: '',
        time_year_start: '',
        time_year_end: ''
    });
    const [isShowModalOpenBetween, setIsShowModalOpenBetween] = useState(false);
    const [isShowModalOpenEnd, setIsShowModalOpenEnd] = useState(false)
    const [isShowModalOpenEndEnd, setIsShowModalOpenEndEnd] = useState(false)

    const [formCreateBetween, setFormCreateBetween] = useState({
        id_exam: '',
        time_year_end: '',
        time_year_start: '',
        file: [],
        name: ''
    })

    const [formCreateEnd, setFormCreateEnd] = useState({
        id_exam: '',
        time_year_end: '',
        time_year_start: '',
        file: [],
        name: ''
    })


    const [formCreateEndEnd, setFormCreateEndEnd] = useState({
        id_exam: '',
        time_year_end: '',
        time_year_start: '',
        file: [],
        name: ''
    })

    const { listDataExamBigClass, dataOldSearchView } = useSelector(state => state.listExamBlock);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(apiGetListExamBlock())
    }, [dispatch])



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

    const dataTableMemo = useMemo(() => {
        const dataFormat = [
            {
                title: 'Môn thi',
                dataIndex: 'id_exam',
                key: 'id_exam',
                render: (item) => <div value={item.id}>
                    {item.name}</div>,
            },
            {
                title: 'Năm học thi',
                dataIndex: 'time',
                key: 'time',
                render: (item) => <div value={item.id} >{item.time_year_start + `-` + item.time_year_end}</div>,
            },
            {
                title: 'Khối Thi',
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
                title: 'Lên điểm giữa kì',
                dataIndex: 'button_between',
                key: 'button_between',
                render: (item) => <Button type='primary' onClick={() => {
                    setIsShowModalOpenBetween(true)
                    const objectCreate = {
                        id_exam: item.id,
                        time_year_end: item.time_year_end,
                        time_year_start: item.time_year_start,
                        file: [],
                        name: item.name,
                    }
                    setFormCreateBetween(objectCreate)
                }}
                >Upload điểm thi giữa kì</Button>,
            },
            {
                title: 'Lên điểm cuối kì',
                dataIndex: 'button_end',
                key: 'button_end',
                render: (item) => <Button type='primary' >Upload điểm thi cuối kì</Button>,
            },
            {
                title: 'Lên điểm cuối kì thi lại',
                dataIndex: 'button_end_end',
                key: 'button_end_end',
                render: (item) => <Button type='primary' >Upload điểm thi lại</Button>,
            },
        ]
        return dataFormat;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listDataExamBigClass]);


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
                button_between: {
                    id: e.id,
                    name: e.id_exam.name,
                    time_year_start: e.time_year_start,
                    time_year_end: e.time_year_end,
                },
                button_end: {
                    id: e.id,
                    name: e.id_exam.name,
                    time_year_start: e.time_year_start,
                    time_year_end: e.time_year_end,
                },
                button_end_end: {
                    id: e.id,
                    name: e.id_exam.name,
                    time_year_start: e.time_year_start,
                    time_year_end: e.time_year_end,
                },
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


    const searchData = () => {
        dispatch(searchDataApi(formSearch))
    }


    const props = {
        name: 'file',
        multiple: true,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    const createFileBetween = () => {

    }

    return (
        <div>
            <div className='form_search'>
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Chọn Môn Thi"
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
                    placeholder="Năm học"
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
                <Button type='primary' onClick={searchData}> Tìm kiếm </Button>
            </div>

            <div className='container'>
                <Table dataSource={dataSources} columns={dataTableMemo} />
            </div>

            {/* multi  upload file */}
            <Modal title={`Upload điểm giữa kì năm học ${formCreateBetween.time_year_start} - ${formCreateBetween.time_year_end}`} open={isShowModalOpenBetween} onOk={createFileBetween}
                onCancel={() => {
                    setFormCreateBetween({
                        id_exam: '',
                        time_year_end: '',
                        time_year_start: '',
                        file: [],
                        name: ''
                    })
                    setIsShowModalOpenBetween(false);
                }
                }>

                <div style={{ marginBottom: "20px" }}> Môn thi : {formCreateBetween.name}  </div>
                <Dragger {...props} accept=".csv">
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Upload file điểm</p>
                    <p className="ant-upload-hint">
                        File hỗ trợ .xlsx , csv
                    </p>
                </Dragger>
            </Modal>


            {/* multi  upload file end */}
            <Modal title={`Upload điểm thi cuối năm học ${formCreateEnd.time_year_start} - ${formCreateEnd.time_year_end}`} open={isShowModalOpenEnd} onOk={createFileBetween}
                onCancel={() => {
                    setFormCreateBetween({
                        id_exam: '',
                        time_year_end: '',
                        time_year_start: '',
                        file: [],
                        name: ''
                    })
                    setIsShowModalOpenEnd(false);
                }
                }>

                <div style={{ marginBottom: "20px" }}> Môn thi : {formCreateEnd.name}  </div>
                <Dragger {...props} accept=".csv" >
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Upload file điểm</p>
                    <p className="ant-upload-hint">
                        File hỗ trợ .xlsx , csv
                    </p>
                </Dragger>
            </Modal>




            {/* multi  upload file */}
            <Modal title={`Upload điểm thi lại năm học ${formCreateEndEnd.time_year_start} - ${formCreateEndEnd.time_year_end}`} open={isShowModalOpenEndEnd} onOk={createFileBetween}
                onCancel={() => {
                    setFormCreateEndEnd({
                        id_exam: '',
                        time_year_end: '',
                        time_year_start: '',
                        file: [],
                        name: ''
                    })
                    isShowModalOpenEndEnd(false);
                }
                }>

                <div style={{ marginBottom: "20px" }}> Môn thi : {formCreateEndEnd.name}  </div>
                <Dragger {...props} beforeUpload={() => {
                    /* update state here */
                    return false;
                }}>
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Upload file điểm</p>
                    <p className="ant-upload-hint">
                        File hỗ trợ .xlsx , csv
                    </p>
                </Dragger>
            </Modal>

        </div>
    )
}

export default StudentComponent