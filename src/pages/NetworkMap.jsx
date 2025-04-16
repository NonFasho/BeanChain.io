import React, { useState, useEffect } from "react";
import "./NetworkMap.css";
import "../styles/variables.css";
import { useNavigate } from 'react-router-dom';

const Arrow = ({ 
    fromId, 
    toId, 
    visible, 
    padding = 20, 
    color = "#00ffee", 
    orbColor = "#00ffee", 
    bidirectional = false,
    forwardOrbColor = orbColor,
    reverseOrbColor = orbColor,
    thirdOrbColor = null

}) => {
  const [line, setLine] = useState(null);
  const uid = `${fromId}-${toId}`;
  const markerId = `arrowhead-${uid}`;
  const lineId = `arrow-line-${uid}`;

  useEffect(() => {
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);
    const containerEl = document.querySelector(".map-area");

    if (fromEl && toEl && containerEl) {
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();

      const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
      const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
      const x2 = toRect.left + toRect.width / 2 - containerRect.left;
      const y2 = toRect.top + toRect.height / 2 - containerRect.top;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ux = dx / dist;
      const uy = dy / dist;

      const px = padding * ux;
      const py = padding * uy;

      setLine({
        x1: x1 + px,
        y1: y1 + py,
        x2: x2 - px,
        y2: y2 - py,
        markerId,
        lineId,
      });
    }
  }, [fromId, toId, visible, padding]);

  if (!line || !visible) return null;

  return (
    <>
      <path
        id={line.lineId}
        d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
        stroke={color}
        strokeWidth="2"
        fill="none"
        />

        {/* Forward orb */}
        <circle r="5" fill={forwardOrbColor}>
        <animateMotion dur="1.8s" repeatCount="indefinite">
            <mpath href={`#${line.lineId}`} />
        </animateMotion>
        <animate attributeName="r" values="4;6;4" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur="0.6s" repeatCount="indefinite" />
        </circle>

        {/* Reverse orb if bidirectional */}
        {bidirectional && (
        <circle r="5" fill={reverseOrbColor}>
            <animateMotion dur="1.8s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1">
            <mpath href={`#${line.lineId}`} />
            </animateMotion>
            <animate attributeName="r" values="4;6;4" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;1;0.5" dur="0.6s" repeatCount="indefinite" />
        </circle>
        )}
    </>
  );
};

const NetworkMap = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [gpnAnim, setGpnAnim] = useState(false);
  const [waAnim, setWaAnim] = useState(false);
  const [rnAnim, setRnAnim] = useState(false);
  const [prnAnim, setPrnAnim] = useState(false);
  const [pnAnim, setPnAnim] = useState(false);
  const [cenAnim, setCenAnim] = useState(false);
  const [cappAnim, setCappAnim] = useState(false);
  const [lastAnim, setLastAnim] = useState(false);
  const [activeValidatorIndex, setActiveValidatorIndex] = useState(0);
  const validatorIds = ["gpn", "pn", "prn"];


  const stepInfo = {
    0: "Click 'Start' to learn a bit about the BeanChain network.",
    1: "The Genesis Public Node (GPN) is the core entry point to BeanChain.",
    2: "Wallet apps for  user interaction with the chain, like our core-team created 'LimaBean Wallet' at LimaBean.xyz.",
    3: "The Reward Node (RN) distributes air-drop rewards: early wallet, faucet drip, validator gas rewards, etc.",
    4: "Private User Nodes (PRNs) are participants who run their own validation nodes, connecting into the network but not publically acessible for information.",
    5: "Public Nodes (PNs) are fully accesible nodes, similar to the  GPN with public APIs but run by third parties. Most likely to be run by developers of third party projects building on BeanChain.",
    6: "A user initiates a TX from a wallet app, which is submitted to the GPN (or any open PN in the network) via a public API",
    7: "The Node that recieved the TX then routes it to the RN and all known PRNs and PNs for processing, via network gossip.",
    8: "The Reward Node sends back a reward transaction to the GPN, which gossips it to connected Nodes.",
    9: "Once TX begin to build up in the network mempool (memory pool), we need a way for our validator nodes to stake BEAN to be selected to build a block. Thats where our Contract Execution Node (CEN) first comes in building our Layer 2",
    10: "A contract app will let users send a ContractCall to a CEN via public APIs, like a validator calling the StakeContract to stake BEAN.",
    11: "The CEN uses contract logic to parse the ContractCall and initiate logic. Most contracts will initiate and auto build TX. Which will then be sent to the GPN (or any PN that CEN is set to) and gossiped to the network.",
    12: "All staking validator nodes are added to the validator list and selected based on BEAN staked and node reliability to create and push a new block.",
    13: "The new block is gossiped, validated, and added by each node. A reward for a valid block (from TX gas fees) is rewarded to the validator via a RN TX.",
    14: "Together these pieces create the BeanMesh.",
    15: "Once the initial BeanCluster is formed and running thats when the true fun begins.",
    16: "Developers can build contracts to add to an CEN through custom build contract submisson apps, host their own User Developed CEN (UDCEN), build wallet/contract/explorer/minting applications of all kinds. Validators and projects can run nodes and earn rewards for network participation. Users can use the growing ecosystem of applications to do anything you can imagine on chain, powered by BEAN. Welcome to BeanChain. Contact us to get involved.",
  };
  

  useEffect(() => {
    if (step >= 1 && !gpnAnim) setTimeout(() => setGpnAnim(true), 10);
  }, [step]);

  useEffect(() => {
    if (step >= 2 && !waAnim) setTimeout(() => setWaAnim(true), 10);
  }, [step]);

  useEffect(() => {
    if (step >= 3 && !rnAnim) setTimeout(() => setRnAnim(true), 10);
  }, [step]);

  useEffect(() => {
    if (step >= 4 && !prnAnim) setTimeout(() => setPrnAnim(true), 10);
  }, [step]);

  useEffect(() => {
    if (step >= 5 && !pnAnim) setTimeout(() => setPnAnim(true), 10);
  }, [step]);

  useEffect(() => {
    if (step >= 9 && !cenAnim) setTimeout(() => setCenAnim(true), 10);
  }, [step]);

  useEffect(() => {
    if (step >= 10 && !cappAnim) setTimeout(() => setCappAnim(true), 10);
  }, [step]);

  useEffect(() => {
    if (step >= 16 && !lastAnim) setTimeout(() => setLastAnim(true), 10);
  }, [step]);

  useEffect(() => {
    if (step === 12) {
      const interval = setInterval(() => {
        setActiveValidatorIndex((prev) => (prev + 1) % validatorIds.length);
      }, 1200); // change every 1.2s
      return () => clearInterval(interval);
    } else {
      setActiveValidatorIndex(null);
    }
  }, [step]);

  return (
    <>
    <div className="head">
      <img src='/texture1.jpg' />
      <h1 onClick={() => navigate('/page/main-home')}>BEANCHAIN NETWORK</h1>
    </div>
    <div className="network-map-container">
      <img src='/mesh-bg.jpg' />
      <div className="map-area">
        {/* Marker definitions */}
        <svg style={{ height: 0, width: 0, position: "absolute" }}>
            <defs>
                {[
                { uid: "wallet-gpn", color: "#00ffee" },
                { uid: "gpn-rn", color: "#00ffee" },
                { uid: "gpn-prn", color: "#00ffee" },
                { uid: "rn-gpn", color: "#ffd700" },
                { uid: "gpn-prn-reward", color: "#ffd700" }
                ].map(({ uid, color }) => (
                <marker
                    key={uid}
                    id={`arrowhead-${uid}`}
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                >
                    <polygon points="0 0, 10 3.5, 0 7" fill={color} />
                </marker>
                ))}
            </defs>
        </svg>


        {/* Nodes */}
        {step >= 1 && (
          <div
            id="gpn"
            className={`node-box gpn-box ${gpnAnim ? "slide-right-float-settle" : ""} ${
                step === 12 && validatorIds[activeValidatorIndex] === "gpn" ? "validator-cycle" : ""
            }`}
          >
            GENESIS PUBLIC NODE (GPN)
          </div>
        )}
        {step >= 2 && (
          <div
            id="wallet"
            className={`node-box wallet-app-box ${waAnim ? "slide-down-float-settle" : ""}`}
          >
            WALLET APPS
          </div>
        )}
        {step >= 3 && (
          <div id="rn" className={`node-box rn-box ${rnAnim ? "slide-left-float-settle" : ""}`}>
            REWARD NODE (RN)
          </div>
        )}
        {step >= 4 && (
            <>
                <div
                    id="prn"
                    className={`node-box prn-box ${rnAnim ? "slide-down-float-settle" : ""} ${
                        step >= 7 ? "pulse-prn" : ""
                    } ${
                        ((step === 12 && validatorIds[activeValidatorIndex] === "prn") || step === 13) ? "validator-cycle" : ""
                    }`}
                >
                    PRIVATE USER NODE (PRN)
                </div>


                {/* Dummy anchor div for accurate arrow targeting */}
                <div
                id="prn-reward"
                style={{
                    position: "absolute",
                    width: "0px",
                    height: "0px",
                    top: "0px",
                    left: "0px",
                }}
                ref={(el) => {
                    const prnEl = document.getElementById("prn");
                    if (el && prnEl) {
                    const prnRect = prnEl.getBoundingClientRect();
                    const containerRect = document.querySelector(".map-area").getBoundingClientRect();

                    el.style.left = `${prnRect.left + prnRect.width / 2 - containerRect.left}px`;
                    el.style.top = `${prnRect.top + prnRect.height / 2 - containerRect.top}px`;
                    }
                }}
                />
            </>
        )}

        {step >= 5 && (
            <div
                id="pn"
                className={`node-box pn-box ${pnAnim ? "slide-down-float-settle" : ""} ${
                step === 12 && validatorIds[activeValidatorIndex] === "pn" ? "validator-cycle" : ""
                }`}
            >
                PUBLIC NODE (PN)
            </div>
          
        )}

        {/* Arrows in one overlay SVG */}
        <svg className="arrow-overlay">
            {step === 6 && (
                <>
                    <Arrow fromId="wallet" toId="gpn" visible={true}  />
                    <Arrow fromId="wallet" toId="pn" visible={true}  />
                </>
            )}


            {step === 7 && (
                <>
                    <Arrow fromId="gpn" toId="rn" visible={true}  />
                    <Arrow fromId="gpn" toId="prn" visible={true}  bidirectional={true}/>
                    <Arrow fromId="gpn" toId="pn" visible={true}  bidirectional={true}/>
                    <Arrow fromId="pn" toId="prn" visible={true}  bidirectional={true}/>
                </>
            )}

            {step === 8 && (
                <>
                <Arrow
                    fromId="rn" 
                    toId="gpn"
                    visible={true}
                    
                    color="#ffd700"
                    orbColor="#ffd700"
                />
                <Arrow
                    fromId="gpn"
                    toId="prn-reward"
                    visible={true}
                    
                    bidirectional={true}
                    color="#ffd700"
                    forwardOrbColor="#ffd700"
                />
                <Arrow
                    fromId="gpn"
                    toId="pn"
                    visible={true}
                    
                    bidirectional={true}
                    color="#ffd700"
                    forwardOrbColor="#ffd700"
                />
                <Arrow
                    fromId="pn"
                    toId="prn"
                    visible={true}
                    
                    bidirectional={true}
                    color="#ffd700"
                    forwardOrbColor="#ffd700"
                />
                </>
            )}
            {step === 10 && document.getElementById("c-app") && (
                <Arrow
                fromId="c-app"
                toId="cen"
                visible={true}
                
                color= "#d15cff"
                orbColor="#d15cff"
                />
            )}
            {step === 11 && (
                <>
                    <Arrow
                    fromId="cen"
                    toId="gpn"
                    visible={true}
                    
                    color= "#d15cff"
                    orbColor="#d15cff"
                    />
                    <Arrow
                    fromId="gpn"
                    toId="pn"
                    visible={true}
                    
                    bidirectional={true}
                    color= "#d15cff"
                    forwardOrbColor="#d15cff"
                    />
                    <Arrow
                    fromId="gpn"
                    toId="rn"
                    visible={true}
                    
                    bidirectional={true}
                    color= "#d15cff"
                    orbColor="#d15cff"
                    reverseOrbColor="#ffd700"
                    />
                    <Arrow
                    fromId="gpn"
                    toId="prn"
                    visible={true}
                    
                    bidirectional={true}
                    color= "#d15cff"
                    forwardOrbColor="#d15cff"
                    />
                    <Arrow
                    fromId="pn"
                    toId="prn"
                    visible={true}
                    
                    bidirectional={true}
                    color= "#d15cff"
                    orbColor="#d15cff"
                    />
                
                </>
            )}
            {step === 13 && (
                <>
                    <Arrow
                    fromId="prn"
                    toId="pn"
                    visible={true}
                    
                    bidirectional={true}
                    />
                    <Arrow
                    fromId="prn"
                    toId="gpn"
                    visible={true}
                    
                    bidirectional={true}
                    />
                    <Arrow
                    fromId="gpn"
                    toId="pn"
                    visible={true}
                    
                    bidirectional={true}
                    />
                    <Arrow
                    fromId="rn" 
                    toId="gpn"
                    visible={true}
                    
                    bidirectional={true}
                    color="#ffd700"
                    forwardOrbColor="#ffd700"
                    />


                </>
            )}
            {(step >= 14) && (
                <>
                    <Arrow
                    fromId="prn"
                    toId="pn"
                    visible={true}
                    
                    bidirectional={true}
                    />
                    <Arrow
                    fromId="prn"
                    toId="gpn"
                    visible={true}
                    
                    bidirectional={true}
                    />
                    <Arrow
                    fromId="gpn"
                    toId="pn"
                    visible={true}
                    
                    bidirectional={true}
                    />
                    <Arrow
                    fromId="rn" 
                    toId="gpn"
                    visible={true}
                    
                    bidirectional={true}
                    color="#ffd700"
                    forwardOrbColor="#ffd700"
                    />
                    <Arrow
                    fromId="cen"
                    toId="gpn"
                    visible={true}
                    
                    color= "#d15cff"
                    orbColor="#d15cff"
                    />
                    <Arrow
                    fromId="c-app"
                    toId="cen"
                    visible={true}
                    
                    color= "#d15cff"
                    orbColor="#d15cff"
                    />
                    <Arrow fromId="c-app" toId="gpn" visible={true}  />
                    <Arrow fromId="c-app" toId="pn" visible={true}  />
                
                </>
            )}
            {step === 16 && (
                <>
                    <Arrow
                    fromId="udcen"
                    toId="pn"
                    visible={true}
                    
                    color= "#d15cff"
                    orbColor="#d15cff"
                    />
                    <Arrow
                    fromId="csa-box"
                    toId="cen"
                    visible={true}
                    
                    color= "#d15cff"
                    orbColor="#d15cff"
                    />
                    <Arrow
                    fromId="csa-box"
                    toId="udcen"
                    visible={true}
                    
                    color= "#d15cff"
                    orbColor="#d15cff"
                    />
                    <Arrow
                    fromId="c-app"
                    toId="udcen"
                    visible={true}
                    
                    color= "#d15cff"
                    orbColor="#d15cff"
                    />
                    <Arrow
                    fromId="wallet"
                    toId="node1"
                    visible={true}
                    
                    />
                    <Arrow
                    fromId="node1"
                    toId="pn"
                    visible={true}
                    
                    bidirectional={true}
                    />
                    <Arrow
                    fromId="node1"
                    toId="prn"
                    visible={true}
                    
                    bidirectional={true}
                    />
                    <Arrow
                    fromId="dev"
                    toId="prn"
                    visible={true}
                   
                    bidirectional={true}
                    />
                    <Arrow
                    fromId="dev"
                    toId="pn"
                    visible={true}
                    
                    bidirectional={true}
                    />
                
                </>
            )}
        </svg>
        {step >= 9 && (
            <div
                id="cen"
                className={`node-box cen-box ${cenAnim ? "slide-right-float-settle" : ""}`}
            >
                CONTRACT EXECUTION NODE (CEN)
            </div>   
        )}
        {step >= 10 && (
            <div
                id="c-app"
                className={`node-box capp-box ${cappAnim ? "grow-settle" : ""}`}
            >
                CONTRACT APP
            </div>   
        )}
        {step >= 15 && (
            <div className="cluster-frame">
                <span className="cluster-label">BEAN CLUSTER</span>
            </div>
        )}
        {step === 16 && (
            <>
            <div
                id="udcen"
                className={`node-box udcen-box ${lastAnim ? "grow-settle" : ""}`}
            >
                UDCEN
            </div>
            <div
                id="csa-box"
                className={`node-box csa-box ${lastAnim ? "grow-settle" : ""}`}
            >
                CONTRACT SUBMISSION APP
            </div>
            <div
                id="dev"
                className={`node-box dev-box ${lastAnim ? "grow-settle" : ""}`}
            >
                DEV APP
            </div>    
            <div
                id="node1"
                className={`node-box node1 ${lastAnim ? "grow-settle" : ""}`}
            >
                PN
            </div>       
            </>
        )}


      </div>

        
      <div className="button-row">
        {(step > 0)&& (
          <button className="nav-button" onClick={() => setStep(step - 1)}>
            Previous
          </button>
        )}
        {(step < 16) && (
            <button className="nav-button" onClick={() => setStep(step + 1)}>
                {step === 0 ? "Start" : "Next"}
            </button>
        )}
        {step === 16 && (
            <button
                className="nav-button"
                onClick={() => window.open('https://limabean.xyz', '_blank')}
            >
                Test LimaBean Wallet
            </button>
        )}
      </div>
      <div className="info-container">
        <div className="step-info-box">
        <img src='/texture1.jpg' />
            <p>{stepInfo[step]}</p>
        </div>
      </div>

    </div>
    <footer className="app-footer">
      <p>© 2025 BeanChain Network • <a href="https://limabean.xyz">LimaBean*Wallet</a></p>
    </footer>
    </>
  );
};

export default NetworkMap;

  
  
  