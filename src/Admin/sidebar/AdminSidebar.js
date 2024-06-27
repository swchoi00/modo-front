import './AdminSidebar.css';

function AdminSidebar({ isAuth, userInfo, selectedMenu, setSelectedMenu, sidebarMenu }) {

  const navClickHandler = (navMenu) => {
    // if(!isAuth) {
    //   alert('로그인 후 이용가능합니다.');
    // }
    // else if(userInfo.role !== "ADMIN"){
    //   alert('관리자만 이용가능합니다.');
    // }
    // else {
      setSelectedMenu(navMenu);
    // }
  }

  return (
    <div className="AdminSidebar">

      <div className="logo-img">
        <img src={process.env.PUBLIC_URL + "./Img/modo-admin-logo.svg"} />
      </div>
      <ul className="menu">
        {
          sidebarMenu.map((data, i) => {
            return (
              <li 
              key={i}
              className={`list ${data === selectedMenu && 'clickedList'}`} 
              onClick={() => navClickHandler(data)}>{data}</li>
            )
          })
        }
      </ul>

    </div>
  )
}

export default AdminSidebar;