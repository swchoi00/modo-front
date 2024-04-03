import { useState } from "react";
import axiosInstance from "../../../axiosInstance";

function ReplyList( {reply, inquiryForm, setReply, userInfo}) {
    
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(reply.content);

    const editReplyHandler = () => {
        setIsEditing(true);
        setUpdatedContent(reply.content);
    }

    const updateReplyHandler = () => {
        axiosInstance.put(`/reply`, {...reply, content : updatedContent})
        .then((response) => {
            console.log(response.data); 
            // 콘솔 확인 후 setReply에 값 담기
            setReply(response.data);

        }).catch((error) => {
            console.log(error);
        })
    };

    const cancleReplyHandler = () => {
        setIsEditing(false);
    }
    
    return (
        <div className="reply-item">
      <div className="replyListBox">

        <div>
          작성자: {userInfo.nickname}
        </div>
        <div>

          {isEditing ? (
            <div className="replyFlex ">
              <textarea
                className="reply-submit"
                type="text"
                rows={2}
                cols={50}
                onChange={(e) => setUpdatedContent(e.target.value)}
              > value={reply.content}</textarea>{" "}
              <button className="click" onClick={updateReplyHandler}>
                저장
              </button>
              <button className="noClick" onClick={cancleReplyHandler}>
                취소
              </button>
            </div>
          ) : (
            <div className="replyFlex">
              <textarea
                className="reply-content"
                type="text"
                rows={2}
                cols={50}
                value={reply.content}
                readOnly
              ></textarea>{" "}
              <div className="btn">
                <button onClick={editReplyHandler} className="click">
                  수정
                </button>{" "}
                <button
                  className="noClick"
                  type="reset"
                  onClick={() => {
                    axiosInstance
                      .delete(`/reply/${reply.replyNo}`)
                      .then((response) => {
                        alert(response.data);
                        setReply((deleteReplyList) => deleteReplyList.filter((r) => r.replyNo !== reply.replyNo));
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    )
}

export default ReplyList;