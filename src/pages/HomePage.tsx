import React, {useState, useEffect } from 'react';
import Post from '../components/Post';
import { PostBrief, StreamEvent } from '../types';
import { useNavigate } from 'react-router-dom';
import { getPostList, likePost } from '../apis';
import CreateCommentDialog from '../components/CreateCommentDialog';
import '../global.css';
import PushEventItem from '../components/PushEventItem';
import GollumEventItem from '../components/GollumEventItem';
import MemberEventItem from '../components/MemberEventItem';
import { isTemplateExpression } from 'typescript';
import PullRequestEventItem from '../components/PullRequestEventItem';
import PullRequestReviewEventItem from '../components/PullRequestReviewEvent';
import IssuesEventItem from '../components/IssuesEventItem';
import IssueCommentEventItem from '../components/IssueCommentEventItem';
import CreateEventItem from '../components/CreateEventItem';
import DeleteEventItem from '../components/DeleteEventItem';
import ForkEventItem from '../components/ForkEventItem';
import CommitCommentEventItem from '../components/CommitCommentEventItem';
import PublicEventItem from '../components/PublicEventItem';
import SponsorshipEventItem from '../components/SponsorshipEventItem';
import ReleaseEventItem from '../components/ReleaseEventItem';
import WatchEventItem from '../components/WatchEventItem';
import PullRequestReviewThreadEventItem from '../components/PullRequestReviewThreadEventItem';
import PullRequestReviewCommentEventItem from '../components/PullRequestReviewCommentEventItem';

function HomePage() {
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState('');
  const [postItems, setPostItems] = useState<PostBrief[]>([]);
  const navigate = useNavigate();

  const loadPostList = async () => {
    const response = await getPostList();
    const json_data = await response.json();
    const posts = json_data.items as PostBrief[];
    if (response.ok) {
      return setPostItems(posts);
    } else {
      return navigate('/login');
    }
  };

  useEffect(() => {
    loadPostList();
  }, []);

  const handleBodyClick = (id: string) => () => {
    navigate(`/post/${id}`);
  };

  const handleLikeClick = (id: string) => () => {
    likePost(id).then((response) => {
      if (response.ok) {
        loadPostList();
      }
    });
  };

  const handleCommentClick = (id: string) => () => {
    setPostId(id);
    setOpen(true);
  };


  const renderPost = (item: StreamEvent, idx: number) => {
    switch (item.type) {
    case 'post':
      return <Post {...item} key={idx} onBodyClick={handleBodyClick(item.id)} onLikeIconClick={handleLikeClick(item.id)} onCommentIconClick={handleCommentClick(item.id)} onItemChanged={loadPostList} onItemDeleted={loadPostList}/>;
    case 'GollumEvent':
      return <GollumEventItem key={idx} {...item} />;
    case 'MemberEvent':
      return <MemberEventItem key={idx} {...item} />;
    case 'PullRequestEvent':
      return <PullRequestEventItem key={idx}  {...item} />;
    case 'PullRequestReviewEvent':
      return <PullRequestReviewEventItem key={idx} {...item} />;
    case 'IssuesEvent':
      return <IssuesEventItem key={idx} {...item} />;
    case 'IssueCommentEvent':
      return <IssueCommentEventItem key={idx} {...item} />;
    case 'CreateEvent':
      return <CreateEventItem key={idx} {...item} />;
    case 'DeleteEvent':
      return <DeleteEventItem key={idx} {...item} />;
    case 'ForkEvent':
      return <ForkEventItem key={idx} {...item} />;
    case 'CommitCommentEvent':
      return <CommitCommentEventItem key={idx} {...item} />;
    case 'PublicEvent':
      return <PublicEventItem key={idx} {...item} />;
    case 'PushEvent':
      return <PushEventItem key={idx} {...item} />;
    case 'SponsorshipEvent':
      return <SponsorshipEventItem key={idx} {...item} />;
    case 'ReleaseEvent':
      return <ReleaseEventItem key={idx} {...item} />;
    case 'WatchEvent':
      return <WatchEventItem key={idx} {...item} />;
    case 'PullRequestReviewCommentEvent':
      return <PullRequestReviewCommentEventItem key={idx} {...item} />;
    case 'PullRequestReviewThreadEvent':
      return <PullRequestReviewThreadEventItem key={idx} {...item} />;
    }
  };

  return (
    <div className='scroll-container'>
      {postItems.map((item, idx) => (
        <>
          {renderPost(item, idx)}
        </>
      ))}
      <CreateCommentDialog open={open} onClose={() => setOpen(false)} postId={postId} onSuccess={loadPostList}/>
    </div>
  );
}

export default HomePage;