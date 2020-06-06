import React from "react";
import styled from "styled-components";
import moment from "moment";

const TweetContainer = styled.div`
  background-color: white;
  padding: 5px;
  margin-bottom: 13px;
  width: 100%;
  display: flex;
  cursor: ${(props) => (props.draggable ? "pointer" : "")};
  box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
`;

const AvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  padding: 5px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  display: flex;
`;

const SingleTweet = ({ tweet, canDrag, ondrag }) => {
  const { text, user } = tweet;
  const { name, screenName, profileImageURLHttps } = user;
  const date = moment(tweet.createdAt).format("MMM D, YYYY");
  return (
    <TweetContainer
      onDragStart={(e) => ondrag(e)}
      draggable={canDrag}
      id={tweet.id}
    >
      <AvatarContainer>
        <img src={profileImageURLHttps} alt="" />
      </AvatarContainer>
      <InfoContainer>
        <UserInfo>
          <b>{name}</b>&nbsp;@{screenName}
          {"  "}
          {date}
        </UserInfo>
        {text}
      </InfoContainer>
    </TweetContainer>
  );
};

export { SingleTweet };
