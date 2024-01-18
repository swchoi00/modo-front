import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function TestAddMoim({ userInfo }) {

    const navigate = useNavigate();

    const [moimData, setMoimData] = useState({
        leadername : userInfo.username,
        moimname: '',
        location: '',
        category: '',
        introduction: ''
    })

    const inputChangeHandler = (e) => {
        const { id, value } = e.target;
        setMoimData({
            ...moimData,
            [id]: value
        });

    }
    console.log(moimData);

    const locations = [
        '서울',
        '부산',
        '대구',
        '인천',
    ]

    const categories = [
        '여행',
        '요리',
        '파티',
        '게임'
    ]

    const moimnameCheck = () => {
        if(userInfo.nickname !== null) {
            axiosInstance.post('/moimnameCheck', { moimname : moimData.moimname} )
                .then((response => {
                    alert(response.data);
                }
            )).catch((error) => {
                alert(error.response.data);
            })
        } else {
            alert('로그인 후 이용하세요');
            navigate('/login');
        }
    }

    const createMoim = () => {
        axiosInstance.post('/createMoim', moimData)
            .then((response) => {
                alert(response.data);
                navigate('/');
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div style={{ marginTop: "5%" }}>
            <h3>{userInfo.nickname}님</h3>

            <div className="moimname" style={{ marginTop: "5%" }}>
                모임 이름&nbsp;&nbsp;&nbsp;
                <input
                    id="moimname"
                    value={moimData.moimname}
                    onChange={inputChangeHandler}
                />
                &nbsp;<button onClick={moimnameCheck}>중복확인</button>
            </div>

            <div className="location" style={{ marginTop: "5%" }}>
                모임 지역&nbsp;&nbsp;&nbsp;
                <select id="location" value={moimData.location} onChange={inputChangeHandler}>
                    <option value="">지역을 선택하세요</option>
                    {locations.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className="category" style={{ marginTop: "5%" }}>
                모임 카테고리&nbsp;&nbsp;&nbsp;
                <select id="category" value={moimData.category} onChange={inputChangeHandler}> 
                    <option value="">카테고리를 선택하세요</option>
                    {categories.map((categories, index) => (
                        <option key={index} value={categories}>
                            {categories}
                        </option>
                    ))}
                </select>
            </div>

            <div className="introduction" style={{ marginTop: "5%" }}>
                모임 설명&nbsp;&nbsp;&nbsp;
                <input
                    id="introduction"
                    value={moimData.introduction}
                    onChange={inputChangeHandler}
                />
            </div>

            <hr />
            <button onClick={createMoim}>모임 생성</button>
        </div>
    );
}


export default TestAddMoim;