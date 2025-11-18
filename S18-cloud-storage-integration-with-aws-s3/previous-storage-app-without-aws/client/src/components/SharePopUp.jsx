import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SharePopUp = ({ textToCopy, showSharePopup, setShowSharePopup }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500); // Reset the 'Copied!' state after 1.5 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback or user notification for failure
    }
  };
  return (
    <div
      onClick={(e) => {
        if (e.target.className !== "share-popup") return;
        setShowSharePopup(!showSharePopup);
      }}
      id="share-popup"
      className="share-popup"
      style={{ display: `${showSharePopup ? "flex" : "none"}` }}>
      <div>
        <div>
          <p id="share-url"> {textToCopy} </p>
          <p onClick={handleCopy}>
            {isCopied ? "✅ Copied!" : <i className="ri-file-copy-2-line"></i>}
          </p>
        </div>
        <div id="share-icons">
          <Link to={`whatsapp://send?phone&text=${textToCopy}`}>
            <div>
              <i className="ri-whatsapp-line whatsapp-icon"></i>
            </div>
            <span>Share With Whatsapp</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharePopUp;
