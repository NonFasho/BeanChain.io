import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./DevExplorer.css";

const DevExplorer = () => {
  const [blockHeight, setBlockHeight] = useState("");
  const [txHash, setTxHash] = useState("");
  const [blockData, setBlockData] = useState({});
  const [txData, setTxData] = useState({});
  const [error, setError] = useState(null);

  const fetchBlock = async () => {
    const body = JSON.stringify({ height: parseInt(blockHeight) });
    const headers = { "Content-Type": "application/json" };

    try {
      const [gpnRes, pnRes] = await Promise.allSettled([
        fetch("https://gpn.beanchain.io/api/block", { method: "POST", headers, body }),
        fetch("https://limabean.xyz/api/block", { method: "POST", headers, body }),
      ]);

      const gpn = gpnRes.status === "fulfilled"
        ? await gpnRes.value.text()
        : `❌ GPN error: ${gpnRes.reason}`;

      const pn = pnRes.status === "fulfilled"
        ? await pnRes.value.text()
        : `❌ PN error: ${pnRes.reason}`;

      setBlockData({ gpn, pn });
      setError(null);
    } catch (e) {
      setError("Unexpected error comparing blocks.");
      console.error(e);
    }
  };

  const fetchTx = async () => {
    const body = JSON.stringify({ txHash });
    const headers = { "Content-Type": "application/json" };

    try {
      const [gpnRes, pnRes] = await Promise.allSettled([
        fetch("https://gpn.beanchain.io/api/transaction", { method: "POST", headers, body }),
        fetch("https://limabean.xyz/api/transaction", { method: "POST", headers, body }),
      ]);

      const gpn = gpnRes.status === "fulfilled"
        ? await gpnRes.value.text()
        : `❌ GPN error: ${gpnRes.reason}`;

      const pn = pnRes.status === "fulfilled"
        ? await pnRes.value.text()
        : `❌ PN error: ${pnRes.reason}`;

      setTxData({ gpn, pn });
      setError(null);
    } catch (e) {
      setError("Unexpected error comparing TXs.");
      console.error(e);
    }
  };

  return (
    <div className="dev-explorer">
      <h1>🧪 Dev Explorer</h1>

      <div className="explorer-input">
        <label>Block Height:</label>
        <input value={blockHeight} onChange={e => setBlockHeight(e.target.value)} />
        <button onClick={fetchBlock}>Compare Block</button>
      </div>

      <div className="explorer-input">
        <label>TX Hash:</label>
        <input value={txHash} onChange={e => setTxHash(e.target.value)} />
        <button onClick={fetchTx}>Compare TX</button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className="explorer-output-grid">
        <div>
          <h3>📦 GPN Block</h3>
          <SyntaxHighlighter language="json" style={oneDark}>
            {blockData.gpn || "{}"}
          </SyntaxHighlighter>

          <h3>🔗 GPN TX</h3>
          <SyntaxHighlighter language="json" style={oneDark}>
            {txData.gpn || "{}"}
          </SyntaxHighlighter>
        </div>
        <div>
          <h3>📦 PN Block</h3>
          <SyntaxHighlighter language="json" style={oneDark}>
            {blockData.pn || "{}"}
          </SyntaxHighlighter>

          <h3>🔗 PN TX</h3>
          <SyntaxHighlighter language="json" style={oneDark}>
            {txData.pn || "{}"}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default DevExplorer;

