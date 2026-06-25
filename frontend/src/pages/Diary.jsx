import "./Diary.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Diary() {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [mood, setMood] = useState("😌");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Diary");
  const [content, setContent] = useState("");
 const [entries, setEntries] = useState([]);
 
const [editIndex, setEditIndex] = useState(null);

useEffect(() => {

  const token =
    localStorage.getItem("token");

  if (!token) {

    navigate("/login");

  }

}, []);

useEffect(() => {
  fetchEntries();
}, []);

const fetchEntries = async () => {
  try {
    const res = await axios.get(
  "http://localhost:5000/api/diary",
  {
    params: {
      userId:
        localStorage.getItem("userId"),
    },
  }
);
    console.log("Fetched:", res.data);

    setEntries(res.data);

  } catch (error) {
    console.log(error);
  }
};

const saveEntry = async () => {

  if (!title.trim() || !content.trim()) {
    alert("Please enter both title and content");
    return;
  }

  try {

    if (editIndex !== null) {

      await axios.put(
        `http://localhost:5000/api/diary/${entries[editIndex]._id}`,
        {
          title,
          content,
          mood,
          category
        }
      );

      setEditIndex(null);

    } else {

     await axios.post(
  "http://localhost:5000/api/diary",
  {
    title,
    content,
    mood,
    category,
    userId: localStorage.getItem("userId")
  }
);

    }

    fetchEntries();

    setTitle("");
    setContent("");
    setMood("😌");
    setCategory("Diary");

  } catch (error) {

    console.log(error);

  }

};

const deleteEntry = async (id) => {

  try {

    await axios.delete(
      `http://localhost:5000/api/diary/${id}`
    );

    fetchEntries();

  } catch (error) {

    console.log(error);

  }

};

const editEntry = (indexToEdit) => {

  setTitle(entries[indexToEdit].title);

  setContent(entries[indexToEdit].content);

  setMood(entries[indexToEdit].mood || "😌");

  setCategory(
  entries[indexToEdit].category || "Diary"
);

  setEditIndex(indexToEdit);

};

const filteredEntries = entries.filter((entry) =>
  entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  entry.content.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="diary-container">

      <h1>Today's Entry</h1>

      <input
  type="text"
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

     <textarea
  placeholder="Write your thoughts here..."
  value={content}
  onChange={(e) => setContent(e.target.value)}
></textarea>

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="Diary">Diary</option>
  <option value="Gratitude">Gratitude</option>
  <option value="Unsent Letter">Unsent Letter</option>
  <option value="Wish">Wish</option>
  <option value="Blog">Blog</option>
</select>

<select
  value={mood}
  onChange={(e) => setMood(e.target.value)}
>
  <option value="😀">😀 Happy</option>
  <option value="😌">😌 Calm</option>
  <option value="😔">😔 Sad</option>
  <option value="😡">😡 Angry</option>
</select>

    <button onClick={saveEntry}>
  {editIndex !== null ? "Update Entry" : "Save Entry"}
</button>

<div>

  <input
  type="text"
  placeholder="Search entries..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

  <h2>
  Saved Entries ({entries.length})
</h2>

{filteredEntries.length === 0 && (
  <p>
    No diary entries found. Start writing your story ✨
  </p>
)}

  {filteredEntries.map((entry, index) => (

  <div className="saved-entry" key={index}>
<p>{entry.date}</p>

<p>
  {entry.mood} | {entry.category}
</p>

<h3>{entry.title}</h3>

    <p>{entry.content}</p>

     <button
  onClick={() => editEntry(index)}
>
  Edit
</button>

      <button
  onClick={() => deleteEntry(entry._id)}
>
  Delete
</button>

    </div>

  ))}

</div>

    </div>
  );
}

export default Diary;