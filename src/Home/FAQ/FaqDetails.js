import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import data from '../FAQ/mockData/Questions'; // 예시로 데이터 가져오기
import Sidebar from './Sidebar';
import './FaqDetails.css';



function FaqDetails( {state} ) {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const selectedData = data.find(item => item.no === parseInt(id));

    if (!selectedData) {
        return (
            <div>
                해당 데이터를 찾을 수 없습니다.
            </div>
        );
    }

    const returnListHandler = () => {
        navigate('/faq', {
            state: {
                ...state,
                // 추가적인 상태를 필요에 따라 여기에 추가할 수 있습니다.
            }
        });
    }
    
    return (
        <div className="FAQ-container">
            <Sidebar></Sidebar>
            <div className='right-FAQ-container'>

                <div className='right-bar-container'>
                    <div className='notice'>
                        <h4 className='faq-title'>{selectedData.title}</h4>
                    </div>

                </div>
                
                <div className='faq-content-container'>
                    {selectedData.content}
                </div>

                <button onClick={returnListHandler}>
                    목록으로
                </button>


        </div>
    </div>
    );
}

export default FaqDetails;