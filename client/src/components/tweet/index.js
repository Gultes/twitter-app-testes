import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, LikeButton } from "./styles";

export default function Tweet(props) {
  const [setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("SESSION_TOKEN");

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/${props.owner}`,
          {
            headers: { "auth-token": token }
          }
        );

        setUsername(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsername();
  });
  
  return (
    <Container>
      <span>{props.username}</span>
      <p>{props.content}</p>

      <div>
        <span>{props.likes}</span>
        <LikeButton>
          Like
        </LikeButton>
      </div>
    </Container>
  );
}