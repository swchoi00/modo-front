import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import ReplyList from "./ReplyList";

function Reply({ inquiryFormId , userInfo }) {

    const [reply, setReply] = useState({
        content: '',
    });

    const [replyList, setReplyList] = useState([]);

    const id = inquiryFormId;

    const replyHanlder = () => {
        const replyData = {
            ...reply,
            id: inquiryFormId,
            member_username : userInfo.username,
        };
        console.log(replyData);
        axiosInstance.post(`/reply/${id}`, replyData)
            .then((response) => {
                axiosInstance.get(`/reply/${id}/list`)
                    .then((response) => {
                        setReplyList(response.data);
                        setReply({ content: "" });
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                alert(response.data);
            }).catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        axiosInstance.get(`/reply/${id}/list`)
            .then((response) => {
                setReplyList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [inquiryFormId]);

    console.log(userInfo)

    return (
        <div className="replyContainer">
            <div className="insert-reply">
                <textarea
                    value={reply.content}
                    onChange={(e) => setReply({ ...reply, content: e.target.value })}
                    className="reply-textarea"
                    placeholder="답변을 입력해주세요"
                >
                </textarea>
                <button
                    className="enter-reply"
                    onClick={replyHanlder}
                >
                등록
                </button>

            </div>

            <div>
                {replyList.length > 0 && (
                    <div>
                        {replyList.map((reply, i) => (
                            <ReplyList
                            key={i}
                            reply={reply}
                            setReply={setReplyList}
                            />
                        ))}
                    </div>
                )}
            </div>


        </div>
    )


}

export default Reply;