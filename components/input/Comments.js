import { useContext, useEffect, useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

const Comments = (props)=> {
  const { eventId } = props;
  const { showNotification } = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(()=>{
    if(showComments){
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`).then((resp)=>resp.json())
      .then((res)=>{
        setComments(res.comments);
        setIsFetchingComments(false);
      })
    }
  },[showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: 'Sending Comment...',
      message: 'Saving your comment',
      status: 'pending'
    });
    fetch(`/api/comments/${eventId}`,{
      method: 'POST',
      body: JSON.stringify(commentData),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((resp)=>{
      if (resp.ok) {
        return resp.json();
      }
      return resp.json().then((data) => {
        throw new Error(data.message || 'Something went wrong')
      });
    })
    .then((res)=>{
      showNotification({
        title: 'Success',
        message: 'Comment saved',
        status: 'success'
      });
    }).catch((err)=>{
      showNotification({
        title: 'Error',
        message: err.message || 'Something went wrong!',
        status: 'error'
      });
    });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments ? <CommentList items={comments} /> : null}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
