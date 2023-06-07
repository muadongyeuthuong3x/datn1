import React , {useEffect, useState , useMemo} from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { Button, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getYearExam } from "../slices/scheduleTest";
import {findCoundTeacherTrack}  from "../slices/teacher"
import instance from '../configApi/axiosConfig'
import './style.modules.scss'

const { Option } = Select;
const colors = scaleOrdinal(schemeCategory10).range();


const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } 
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const AppRechaetTeachers = () => {
   
  const [data, setData] = useState([
    {
      name: "Page A",
      uv: 3500,
    },
    {
      name: "Page B",
      uv: 3000,
    },
    {
      name: "Page C",
      uv: 2000,
    },
    {
      name: "Page D",
      uv: 2780,
    },
  ])
  const dispatch = useDispatch();

  // const { countTeacherTrack, countTeacherTrackMark } = useSelector(state => state.listTeacher);
  const {listYeart, listMessage} = useSelector(state => state.listSchedule);
  const [teachers , setListTeachers] = useState([]);
  const [countNameTeacherTrack , setcountNameTeacherTrack] = useState(0);
  const [countNameTeacherTrackScore , setcountNameTeacherTrackScore] = useState(0);
  const [countTeacherTrack, setcountTeacherTrack ] = useState(0);
  const [countTeacherTrackMark, setcountTeacherTrackMark ] = useState(0);
  const [nameTeacher , setNameTeacher] = useState("")
    useEffect(() => {
        dispatch(getYearExam())
       
    }, [dispatch])


    useEffect(()=>{
      callApi()
    },[])
  const [form_search , setFormSrearch] = useState({
    time: "",
    id_teacher: ""
  })
  const callApi = async () => {
    const res = await instance.get('/teacher');
    setListTeachers(res.data);
  }

  useEffect(()=>{
    setFormSrearch(prev=>{
      return {
        ...prev,
        time: listYeart[0]
      }
    })
  },[listYeart])
   
    useEffect(()=>{
    dispatch(findCoundTeacherTrack())
    },[dispatch])

    useEffect(()=>{
    setData([
      {
        name: "Tổng số lần coi thi",
        uv: countTeacherTrack,
      },
      {
        name: "Tổng số lần chấm thi",
        uv: countTeacherTrackMark,
      },
      {
        name: `Tổng số lần coi thi của ${nameTeacher.length  > 0 ? nameTeacher : "Cá nhân"}`,
        uv: countNameTeacherTrack,
      },
      {
        name: `Tổng số lần chấm thi của ${nameTeacher.length  > 0 ? nameTeacher : "Cá nhân"}`,
        uv: countNameTeacherTrackScore,
      },
    ])
    },[countTeacherTrack , countTeacherTrackMark, countNameTeacherTrack,countNameTeacherTrackScore,nameTeacher ])
   const onChangeSearch = (e)=>{
    setFormSrearch(prev=>{
      return {
        ...prev,
        id_teacher: e
      }
    })
   }
   const onChangeSearchTime = (e)=>{
 
    setFormSrearch(prev=>{
      return {
        ...prev,
        time: e
      }
    })
   }
  
   
   useEffect(()=>{
    let count1 = 0;
    let count2 = 0;
    const {time } =form_search;
    if(!time){
      return
    }
    const time_start = time.split("-")[0];
    for(let i = 0 ; i <listMessage.length ; i++ ){
      const {time_year_start} = listMessage[i];
      if(time_year_start != time_start){
       continue;
      }
      const dataRooms = listMessage[i].id_testScheduleStudent[0].id_itemRoomExamAndTeacher;
      for(let j = 0 ; j < dataRooms.length ; j++){
        const { id_teacherTrack, id_teacher_mark_exam } = dataRooms[j];
         count1 +=id_teacherTrack.length;
         count2 +=id_teacher_mark_exam.length;
        }
      }

    setcountTeacherTrack(count1);
    setcountTeacherTrackMark(count2);
   },[form_search, listMessage])

   const searchData = ()=>{
    const {time , id_teacher} =form_search;
    const time_start = time.split("-")[0];
    const findDataTeacher = teachers.find(m=>m.id == id_teacher);
    setNameTeacher(findDataTeacher.name)
    let countTeacherMark = 0;
    let countTeacherMarkExamScore = 0;
    for(let i = 0 ; i <listMessage.length ; i++ ){
      const {time_year_start} = listMessage[i];
      if(time_year_start != time_start){
       continue;
      }
      const dataRooms = listMessage[i].id_testScheduleStudent[0].id_itemRoomExamAndTeacher;
      for(let j = 0 ; j < dataRooms.length ; j++){
        const { id_teacherTrack, id_teacher_mark_exam } = dataRooms[j];
        for(let k = 0 ; k < id_teacherTrack.length; k++){
          if(id_teacherTrack[k].id_Teacher.id == id_teacher){
            countTeacherMark++;
            break;
          }
        }
        for(let k = 0 ; k < id_teacher_mark_exam.length; k++){
          if(id_teacher_mark_exam[k].id_teacher_mark_score.id == id_teacher){
            countTeacherMarkExamScore++;
            break;
          }
        }
      }
    }
    setcountNameTeacherTrack(countTeacherMark)
    setcountNameTeacherTrackScore(countTeacherMarkExamScore)
   }
  return (
    <div className="scroll_TT">
    <div className='form_search'>

    <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Chọn giáo viên"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    className="select_time"
                    value={form_search.id_teacher}
                    onChange={onChangeSearch}
                >
                    {
                        teachers.map((e, index) => {
                            return (
                                <Option value={e.id} label={e + "1"} key={index}>
                                    <Space>
                                    {e.name} - {e.id_teacher}
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
                    value={form_search.time}
                    onChange={onChangeSearchTime}
                >
                    {
                        listYeart.map((e, index) => {
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
    width={1300}
    height={600}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar
        dataKey="uv"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
    </div>
  );
}
export default AppRechaetTeachers;