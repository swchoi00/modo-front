import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import axiosInstance from '../axiosInstance';
import loadingGif from "../Img/loading.gif";
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
Quill.register('modules/imageResize', ImageResize);

export default function QuillEditor({ commInfo, setCommInfo, update, updatecomm, setUpdateComm, setUploadedImages, contentRef }) {
  const quillRef = useRef(null);

  const handleQuillChange = (content) => {
    if (update) {
      setUpdateComm((comm) => ({
        ...comm,
        content
      }));
    } else {
      setCommInfo((comm) => ({
        ...comm,
        content
      }));
    }
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('img', file);

      const quillEditor = quillRef.current.getEditor();
      const range = quillEditor.getSelection(true);
      quillEditor.insertEmbed(range.index, "image", loadingGif);

      try {
        const response = await axiosInstance.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const imageUrl = response.data;
        quillEditor.deleteText(range.index, 1);
        quillEditor.insertEmbed(range.index, 'image', imageUrl);
        quillEditor.insertText(range.index + 1, '\n', 'user');

        setUploadedImages((prev) => [...prev, imageUrl]);
      } catch (error) {
        quillEditor.deleteText(range.index, 1);
        console.error('Image upload failed:', error);
      }
    };
  }, [quillRef, setUploadedImages]);

  useEffect(() => {
    const quillEditor = quillRef.current.getEditor();

    const handleTextChange = (delta, oldDelta, source) => {
      if (source === 'user') {
        delta.ops.forEach(op => {
          if (op.delete) {
            const imageIndex = oldDelta.ops.findIndex(o => o.insert && o.insert.image);
            if (imageIndex > -1) {
              const imageUrl = oldDelta.ops[imageIndex].insert.image;
              setUploadedImages(prev => prev.filter(url => url !== imageUrl));
            }
          }
        });
      }
    };

    quillEditor.on('text-change', handleTextChange);

    return () => {
      quillEditor.off('text-change', handleTextChange);
    };
  }, [quillRef, setUploadedImages]);

  useEffect(() => {
    if (quillRef.current) {
      contentRef.current = quillRef.current.getEditor().root;
    }
  }, [quillRef, contentRef]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [3, 4, 5, false] }],
        ['bold', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'image'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    imageResize: {
      displaySize: true,
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  }), [imageHandler]);

  const formats = [
    'header',
    'bold',
    'strike',
    'link',
    'image',
    'align',
    'color',
    'background',
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
