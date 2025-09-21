import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../components/dashboard/Sidebar';
import { DashUsers } from '../components/dashboard/dashUsers/DashUsers';
import { DashProfile } from '../components/dashboard/dashProfile/DashProfile';
import { DashArticles } from '../components/dashboard/dashArticles/DashArticles';
import { DashComments } from '../components/dashboard/DashComments';

export const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex min-h-[calc(100vh-100px)]">
      <Sidebar />
      <div className="transition-all duration-300 ease-in-out mx-auto w-full">
        {tab === 'profile' && <DashProfile />}
        {tab === 'articles' && <DashArticles />}
        {tab === 'users' && <DashUsers />}
        {tab === 'comments' && <DashComments />}
      </div>
    </div>
  );
};
