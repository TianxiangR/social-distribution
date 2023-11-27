import React, {useState, useEffect} from 'react';
import './FriendRequestPage.css';
import { FriendRequest } from '../types';
import { getFriendRequestList } from '../apis';
import FriendRequestItem from '../components/FriendRequestItem';

function FriendRequestPage() {
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  const fetchRequests = async () => {
    const response = await getFriendRequestList();
    const json_data = await response.json();
    const requests = json_data.items.filter((request: FriendRequest) => request.status === 'PENDING') as FriendRequest[];
    setRequests(requests);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className='friend-request-page-container'>
      <div className='friend-request-list-container'>
        {requests.map((request) => (
          <FriendRequestItem key={request.id} {...request} />
        ))}
      </div>
    </div>
  );
}

export default FriendRequestPage;