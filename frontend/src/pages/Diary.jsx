import "./Diary.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const blockOptions = [
  { value: "Diary", label: "Diary", icon: "📓", description: "Daily notes" },
  { value: "Gratitude", label: "Gratitude", icon: "🌼", description: "A place for thankfulness" },
  { value: "Unsent Letter", label: "Unsent Letters", icon: "💌", description: "Thoughts you never sent" },
  { value: "Wish", label: "Wishes", icon: "✨", description: "Dreams and hopes" },
  { value: "Blog", label: "Blogs", icon: "📝", description: "Longer reflections" },
];

function Diary() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [mood, setMood] = useState("😌");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Diary");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState("Diary");
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/diary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEntries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetComposer = () => {
    setTitle("");
    setContent("");
    setMood("😌");
    setCategory(selectedBlock);
    setEditIndex(null);
  };

  const saveEntry = async () => {
    const token = localStorage.getItem("token");

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content");
      return;
    }

    try {
      const payload = {
        title,
        content,
        mood,
        category: category || selectedBlock,
      };

      if (editIndex !== null) {
        const entryId = entries[editIndex]?._id;
        if (entryId) {
          await axios.put(`http://localhost:5000/api/diary/${entryId}`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      } else {
        await axios.post("http://localhost:5000/api/diary", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      await fetchEntries();
      resetComposer();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntry = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/diary/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedEntry(null);
      fetchEntries();
    } catch (error) {
      console.log(error);
    }
  };

  const editEntry = (entry) => {
    const indexToEdit = entries.findIndex((item) => item._id === entry._id);

    setSelectedEntry(null);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood || "😌");
    setCategory(entry.category || "Diary");
    setSelectedBlock(entry.category || "Diary");
    setEditIndex(indexToEdit);
  };

  const handleSelectBlock = (block) => {
    setSelectedBlock(block);
    setCategory(block);
    setShowBlockMenu(false);
  };

  const currentBlock = blockOptions.find((block) => block.value === selectedBlock) || blockOptions[0];
  const blockEntries = entries.filter((entry) => (entry.category || "Diary") === selectedBlock);
  const filteredEntries = blockEntries.filter((entry) => {
    const text = `${entry.title} ${entry.content}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  const getPreviewText = (content) => {
    if (!content) return "Start writing...";

    const firstLine = content.split(/\r?\n/)[0].trim();
    const plainText = firstLine.replace(/\s+/g, " ");

    if (plainText.length <= 82) {
      return plainText;
    }

    return `${plainText.slice(0, 79)}...`;
  };

  return (
    <div className="diary-page">
      <Header />

      <div className="diary-container">
        <div className="diary-hero">
          <div>
            <p className="editor-label">YOUR SOFT SPACE ✨</p>
            <h1>Write gently, reflect beautifully.</h1>
            <p className="editor-subtitle">
              Start with your daily diary and open a new space whenever you need it.
            </p>
          </div>
        </div>

        <div className="workspace-grid">
          <div className="composer-card">
            <div className="composer-card-header">
              <div>
                <p className="block-kicker">Writing area</p>
                <h2>{currentBlock.label}</h2>
              </div>
              <button className="ghost-btn" onClick={resetComposer}>
                Clear
              </button>
            </div>

            <div className="composer-fields">
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

              <div className="composer-row">
                <div className="field-group">
                  <label>Block</label>
                  <div className="block-menu-wrapper">
                    <button className="block-toggle" onClick={() => setShowBlockMenu(!showBlockMenu)}>
                      <span>{currentBlock.icon}</span>
                      {currentBlock.label}
                    </button>

                    {showBlockMenu && (
                      <div className="block-menu">
                        {blockOptions.map((block) => (
                          <button key={block.value} onClick={() => handleSelectBlock(block.value)}>
                            <span>{block.icon}</span>
                            <span>
                              <strong>{block.label}</strong>
                              <small>{block.description}</small>
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="field-group">
                  <label>Mood</label>
                  <select value={mood} onChange={(e) => setMood(e.target.value)}>
                    <option value="😀">😀 Happy</option>
                    <option value="😌">😌 Calm</option>
                    <option value="😔">😔 Sad</option>
                    <option value="😡">😡 Angry</option>
                  </select>
                </div>
              </div>

              <button className="submit-btn" onClick={saveEntry}>
                {editIndex !== null ? "Update Entry" : "Save Entry"}
              </button>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card-header">
              <div>
                <p className="block-kicker">Entries</p>
                <h3>{currentBlock.label}</h3>
              </div>
            </div>

            <div className="sidebar-search">
              <input
                type="text"
                placeholder="Search this block..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {filteredEntries.length === 0 ? (
              <div className="empty-state">
                <h3>No entries yet in {currentBlock.label}</h3>
                <p>Start writing and your first beautiful note will appear here.</p>
              </div>
            ) : (
              <div className="entry-list">
                {filteredEntries.map((entry) => (
                  <div className="saved-entry" key={entry._id} onClick={() => setSelectedEntry(entry)}>
                    <div className="entry-top-row">
                      <span className="entry-mood">{entry.mood || "😌"}</span>
                      <span className="entry-date">{entry.date}</span>
                    </div>
                    <h4>{entry.title}</h4>
                    <p>{getPreviewText(entry.content)}</p>
                    <div className="entry-actions">
                      <button onClick={(event) => {
                        event.stopPropagation();
                        editEntry(entry);
                      }}>Edit</button>
                      <button className="danger" onClick={(event) => {
                        event.stopPropagation();
                        deleteEntry(entry._id);
                      }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedEntry && (
        <div className="detail-overlay" onClick={() => setSelectedEntry(null)}>
          <div className="detail-card" onClick={(event) => event.stopPropagation()}>
            <div className="detail-card-header">
              <div>
                <p className="block-kicker">{selectedEntry.category || "Diary"}</p>
                <h3>{selectedEntry.title}</h3>
                <div className="detail-meta">
                  <span>{selectedEntry.mood || "😌"}</span>
                  <span> • </span>
                  <span>{selectedEntry.date}</span>
                </div>
              </div>
              <button className="ghost-btn" onClick={() => setSelectedEntry(null)}>
                Close
              </button>
            </div>

            <div className="detail-content">{selectedEntry.content}</div>

            <div className="detail-actions">
              <button className="primary" onClick={() => editEntry(selectedEntry)}>
                Edit note
              </button>
              <button className="secondary" onClick={() => deleteEntry(selectedEntry._id)}>
                Delete note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Diary;