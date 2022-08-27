import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: (data) => { },
  hideNotification: () => { }
});

const NotificationContextProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState(null);

  const showNotificationHandler = (data) => {
    setActiveNotification(data);
  }

  const hideNotificationHandler = () => {
    setActiveNotification(null)
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler
  };

  useEffect(() => {
    if (['success', 'error'].includes(activeNotification?.status)) {
      const timer = setTimeout(() => {
        hideNotificationHandler()
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    };
  }, [activeNotification, hideNotificationHandler]);

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  )
};

export { NotificationContextProvider, NotificationContext as default };
