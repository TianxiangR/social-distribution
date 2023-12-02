import React, {useState, useEffect } from 'react';
import Post from '../components/Post';
import { PostBrief } from '../types';
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


  const renderPost = (item: any) => {
    switch (item.type) {
    case 'post':
      return <Post {...item} onBodyClick={handleBodyClick(item.id)} onLikeIconClick={handleLikeClick(item.id)} onCommentIconClick={handleCommentClick(item.id)} onItemChanged={loadPostList} onItemDeleted={loadPostList}/>;
    case 'GollumEvent':
      return <GollumEventItem {...item} />;
    case 'MemberEvent':
      return <MemberEventItem {...item} />;
    case 'PullRequestEvent':
      return <PullRequestEventItem {...item} />;
    case 'PullRequestReviewEvent':
      return <PullRequestReviewEventItem {...item} />;
    case 'IssuesEvent':
      return <IssuesEventItem {...item} />;
    case 'IssueCommentEvent':
      return <IssueCommentEventItem {...item} />;
    case 'CreateEvent':
      return <CreateEventItem {...item} />;
    case 'DeleteEvent':
      return <DeleteEventItem {...item} />;
    case 'ForkEvent':
      return <ForkEventItem {...item} />;
    case 'CommitCommentEvent':
      return <CommitCommentEventItem {...item} />;
    case 'PublicEvent':
      return <PublicEventItem {...item} />;
    case 'PushEvent':
      return <PushEventItem {...item} />;
    case 'SponsorshipEvent':
      return <SponsorshipEventItem {...item} />;
    case 'ReleaseEvent':
      return <ReleaseEventItem {...item} />;
    case 'WatchEvent':
      return <WatchEventItem {...item} />;
    case 'PullRequestReviewCommentEvent':
      return <PullRequestReviewCommentEventItem {...item} />;
    case 'PullRequestReviewThreadEvent':
      return <PullRequestReviewThreadEventItem {...item} />;
    }
  };

  return (
    <div className='scroll-container'>
      {postItems.map((item, idx) => (
        <>
          {renderPost(item)}
        </>
      ))}
      <CreateCommentDialog open={open} onClose={() => setOpen(false)} postId={postId} onSuccess={loadPostList}/>
    </div>
  );
}

export default HomePage;