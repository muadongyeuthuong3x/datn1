import React, { useState, useEffect, useMemo } from "react";
import { Button, Select, Space } from 'antd';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListExamBlock } from "../slices/examBlock";
import { apiGetListCountScore } from "../slices/scoreStatic";

const { Option } = Select;




export default function ScoreStatis() {
    const [dataSearch, setDataSearch] = useState({
        id_exam_where: '',
        time_start: '',
        time_end: '',
        time_start_two: '',
        time_year_two: ''
    });
    const [dataTT, setDataTT] = useState([
        {
            name: "Khoảng điểm 1",
            Total: 0,
        },
        {
            name: "Khoảng điểm 2",
            Total: 0,
        },
        {
            name: "Khoảng điểm 3",
            Total: 0,
        },
        {
            name: "Khoảng điểm 4",
            Total: 0,
        },
        {
            name: "Khoảng điểm 5",
            Total: 0,
        },
        {
            name: "Khoảng điểm 6",
            Total: 0,
        },
        {
            name: "Khoảng điểm 7",
            Total: 0,
        },
        {
            name: "Khoảng điểm 8",
            Total: 0,
        },
        {
            name: "Khoảng điểm 9",
            Total: 0,
        },
        {
            name: "Khoảng điểm 10",
            Total: 0,
        },
    ]);
    const { data } = useSelector(state => state.ttScoreStudent);
        const { dataOldSearchView } = useSelector(state => state.listExamBlock);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(apiGetListExamBlock())
    }, [dispatch])
    const onChangeSearchYear = (e) => {
        const [time_start, time_end] = e.split('-');
        setDataSearch(prev => {
            return {
                ...prev,
                "time_start": time_start,
                "time_end": time_end,
            }
        })
    }

    useEffect(() => {
    const dataOld =[...dataTT];
    for(let i =0  ; i <data.length  ; i++){
        dataOld[i].Total = data[i]
    }
    setDataTT(dataOld);
    },[data])

    const onChangeSearchExam = (e) => {
        setDataSearch(prev => {
            return {
                ...prev,
                "id_exam_where": e
            }
        })
    }
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

    const searchData = () => {
        dispatch(apiGetListCountScore(dataSearch))
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
                <Button type='primary' onClick={searchData}> Thống kê</Button>
            </div>

            <BarChart
                
                width={1200}
                height={700}
                data={dataTT}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total" fill="#8884d8" minPointSize={10}>
                </Bar>
            </BarChart>
        </div>

    );
}
