import { useNavigate } from 'react-router-dom';
import './PostComm.css';
import { useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from '../axiosInstance';
import { Quill } from 'react-quill';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

const PostComm = ({ userInfo }) => {

  const navigate = useNavigate();

  const [commInfo, setCommInfo] = useState({
    author: userInfo.username,
    postname: '',
    categories: '',
    content: ''
  })

  const category = ['자유', '질문·고민', '홍보', '후기'];

  const [selectedColor, setSelectedColor] = useState('#666');

  const changeHandler = (e) => {
    setCommInfo({
      ...commInfo,
      [e.target.name]: e.target.value
    })
    const color = e.target.value === '' ? '#666' : '#000000';
    setSelectedColor(color);
  }

  const handleQuillChange = (content, delta, source, editor) => {
    setCommInfo((comm) => ({
    ...comm,
    content: editor.getContents(),
    }));
    };

  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, false] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //     ],
  //     ["link", "image"],
  //     [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
  //     ["clean"],
  //   ],
  // };

  // const formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "indent",
  //   "link",
  //   "image",
  //   "align",
  //   "color",
  //   "background",
  // ];

 

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["link", "image"],
      ["bold", "strike"],
      [{ align: [] }], // dropdown with defaults from theme
    ],
    imageActions: {},
    imageFormats: {},
  };

  const formats = [
    "header",
    "bold",
    "strike",
    "link",
    "image",
    "align",
    'height', 
    'width'
  ];

  console.log(commInfo);

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


  return (
    <div className="PostComm">
      <h3 className='title'>글쓰기</h3>
      <div className='post'>
        <div className='category-postName'>
          <select
            name='categories'
            onChange={changeHandler}
            style={{ color: selectedColor }}>
            <option defaultValue={''} hidden>카테고리</option>
            {
              category.map((data, i) => {
                return (
                  <option
                    key={i}
                    defaultValue={data}>
                    {data}
                  </option>
                )
              })
            }
          </select>
          <input 
          name='postname'
          value={commInfo.postname}
          placeholder='제목을 입력해주세요' 
          onChange={changeHandler} />
        </div>
        <div className='quill'>
          <ReactQuill
            style={{ width: "100%", height: "70vh", border: "none" }}
            theme="snow"
            modules={modules}
            formats={formats}
            name="content"
            value={commInfo.content}
            onChange={handleQuillChange}
            // preserveWhitespace 
          />
        </div>
      </div>
      <button className='submit-comm-btn'
              onClick={handleSubmit}
      >게시글 등록</button>

    </div>
  )
}

export default PostComm;