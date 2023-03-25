import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Post.css";
import { Avatar } from "@mui/material";
import firebase from "firebase";
function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    //this is where the code runs
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          //every time a new post is added this code will fire..
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  const[like, setLike]=useState(187),
   [islike, setIslike]=useState(false)
  const likeButton=()=>{
setLike(like+(islike?-1:+1));
setIslike(!islike);
  }
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Pummk2K02"
          src="/static/images/avatar/1.jpg"
          // src="https://wallpaperaccess.com/full/1102078.jpg"
        />
        <h3>{username}</h3>
      </div>
      {/* header => Avatar+ Username  */}

      {/* image  */}
      <img className="post__image" src={imageUrl} alt="" />
      <div className="icons">
          <span className={""+ (islike ? "text-danger":"")}>
            <i className="fa-solid fa-heart"  onClick={likeButton}></i>
          </span>
      <i className="fa-regular fa-comment"></i>
      <i className="fa-solid fa-paper-plane"></i>
      <i className="fa-regular fa-bookmark bookmark"></i>

      </div>
      <div className="likeCount">
      <Avatar
          className="like__avatar"
          alt="Pummk2K02"
          src="https://wallpaperaccess.com/full/1102078.jpg"
        />
      <p>liked by pummy2k02 and{like} others</p>
      </div>
      
      {/* username +  caption  */}
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      

      <div className="post__comments">
        {comments.map((comment) => (
          <p className="comment">
            <strong> {comment.username} </strong>
            {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            type="text"
            className="post__input"
            placeholder="Add a comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
