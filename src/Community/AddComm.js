import './AddComm.css';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const AddComm = ({ userInfo }) => {
  const navigate = useNavigate();

  const [commInfo, setCommInfo] = useState({
    author: userInfo.username,  // 작성자는 username보다 nickname이 좋아보임
    postname: '',
    categories: '',
    content: ''
  })

  const [selectedColor, setSelectedColor] = useState('#666');
  
  const changeHandler = (e) => {
    setCommInfo({
      ...commInfo,
      [e.target.name] : e.target.value
    })
    const color = e.target.value === '' ? '#666' : '#000000';
    setSelectedColor(color);
  }

  //유효성 검사 후 서버로 보내기
  const handleSubmit = () => {
    if (commInfo.postname === '' || commInfo.categories === '' || commInfo.content === '') {
      alert('제목, 카테고리, 내용은 필수 입력 항목입니다.');
      return;
    }
    axiosInstance.post('/comm_insert', commInfo)
      .then((response) => {
        alert(response.data);
        navigate('/Community');
      }).catch(error => {
        console.log(error);
      })
  }

    console.log(commInfo);

  return(
    <div className='AddComm'>
      <h3 className='title'>글쓰기</h3>
      <div className='content-box'>
        <div className='content-title'>제목</div>
        <input className='content-inner' placeholder="제목을 입력해주세요" name="postname" value={commInfo.postname} onChange={changeHandler} />
      </div>
      <div className='content-box'>
        <div className='content-title'>카테고리</div>
        <select className='content-inner category' name="categories" onChange={changeHandler} style={{ color: selectedColor }}>
          <option defaultValue={''} hidden>카테고리를 선택해주세요</option>
          <option defaultValue={"자유"}>자유</option>
          <option defaultValue={"질문·고민"} >질문·고민</option>
          <option defaultValue={"홍보"} >홍보</option>
          <option defaultValue={"후기"} >후기</option>
        </select>
      </div>
      <div className='content-box'>
        <textarea 
        className='content-inner content'
         placeholder="내용을 입력해주세요"
          name="content" 
          value={commInfo.content} 
          onChange={changeHandler}/>
      </div>
      <div>
        <button className='addBtn' onClick={handleSubmit}>게시글 등록</button>
      </div>
    </div>
  );
}

export default AddComm;