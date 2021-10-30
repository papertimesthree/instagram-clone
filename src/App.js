import { useEffect, useState } from "react";
import { Button, Form, Modal, Navbar } from "react-bootstrap";
import WriteForm from "./components/main/writeform";
import Post from "./components/post";
import "./styles.css";
import { fauth, fstore, GOOGLE_PROVIDER, fstorage } from "./utils/fb";
import Consts from "./utils/constants";

export default function App() {
  let [posts, setPosts] = useState([]);
  let [showWriteForm, setShowWritetForm] = useState(false);
  let [user, setUser] = useState(undefined);

  async function loadPosts() {
    let snapshot = await fstore
      .collection("instagram-posts")
      .orderBy("postDate", "desc")
      .get();
    setPosts(snapshot.docs);
  }

  async function createPost(event) {
    event.preventDefault();
    if (!user) return;

    let data = {
      desc: event.target.desc.value,
      author_uid: user.uid,
      author: user.displayName,
      postDate: new Date()
    };

    let ref = await fstore.collection(Consts.FSTORE_INSTA_POSTS).add(data);
    let doc = await fstore
      .collection(Consts.FSTORE_INSTA_POSTS)
      .doc(ref.id)
      .get();

    let imgRef = fstorage.ref().child("user_upload/" + ref.id + ".png");
    await imgRef.put(event.target.img.files[0], {
      contentType: "image/png"
    });

    setPosts([doc, ...posts]);
    setShowWritetForm(false);

    event.target.reset();
  }

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    fauth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  function tryLogin() {
    fauth.signInWithPopup(GOOGLE_PROVIDER);
  }

  function signOut() {
    fauth.signOut();
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Instagram</Navbar.Brand>
        <div>
          {user ? (
            <Button variant="secondary" size="sm" onClick={signOut}>
              Log out
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={tryLogin}>
              Log in
            </Button>
          )}
        </div>
      </Navbar>
      <div className="container">
        {posts.length === 0
          ? "Empty"
          : posts.map((post) => <Post post={post} key={post.id} user={user} />)}
        {}
      </div>
      <div className="bottom-right">
        {user ? (
          <Button onClick={() => setShowWritetForm(true)} variant="success">
            +
          </Button>
        ) : undefined}
      </div>

      <WriteForm
        showWriteForm={showWriteForm}
        createPost={createPost}
        setShowWritetForm={setShowWritetForm}
      />
    </div>
  );
}
