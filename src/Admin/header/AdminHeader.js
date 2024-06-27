import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <>
      <div className='AdminHeader'>
        <div>관리자 페이지</div>
        {/* {
          userInfo.role === "ADMIN" && (
            <button onClick={() => setSelectedMenu('login')}>로그아웃</button>
          )} */}
      </div>
    </>
  )
}

export default AdminHeader;