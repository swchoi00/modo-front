import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import './FaqDetails.css';
import Notices from "../FAQ/mockData/Notices";
import axiosInstance from '../../axiosInstance';

function NoticeDetails( {notice, state} ) {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [Detail, setDetail] = useState();


    useEffect(() => {
        if(id.startsWith('공지')) {
            const noticeId = parseInt(id.replace('공지', ''), 10);
            const mockData = Notices.find(item => item.id === `공지${noticeId}`);

            if (mockData) {
                setDetail(mockData);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } else {
            axiosInstance.get(`/noticeDetails/${id}`)
            .then((response) => {
                setDetail(response.data);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
        }
    }, [id]);

    // const selectedData = data.find(item => item.no === parseInt(id));

    const returnListHandler = () => {
        navigate('/notice', {
            state: {
                ...state,
                // 추가적인 상태를 필요에 따라 여기에 추가할 수 있습니다.
            }
        });
    }

    if(isLoading)
    return 
    <div>
        데이터 로딩중
    </div>
    
    return (
        <div className="FAQ-container">
            <Sidebar></Sidebar>
            <div className='right-FAQ-container'>

                <div className='right-bar-container'>
                    <div className='notice'>
                        <h4 className='faq-title'>{Detail.title}</h4>
                    </div>

                </div>
                
                <div className='faq-content-container'>
                    {Detail.content}
                </div>

                <button onClick={returnListHandler}>
                    목록으로
                </button>


        </div>
    </div>
    );
}

export default NoticeDetails;