import React, { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import StatsBox from "./components/StatsBox";
import RecapBox from "./components/RecapBox";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedIndividuals, setSelectedIndividuals] = useState([]);
  const [keywordFilter, setKeywordFilter] = useState("");
  const [impactFilter, setImpactFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allSources = Array.from(new Set(posts.map((p) => p.source)));
  const allIndividuals = Array.from(
    new Set(posts.map((p) => (p.source.includes("X - ") ? p.source : null)).filter(Boolean))
  );

  const toggleSelection = (value, list, setList) => {
    setList(list.includes(value) ? list.filter((i) => i !== value) : [...list, value]);
  };

  const toggleDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSource = selectedSources.length === 0 || selectedSources.includes(post.source);
    const matchesIndividual =
      !post.source.startsWith("X - ") ||
      selectedIndividuals.length === 0 ||
      selectedIndividuals.includes(post.source);
    const matchesKeyword =
      keywordFilter === "" ||
      post.title.toLowerCase().includes(keywordFilter.toLowerCase()) ||
      post.summary.toLowerCase().includes(keywordFilter.toLowerCase());

    const impact = post.impact || {};
    const impactSum = [impact.stock_market, impact.bond_market, impact.currency].reduce(
      (acc, val) => acc + (val || 0),
      0
    );
    const matchesImpact =
      impactFilter === "all" ||
      (impactFilter === "medium" && impactSum >= 3) ||
      (impactFilter === "high" && impactSum >= 5);

    return matchesSource && matchesIndividual && matchesKeyword && matchesImpact;
  });

  useEffect(() => {
    fetch("/summarized_feed.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.reverse());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = {
    totalPosts: posts.length,
    overallImpact:
      posts.reduce((acc, post) => {
        const imp = post.impact || {};
        return acc + (imp.stock_market || 0) + (imp.bond_market || 0) + (imp.currency || 0);
      }, 0) >= posts.length * 3
        ? "Medium"
        : "Low",
    sources: {
      "White House": posts.filter((p) => p.source.includes("whitehouse")).length,
      "Truth Social": posts.filter((p) => p.source.includes("Truth Social")).length,
      "X.com": posts.filter((p) => p.source.includes("X -")).length,
    },
  };

  const renderRecapBox = (index) => {
    if (windowWidth > 1410) return null;
    if (filteredPosts.length >= 5 && index === 4) {
      return (
        <RecapBox
          summary={`Today saw multiple posts from White House figures and Truth Social. Key highlights include new executive orders on trade, commentary on market conditions, and responses to global events. The market showed moderate reaction with mixed sentiment across equities and currencies. Stay tuned for further updates as the day progresses.`}
          lastUpdated="2:15 PM"
        />
      );
    }
    if (filteredPosts.length < 5 && index === filteredPosts.length - 1) {
      return (
        <RecapBox
          summary={`Today saw multiple posts from White House figures and Truth Social. Key highlights include new executive orders on trade, commentary on market conditions, and responses to global events. The market showed moderate reaction with mixed sentiment across equities and currencies. Stay tuned for further updates as the day progresses.`}
          lastUpdated="2:15 PM"
        />
      );
    }
    return null;
  };

  return (
    <main className="min-h-screen text-[#E3DCCF] p-6 space-y-10">
      
      <Header totalPosts={stats.totalPosts} overallImpact={stats.overallImpact} sources={stats.sources} />

      <FilterBar
        allSources={allSources}
        allIndividuals={allIndividuals}
        selectedSources={selectedSources}
        selectedIndividuals={selectedIndividuals}
        keywordFilter={keywordFilter}
        impactFilter={impactFilter}
        activeDropdown={activeDropdown}
        toggleDropdown={toggleDropdown}
        toggleSelection={toggleSelection}
        setSelectedSources={setSelectedSources}
        setSelectedIndividuals={setSelectedIndividuals}
        setKeywordFilter={setKeywordFilter}
        setImpactFilter={setImpactFilter}
      />

      <div className="flex items-center my-8">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#6a805b] to-transparent"></div>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">
          🦅 Scouting the latest... powered by <span className="text-white font-semibold">EagleEye</span>
        </p>
      ) : (
        <div className={`mx-auto px-6 ${windowWidth > 1410 ? "flex items-start justify-center" : ""}`}>
          <div className={`${windowWidth > 1410 ? "w-[700px] space-y-8 -translate-x-20" : "space-y-8 max-w-3xl mx-auto"}`}>
            {filteredPosts.length === 0 ? (
              <p className="text-center text-gray-400">No posts match your filters. Try adjusting them.</p>
            ) : (
              filteredPosts.map((post, index) => (
                <React.Fragment key={index}>
                  <PostCard {...post} />
                  {renderRecapBox(index)}
                </React.Fragment>
              ))
            )}
          </div>

          {windowWidth > 1410 && (
            <div className="w-[540px] relative translate-x-36">
              <RecapBox
                summary={`Today saw multiple posts from White House figures and Truth Social. Key highlights include new executive orders on trade, commentary on market conditions, and responses to global events. The market showed moderate reaction with mixed sentiment across equities and currencies. Stay tuned for further updates as the day progresses.`}
                lastUpdated="2:15 PM"
              />
            </div>
          )}
        </div>
      )}

      <footer className="mt-16 text-center text-xs text-[#6FCF97]">
        🦅 Powered by <span className="font-semibold animate-breathe">EagleEye AI</span>
      </footer>
    </main>
  );
}
