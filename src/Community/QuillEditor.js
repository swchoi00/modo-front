import React, { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import axiosInstance from '../axiosInstance';
import { RangeStatic } from 'quill';
import loadingGif from "../Img/loading.gif";
import 'react-quill/dist/quill.snow.css';
// import { ImageActions } from '@xeger/quill-image-actions';
// import { ImageFormats } from '@xeger/quill-image-formats';
// Quill.register('modules/imageActions', ImageActions);
// Quill.register('modules/imageFormats', ImageFormats);


export default function QuillEditor({ commInfo, setCommInfo, update, updatecomm, setUpdateComm }) {

  const quillRef = useRef(null);

  const handleQuillChange = (content) => {
    if (update) {
      setUpdateComm((comm) => ({
        ...comm,
        content 
      }))
    }
    else {
      setCommInfo((comm) => ({
        ...comm,
        content
      }));
    }
  };

  const handleQuillChange2 = (content, delta, source, editor) => {
    if (update) {
      setUpdateComm((comm) => ({
        ...comm,
        content: editor.getContents(),
      }))
    }
    else {
    setCommInfo((comm) => ({
    ...comm,
    content: editor.getContents(),
    }));
    };
  }

  const imageHandler = (quillRef) => {
    console.log('에디터에서 이미지 버튼을 클릭하면 imageHandler 핸들러가 시작!');
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    const formData = new FormData();

    input.addEventListener('change', async () => {
      console.log("⭐⭐⭐⭐");
      const file = input.files[0];
      formData.append('img', file);

      const quillEditor = quillRef.current.getEditor();

      // 현재 커서 위치 저장
      const range = quillEditor.getSelection(true);

      // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
      quillEditor.insertEmbed(range.index, "image", loadingGif);
      try {
        // 서버에 이미지 업로드
        // formData.append('img', file);
        const response = await axiosInstance.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // url 반환받음
        const imageUrl = response.data;
        const range = quillEditor.getSelection();
        // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
        quillEditor.deleteText(range.index, 1);
        // 받아온 url을 이미지 태그에 삽입
        quillEditor.insertEmbed(range.index, 'image', imageUrl);
        // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
        quillEditor.setSelection(range.index + 1);
      } catch (error) {
        quillEditor.deleteText(range.index, 1);
        console.error('Image upload failed:', error);
      }
    });
  };




  // 메모를 쓰니까 이미지 리사이즈가 안됨, 근데 useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됨
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['link', 'image'],
        ['bold', 'strike'],
        [{ align: [] }],
      ],
      // imageActions: {},
      // imageFormats: {},
      handlers: {
        image: () => imageHandler(quillRef),
      },
    }
  }), []);

  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, 4, 5, false] }],
  //     ["link", "image"],
  //     ["bold", "strike"],
  //     [{ align: [] }], // dropdown with defaults from theme
  //   ],
  //   // imageActions: {},
  //   // imageFormats: {},
  //   handlers: {
  //            image: () => imageHandler(quillRef),
  //         },
  // };

  const formats = [
    'header',
    'bold',
    'strike',
    'link',
    'image',
    'align',
    'height',
    'width'
  ];

  return (

    <ReactQuill
      ref={quillRef}
      style={{ width: "100%", height: "70vh", border: "none" }}
      theme="snow"
      modules={modules}
      formats={formats}
      placeholder="내용을 입력해주세요"
      value={update ? updatecomm.content : commInfo.content}
      onChange={handleQuillChange}
      preserveWhitespace 
    />

  )
}