import React from 'react';
import './Accordion.css';
import { faChevronUp as up, faChevronDown as down } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Accordion = ({ date, answerChk, title, content, answer, category, isOpen, onToggle }) => {

  return (
    <div className="accordion-box">
      <div className="accordion-box-inner-header" onClick={onToggle}>
        <div className="accordion-title">
          {date !== undefined ? (
            <>
              <div className="accordion-title-inner-inquiry">
                <div className="answerChk-title">
                  <div className={answer ? 'complete' : 'receipt'}>{answer ? '답변완료' : '접수'}</div>
                  <div className='title'>{title}</div>
                </div>
                <div className='category-date'>
                  <div className='category'>[{category}]</div>
                  <div className='date'>{date}</div>
                </div>
              </div>
            </>
          ) : (
            <div className="accordion-title-inner-FAQ">
              <div>{category}</div>
              <div>{title}</div>
            </div>
          )}
        </div>
        <div className="accordion-arrow-icon">
          <FontAwesomeIcon icon={isOpen ? up : down} style={{ color: '#9c9c9c' }} />
        </div>
      </div>
      {isOpen && (
        <div className="accordion-inner-content">
          {date !== undefined ? (
            <div className="accordion-inner-content-inquiry">
              <div className='question'>
                <div>Q.</div>
                {content}
              </div>
              {/* {
                answer &&
                <div className='answer'>
                  <div>A.</div>
                  {answer}
                </div>
              } */}
              <div className='answer'>
                <div>A.</div>
                관리자 댓글 Test입니다.
              </div>
            </div>
          ) : (
            <div className="accordion-inner-content-FAQ">
              <div>{content}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;
