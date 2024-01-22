import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function MyPage({ userInfo, setUserInfo }) {
    const navigate = useNavigate();

    const oauthHandler = (field) => {
        if(userInfo.oauth !== "MODO") {
            alert(`소셜 로그인을 통해 가입한 경우 ${field} 변경이 불가능합니다`);
        }
    }
    
    const [newInfoData, setNewInfoData] = useState({
        id : userInfo.id,
        username : userInfo.username,
        password : "",
        nickname : userInfo.nickname
    })

    const infoChangeHandler = (e) => {
        const { id, value } = e.target;
        // 새로운 값이 비어 있다면 기존 userInfo의 값을 유지하도록 설정
        setNewInfoData({
            ...newInfoData,
            [id]: value === "" ? userInfo[id] : value
        });
    }
    
    const submitUpdate = () => {
        axiosInstance.post('/updateInfo', newInfoData)
            .then((response) => {
                alert(response.data);
                navigate('/');
            }).catch((error) => {
                alert('오류 발생');
            });
    }
    

    console.log(newInfoData);

    return (
        <div style={{ marginTop: "5%" }}>
            <h3>마이페이지 회원정보수정 테스트중</h3>

            <div className="infoWrapper">
                <div className="itemContainer">
                    <div className="item-title">닉네임</div>
                    <input type="text" id="nickname" placeholder={userInfo.nickname} onChange={infoChangeHandler}></input>
                </div>

                <div className="itemContainer">
                    <div className="item-title">아이디(이메일)</div>
                    <input 
                        type="text" 
                        id="username"
                        placeholder={userInfo.username}
                        onClick={() => oauthHandler('아이디(이메일)')} 
                        readOnly={userInfo.oauth !== "MODO"}
                        onChange={userInfo.oauth === "MODO" ? infoChangeHandler : undefined}>
                    </input>
                </div>

                <div className="itemContainer">
                    <div className="item-title">비밀번호</div>
                    <input 
                        type="text" 
                        id="password" 
                        placeholder="•••••••" 
                        onClick={() => oauthHandler('비밀번호')} 
                        readOnly={userInfo.oauth !== "MODO"} 
                        onChange={userInfo.oauth === "MODO" ? infoChangeHandler : undefined}>
                    </input>
                </div>
            </div>

            <button style={{marginTop : "10px"}} onClick={submitUpdate}>수정완료</button>
        </div>
    )
}

export default MyPage;