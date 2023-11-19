import React, {useState, useEffect} from 'react';
import { Typography, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import './NotificationPage.css';
import NotificationItem from '../components/NotificationItem';
import { Notification } from '../types';
import { getNotificationList } from '../apis';
import { read } from 'fs';

function NotificationPage() {
  const [tab, setTab] = useState('1');
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const readNotifications = notifications.filter(notification => notification.is_read);
  const unreadNotifications = notifications.filter(notification => !notification.is_read);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const fetchNotifications = async () => {
    const response = await getNotificationList();
    const notifications: Array<Notification> = await response.json();
    notifications.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    if (response?.ok) {
      setNotifications(notifications);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className='notification-page-container'>
      <div className='notification-page-title'>
        <Typography variant="h4">Notifications</Typography>
      </div>
      <TabContext value={tab}>
        <TabList onChange={handleChange}>
          <Tab label="Unread" value="1" />
          <Tab label="Read" value="2" />
        </TabList>
        <TabPanel value="1" sx={{padding: '0'}}>
          <>
            {unreadNotifications.map((notification, index) => {
              return <NotificationItem key={index} {...notification}/>;
            })
            }
          </>
        </TabPanel>
        <TabPanel value="2" sx={{padding: '0'}}>
          <>
            {readNotifications.map((notification, index) => {
              return <NotificationItem key={index} {...notification}/>;
            })
            }
          </>
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default NotificationPage;