import React from "react"
import './TermsContents.css';

const TermsContents = {
    accessTerms: (
        <div className="modalTermsContainer">
            <div className="contentsTitle">
                <h2>이용 약관</h2>
                <br></br>
                <h3>주식회사 모도 이용 약관</h3>
                <p>이용약관 내용</p>
            </div>

            <div className="contents">
                <h4>제 1 조 (목 적)</h4>
                <ul className="contents_ul">
                    <li className="contents_li">이 약관은 이용자가 주식회사 모도(이하 “회사”)이 운영하는 인터넷 서비스 사이트(이하 “사이트” 또는 “모도”)를 통해 제공하는 인터넷 전자상거래 관련 서비스(이하 “서비스”)와 관련하여 회사와 이용자의 권리, 의무, 책임사항을 규정함을 목적으로 합니다. 또한 본 약관은 유무선 PC통신, 태블릿 PC, 스마트폰(아이폰, 안드로이드폰 등) 어플리케이션 및 모바일웹 등을 이용하는 전자상거래 등에 대해서도 그 성질에 반하지 않는 한 준용됩니다.</li>
                    <li className="contents_li">본 약관이 규정한 내용 이외의 회사와 이용자 간의 권리, 의무 및 책임사항에 관하여서는 전기통신사업법 기타 대한민국의 관련 법령과 상관습에 의합니다.</li>
                </ul>
                ...
            </div>
        </div>
    ),

    infoTerms: (
        <div className="modalTermsContainer">
            <div className="contentsTitle">
                <h2>개인정보 수집 및 이용 안내</h2>
                <h3>주식회사 모도 개인정보 수집 및 이용 안내</h3>
            </div>

            <div className="contents">
                <h4>1. 개인정보 수집항목 및 이용목적</h4>
                주식회사 모도(이하 “회사”)은 사이트 이용을 위해 필요한 최소한의 범위로 개인정보를 수집합니다. 회사는 이용자의 사전 동의 없이는 이용자의 개인 정보를 공개하지 않으며, 다음과 같은 목적을 위하여 개인정보를 수집하고 이용합니다.
                <ul className="contents_ul">
                    <li className="contents_li">서비스 제공<br></br>
                    견적서·요청서 정보 제공 및 프로필 광고노출, 멤버십 등 기본적인 서비스 제공, 서비스 제공에 관한 계약 체결·유지·이행·관리·개선 및 서비스 제공에 따른 요금 정산 및 컨텐츠 서비스 이용, 구매 및 요금결제, 물품 배송 또는 청구지 등 발송, 이용자 레슨 정보 및 서비스 이용 정보 제공
                    </li>

                    <li className="contents_li">회원관리<br></br>
                    회원제 서비스에 따른 본인 확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 회원 가입∙유지∙탈퇴 의사 확인, 연령확인, 만 14세 미만 아동 개인정보수집 시 법정 대리인 동의 여부 확인, 법정 대리인 권리행사 시 본인 확인, 법령상 의무 이행, 법령 및 약관 위반 여부에 관한 조사, 고객 센터 운영 불만처리 등 민원 처리, 고지사항 전달, 숨고보증 금액 지급 시 본인 확인 등
                    </li>
                </ul>
                ...
            </div>

        </div>
    )

}

export default TermsContents;