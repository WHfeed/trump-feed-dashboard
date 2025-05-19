import React, { useState } from "react";

const faqs = [
  {
    question: "Where does the information come from?",
    answer: "We pull directly from official U.S. government sources — including press releases, agency feeds, and verified public social posts from political figures.",
  },
  {
    question: "What is EagleEye and how does it work?",
    answer: "EagleEye is our custom-built AI that analyzes each post in real time. It summarizes the message, detects sentiment, and flags potential market or political impact — all within seconds of publication.",
  },
  {
    question: "How are impact scores calculated?",
    answer: "Each post is rated from 1 to 5 for potential relevance to markets or policy. A 5 means likely market-moving; a 1 means minimal or background-level importance. This is a heuristic, not a prediction.",
  },
  {
    question: "Can I filter the feed by tag or impact level?",
    answer: "Yes. You can filter by source, political figure, keyword, and impact score. This lets you focus only on posts that matter to you.",
  },
  {
    question: "What do the tags mean?",
    answer: "Tags group posts by theme — like “Stock Market,” “Immigration,” or “Foreign Policy.” These are generated based on the content’s core topic.",
  },
  {
    question: "How often is the feed updated?",
    answer: "Every 30 seconds. We continuously check for new posts and display them in real time once they’re analyzed.",
  },
  {
    question: "Is this content fact-checked?",
    answer: "Summaries and insights are AI-generated and not independently fact-checked. We aim for clarity and accuracy, but errors can occur.",
  },
  {
    question: "Can I use this for trading decisions?",
    answer: "We do not recommend using this site as a sole source for financial decisions. It’s meant to provide fast, structured information — not investment advice.",
  },
  {
    question: "How accurate is the AI?",
    answer: "EagleEye is designed for speed and clarity, not perfection. It’s good at distilling key messages, but not every nuance is always captured. We’re constantly improving it.",
  },
  {
    question: "Is the website free of charge?",
    answer: "Yes — White House Feed is currently free to use, and we don’t run any ads. As we move out of the beta phase, this may change, but for now everything is fully open.",
  },
];

export default function FaqPanel({ isOpen, onClose }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {/* Background dim + blur */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />

      {/* FAQ panel */}
      <div className={`absolute top-[48px] left-0 w-full max-h-[calc(100vh-48px)] overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="bg-[#0F171F] bg-opacity-95 border-t border-[#6a805b] p-8 text-[#E3DCCF] shadow-lg max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-wide">Frequently Asked Questions</h2>
            <button onClick={onClose} className="text-orange-400 font-semibold hover:underline text-sm">
              Close ✕
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#1B1F19] pb-2">
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left text-[#6FCF97] font-semibold text-base hover:underline focus:outline-none"
                >
                  {faq.question}
                </button>
                {openIndex === index && (
                  <p className="text-sm text-[#E3DCCF] mt-2 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
