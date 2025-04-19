import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./index.css";

function ImpactBar({ label, score, sentiment }) {
  const levels = [
    "bg-gray-300",
    "bg-red-500",
    "bg-orange-400",
    "bg-yellow-300",
    "bg-green-400",
    "bg-green-600"
  ];
  const barColor = levels[score] || "bg-gray-300";
  return (
    <div className="mb-1">
      <div className="flex justify-between text-sm font-medium">
        <span>{label}</span>
        <span className="italic text-xs text-gray-400 dark:text-gray-300">{sentiment || ""}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded">
        <div className={`h-2 ${barColor} rounded`} style={{ width: `${score * 20}%` }}></div>
      </div>
    </div>
  );
}

function PostCard({ post }) {
  const { summary, tags, sentiment, impact, link, published } = post;
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md space-y-3 border border-gray-200 dark:border-gray-600">
      <div className="flex items-center justify-between text-sm text-gray-400 dark:text-gray-300">
        <span>{new Date(published).toLocaleString()}</span>
        {impact?.stock_market >= 4 && (
          <span className="text-red-600 dark:text-red-400 font-bold text-xs ml-2">🚨 Stock Market Impact</span>
        )}
        {impact?.bond_market >= 4 && (
          <span className="text-purple-600 dark:text-purple-400 font-bold text-xs ml-2">🚨 Bond Market Impact</span>
        )}
      </div>

      <div className="text-gray-700 dark:text-gray-100 text-sm">{summary}</div>

      <div className="text-xs text-blue-600 dark:text-blue-400">
        <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
          🔗 View Original Post
        </a>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-white">
        {tags?.map((tag) => (
          <span key={tag} className="bg-blue-600 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="text-sm font-medium">
        🧠 Overall Sentiment:{" "}
        <span
          className={`$ {
            sentiment === "Bullish"
              ? "text-green-500"
              : sentiment === "Bearish"
              ? "text-red-500"
              : "text-gray-500 dark:text-gray-300"
          }`}
        >
          {sentiment}
        </span>
      </div>

      <div className="space-y-1 text-sm">
        <ImpactBar label="Stock Market" score={impact?.stock_market ?? 0} sentiment={impact?.stock_sentiment} />
        <ImpactBar label="Bond Market" score={impact?.bond_market ?? 0} sentiment={impact?.bond_sentiment} />
        <ImpactBar label="Currency" score={impact?.currency ?? 0} />
        <ImpactBar label="Immigration Policy" score={impact?.immigration_policy ?? 0} />
        <ImpactBar label="Global Relations" score={impact?.global_relations ?? 0} />
        <ImpactBar label="Law Enforcement" score={impact?.law_enforcement ?? 0} />
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const postsToday = data.filter((post) => {
    const publishedDate = new Date(post.published).toISOString().slice(0, 10);
    return publishedDate === today;
  });

  const fetchFeed = () => {
    fetch("http://localhost:5000/run-feed", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Backend response:", res);
        return fetch(`/summarized_feed.json?${Date.now()}`);
      })
      .then((res) => res.json())
      .then((json) => {
        console.log("📦 Loaded feed:", json);
        setData(json);
      })
      .catch((err) => console.error("Error loading feed:", err));
  };

  useEffect(() => {
    fetchFeed();
    const interval = setInterval(fetchFeed, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const allTags = Array.from(
    new Set(
      data.flatMap((post) => {
        const tags = post.tags || [];
        const extra = [];
        if (post.impact?.stock_market > 0) extra.push("Stock Market");
        if (post.impact?.bond_market > 0) extra.push("Bond Market");
        return [...tags, ...extra];
      })
    )
  ).sort();

  const filtered = data
    .filter((post) => post.summary && post.summary !== "No specific information provided in the post.")
    .filter((post) => {
      if (filter === "All") return true;
      return post.sentiment === filter;
    })
    .filter((post) => {
      if (selectedTags.length === 0) return true;
      return selectedTags.some((tag) => post.tags?.includes(tag));
    })
    .filter((post) => {
      const searchTerm = search.toLowerCase();
      return (
        post.summary.toLowerCase().includes(searchTerm) ||
        post.sentiment?.toLowerCase().includes(searchTerm) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    })
    .reverse();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 px-4 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <h1 className="text-3xl font-bold">🇺🇸 Trump GPT Intelligence Feed</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            🗓️ Posts on {today}: <strong>{postsToday.length}</strong>
          </p>
          <div className="flex gap-2">
            <button
              onClick={fetchFeed}
              className="border border-blue-500 text-blue-600 dark:border-blue-300 dark:text-blue-300 px-3 py-1 rounded-full text-sm hover:bg-blue-50 dark:hover:bg-blue-900"
            >
              🔁 Get Latest Feed
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-full text-sm"
            >
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search summary, tags, sentiment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm mb-4"
        />

        <div className="flex gap-2 flex-wrap text-sm mb-3">
          {["All", "Bullish", "Bearish", "Neutral"].map((label) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`px-3 py-1 rounded-full border ${
                filter === label
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {allTags.length > 0 && (
          <div className="mb-6">
            <Select
              isMulti
              name="tags"
              options={allTags.map((tag) => ({ value: tag, label: tag }))}
              className="basic-multi-select text-black"
              classNamePrefix="select"
              onChange={(selected) => setSelectedTags(selected.map((s) => s.value))}
              placeholder="Filter by tags..."
            />
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No matching posts.</p>
        ) : (
          filtered.map((post, i) => <PostCard key={i} post={post} />)
        )}
      </div>
    </div>
  );
}

export default App;
