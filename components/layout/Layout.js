import React, { Fragment, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../ui/Notification";
import MainHeader from "./MainHeader";

const Layout = (props) => {
  const { notification } = useContext(NotificationContext);
  
  return (
    <Fragment>
      <MainHeader />
      <main>
        {props.children}
      </main>
      {notification ? <Notification {...notification} /> : null}
    </Fragment>
  )
};

export default Layout;