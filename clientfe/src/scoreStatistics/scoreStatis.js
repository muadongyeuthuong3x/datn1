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
import { apiGetListCountScore, dispatchDefault } from "../slices/scoreStatic";
import { PieChart, Pie, Cell } from "recharts";

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
            "Tổng số sinh viên": 0,
        },
        {
            name: "Khoảng điểm 2",
            "Tổng số sinh viên": 0,
        },
        {
            name: "Khoảng điểm 3",
            "Tổng số sinh viên": 0,
        },
        {
            name: "Khoảng điểm 4",
            "Tổng số sinh viên": 0,
        },
        {
            name: "Khoảng điểm 5",
            "Tổng số sinh viên": 0,
        },
        {
            name: "Khoảng điểm 6",
            "Tổng số sinh viên": 0,
        },
        {
            name: "Khoảng điểm 7",
            "Tổng số sinh viên": 0,
        },
        {
            name: "Khoảng điểm 8",
            "Tổng số sinh viên": 0,
        },
        {
            name: "Khoảng điểm 9",
            "Tổng số sinh viên": 0,
        },
        {
            name: "Khoảng điểm 10",
            "Tổng số sinh viên": 0,
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

    // dataAll,
    // countFail,
    // countSuccess
     useEffect(()=>{
        return () => {
            dispatch(dispatchDefault())
          };
     },[])
    
    useEffect(() => {
    const arrayPush = [];
    for(let i =0  ; i <data.dataAll.length  ; i++){
        if(data.dataAll[i] > 0){
            const objectPush = {
                name: `Khoảng điểm ${i+1}`,
                "Tổng số sinh viên": data.dataAll[i],
            }
            arrayPush.push(objectPush)
        }
      
    }
    setDataTT(arrayPush);
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


    const [data111, setdata111] = useState([
        { name: "Tổng % sinh trượt", value: data.countFail },
        { name: "Tổng % sinh đỗ", value: data.countSuccess },
    ])

    useEffect(() => {
        setdata111([
            { name: "Tổng % sinh trượt", value: data.countFail },
            { name: "Tổng % sinh đỗ", value: data.countSuccess },
        ])
    }, [data])
    const COLORS = ["#FFBB28","#00C49F"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
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

             <div style={{display : "flex"}}> 
                <div>
                    <h2 style={{ fontSize: "30px", marginBottom: "20px" }}> Tổng số sinh viên đạt điểm </h2>
                    <BarChart
                        width={800}
                        height={500}
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
                        <Bar dataKey="Tổng số sinh viên" fill="#0088FE" minPointSize={10}>
                        </Bar>
                    </BarChart>
                </div>
                <div>
                    <h2 style={{ fontSize: "30px", marginBottom: "20px" }}> Tổng số (%) sinh viên đạt và không đạt </h2>
                    <PieChart width={600} height={400}>
                        <Pie
                            data={data111}
                            cx={300}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={160}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data111.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <div style={{ marginLeft: "100px" }}>
                        <span style={{ display: "flex" }}> <div style={{ width: "40px", height: "20px", marginBottom: "20px", marginRight: "20px", background: "#00C49F" }}>  </div>Số (%) sinh viên qua môn </span>
                        <span style={{ display: "flex" }}><div style={{ width: "40px", height: "20px", marginRight: "20px", background: "#FFBB28" }}> </div>Số (%) sinh viên trượt môn</span>
                    </div>
                </div> 
            </div> 
        </div> 

    );
}
