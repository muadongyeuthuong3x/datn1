import React , {useEffect, useState , useMemo} from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { Button, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { apiGetListExamBlock } from "../slices/examBlock";

const { Option } = Select;
const colors = scaleOrdinal(schemeCategory10).range();

const data = [
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
];

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
   
    const [dataSearch , setDataSearch] = useState({
        time_start:'',
        time_end : "",
        id_teacher : ""
    })
     const dispatch = useDispatch();

    useEffect(() => {
        dispatch(apiGetListExamBlock())
    }, [dispatch])

  return (
    <>
    <div className='form_search'>
                {/* <Select
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
                <Button type='primary' onClick={searchData}> Thống kê</Button> */}
            </div>
    <BarChart
    width={1200}
    height={700}
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
    </>
  );
}
export default AppRechaetTeachers;