import "./Diary.css";

function Diary() {
  return (
    <div className="diary-container">

      <h1>Today's Entry</h1>

      <input
        type="text"
        placeholder="Title"
      />

      <textarea
        placeholder="Write your thoughts here..."
      ></textarea>

      <button>
        Save Entry
      </button>

    </div>
  );
}

export default Diary;