import "./Diary.css";
import { useState, useEffect } from "react";

function Diary() {
  const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [entries, setEntries] = useState(() => {

  const savedEntries =
    localStorage.getItem("diaryEntries");

  return savedEntries
    ? JSON.parse(savedEntries)
    : [];

});
const [editIndex, setEditIndex] = useState(null);


useEffect(() => {

  localStorage.setItem(
    "diaryEntries",
    JSON.stringify(entries)
  );

}, [entries]);

const saveEntry = () => {

  if (!title.trim() || !content.trim()) {
  alert("Please enter both title and content");
  return;
}

  if (editIndex !== null) {

    const updatedEntries = [...entries];

    updatedEntries[editIndex] = {
  ...updatedEntries[editIndex],
  title,
  content
};
    setEntries(updatedEntries);

    setEditIndex(null);

  } else {

    const newEntry = {
  date: new Date().toLocaleDateString(),
  title,
  content
};

    setEntries([...entries, newEntry]);

  }

  setTitle("");
  setContent("");

};

const deleteEntry = (indexToDelete) => {

  const updatedEntries = entries.filter(
    (_, index) => index !== indexToDelete
  );

  setEntries(updatedEntries);

};

const editEntry = (indexToEdit) => {

  setTitle(entries[indexToEdit].title);

  setContent(entries[indexToEdit].content);

  setEditIndex(indexToEdit);

};

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

    <button onClick={saveEntry}>
  {editIndex !== null ? "Update Entry" : "Save Entry"}
</button>

<div>

  <h2>Saved Entries</h2>

  {entries.map((entry, index) => (

  <div className="saved-entry" key={index}>

    <p>{entry.date}</p>

    <h3>{entry.title}</h3>

    <p>{entry.content}</p>

     <button
  onClick={() => editEntry(index)}
>
  Edit
</button>

      <button
  onClick={() => deleteEntry(index)}
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