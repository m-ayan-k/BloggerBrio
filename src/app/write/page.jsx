"use client";
import Image from "next/image";
import "./writePage.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import ReactQuill from "react-quill";
import TextEditor from "@/utils/editor"



const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");


  const getValue = (value) => {
    setValue(value.replace(/background-color:\s*rgb\(\d+,\s*\d+,\s*\d+\);?/g, ''));
  };

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className="loading">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const cleantitle = ()=>{
    setTitle(title.replace(/background-color:\s*rgb\(\d+,\s*\d+,\s*\d+\);?/g, ''));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(title ==="" || value==="" || catSlug===""){
      alert("Please fill in all fields.Title, Description or Category should not be empty.");
      // Don't proceed with the API call
      return;
    }
    
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.id}`);
    }
  };
  const category=["style","fashion","food","culture","travel","coding","science","lifestyle","education","technology"]
  return (
    <div className="container">

      {/*<ReactQuill
            className={styles.input}
            theme="bubble"
            value={title}
            onChange={setTitle}
            placeholder="Title"
      />*/}
      <input
        type="text"
        placeholder="Title"
        className="input"
        onChange={(e) => setTitle(e.target.value)}
      />
      {file && (
            <img 
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt="" 
            />
        )}
      <div className="editor">
        <button className="button" onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className="add">
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className="addButton">
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <select className="select" onChange={(e) => setCatSlug(e.target.value)}>
              {category?.map((item,idx)=>(
                <option value={item} key={idx}>{item}</option>
              ))}
            </select>
          </div>
        )}
        <TextEditor 
          className="textArea"
          initialValue="" 
          getValue={getValue} 
          placeholder="Tell your Story..." 
        />
        {/* <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        /> */}
      </div>
      <button className="publish" onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
