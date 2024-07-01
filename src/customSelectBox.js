import React, { useState, useEffect, useRef } from 'react';
import './customSelectBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; 

const CustomSelectBox = ({ options, placeholder, onSelect, select }) => {
// 📌커스텀 셀렉트 박스 사용법 📌
// 사용을 원하는 페이지에서 아래와 같이 options(배열) , placeholder, onselect(해당 페이지에서 사용할 핸들러)
// 참고는  moim.js에서 보면 됨
// <CustomSelectBox options={MoimAdressTown} placeholder="구 / 군" onSelect={filterSelectHandler} /> 


    const [isOpen, setIsOpen] = useState(false); // 받아올 옵션 배열 담는 곳
    const selectBoxRef = useRef(null); // selectBox 이외에 누르면 selectBox 닫히게 하기 위해
    const placeholder2 = placeholder === "지역" && select !== '' ? select : placeholder; // 이건 지역 설정 때문에 추가


    // selectBox 자체 핸들러
    const handleOptionClick = (option, e) => {
        setIsOpen(false); // list 닫음
        if (onSelect) {
            let name = e.target.dataset.filed;  // selectBox 여러개 쓰는 경우 하나의 핸들러로 분류해서 사용하기 위해 넣음
            onSelect(option, name); // 분류가 필요 없다면 selectBox 를 호출하는 페이지에 있는 핸들러에서 그냥 name을 안받으면됨
        }
    };

    // selectBox 이외 공간을 누르면 selectBox 닫히게 함
    const handleClickOutside = (e) => {
        if (selectBoxRef.current && !selectBoxRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    // selectBox 이외 공간을 누르면 selectBox 닫히게 함
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    



    return (
        <div className="custom-select-box" ref={selectBoxRef}>
            <div className="selected" onClick={() => setIsOpen(!isOpen)} style={{border: isOpen && "2px solid #a472ff"}}>                 
              <span>{placeholder2}</span> <FontAwesomeIcon icon={faChevronDown}  size='lg' style={{color:'#9c9c9c'}}/>
            </div>
            {isOpen && options !== '' && (
                <ul className="options">
                    {options.map((option, i) => (
                        <li
                            key={i}
                            className="option"
                            data-filed={placeholder}
                            onClick={(e) => handleOptionClick(option, e)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelectBox;
