import { Button, Table, Modal, Input, Form, Radio, DatePicker, Space, Select, Image } from 'antd';
import { useState } from 'react';



const StudentComponent = () =>{

    const [showModalCreate  , setShowModalCreate] = useState(false);
    const [nameSearch,setNameSearch] = useState('')




    const searchData = () =>{

    }
    return (
        <div>
             <div className='form_search'>
                <Button type='primary' onClick={showModalCreate}>Tạo Điểm Thi Môn</Button>
                <Input placeholder='Search name' className='input_search' onChange={e => setNameSearch(e.target.value)} />
                <Button type='primary' onClick={searchData}> Tìm kiếm </Button>
            </div>
        </div>
    )
}

export default StudentComponent