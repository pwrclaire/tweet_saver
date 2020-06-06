import React, { useState } from "react";
import { SingleTweet } from "../SingleTweet";
import fetchJsonp from "fetch-jsonp";
import styled from "styled-components";

const TweetBox = styled.div`
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px;
  height: 100vh;
`;

const SearchBar = styled.div`
  line-height: 50px;
`;

const Input = styled.input`
  height: 30px;
  font-size: 14px;
`;

const Button = styled.button`
  height: 30px;
`;

const TweetContainer = styled.div`
  background: rgb(166, 166, 166);
  background: linear-gradient(
    180deg,
    rgba(166, 166, 166, 1) 0%,
    rgba(217, 227, 216, 0) 94%
  );
  height: 100%;
`;

const SavedHeader = styled.div`
  line-height: 50px;
  display: flex;
  justify-content: space-between;
`;

const Container = () => {
  const localTweets = JSON.parse(localStorage.getItem("tweets")) || [];
  const [tweets, setTweets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedTweets, setSavedTweets] = useState(localTweets);
  const [dragging, setDragging] = useState("");

  const fetchData = async () => {
    const resp = await fetchJsonp(
      `http://tweetsaver.herokuapp.com/?q=${searchTerm}&count=10`
    );
    resp.json().then((res) => setTweets(res.tweets));
    setSearchTerm("");
  };

  const searchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onEnter = (e) => {
    if (e.key === "Enter" && searchTerm) {
      fetchData();
    }
  };

  const clear = () => {
    setSavedTweets([]);
    localStorage.removeItem("tweets");
  };

  const onDrag = (e) => {
    setDragging(e.target.id);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const newTweet = tweets.find((x) => x.id == dragging);
    if (!newTweet) {
      return;
    }
    // make sure tweets don't duplicate
    const uniq = [...new Set([...savedTweets, newTweet])];
    setSavedTweets(uniq);

    // remove tweet from list
    const originalTweets = tweets.filter((x) => x.id !== newTweet.id);
    setTweets(originalTweets);
    setDragging("");

    // write to local storage
    localStorage.setItem("tweets", JSON.stringify(uniq));
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <TweetBox>
      <OuterContainer>
        <SearchBar>
          <Input
            placeholder="Search tweets"
            type="text"
            value={searchTerm}
            onKeyPress={onEnter}
            onChange={searchChange}
          />
          <Button onClick={fetchData} disabled={!searchTerm}>
            Search
          </Button>
        </SearchBar>
        <TweetContainer>
          {tweets ? (
            tweets.map((tweet) => {
              return (
                <SingleTweet
                  tweet={tweet}
                  ondrag={(e) => onDrag(e)}
                  key={tweet.id}
                  canDrag={true}
                />
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </TweetContainer>
      </OuterContainer>
      <OuterContainer>
        <SavedHeader>
          SAVED TWEETS
          <button onClick={clear}>Clear</button>
        </SavedHeader>
        <TweetContainer
          className="droppable"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e)}
        >
          {savedTweets &&
            savedTweets.map((tweet) => {
              return (
                <SingleTweet
                  tweet={tweet}
                  key={tweet.id}
                  canDrag={false}
                  ondrag={() => false}
                />
              );
            })}
        </TweetContainer>
      </OuterContainer>
    </TweetBox>
  );
};

export { Container };
