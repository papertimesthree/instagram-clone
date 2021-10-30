import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { fstorage, fstore } from "../utils/fb";

function Post({ post, user }) {
  let [imgUrl, setImgUrl] = useState(undefined);

  async function getImgUrl() {
    let url = await fstorage
      .ref("user_upload/" + post.id + ".png")
      .getDownloadURL();
    setImgUrl(url);
  }
  useEffect(() => {
    getImgUrl();
  }, []);
  return (
    <Card className="mt-3">
      <div>
        <img src={imgUrl} alt="" style={{ height: "100px" }} />
        <div>{post.data().author}</div>
        <p>{post.data().desc}</p>
      </div>
    </Card>
  );
}

export default Post;
