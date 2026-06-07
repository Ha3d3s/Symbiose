import { useState, useEffect } from "react";

// ── Animals ───────────────────────────────────────────────────────────────────
const ANIMALS = [
  { id: "dragonfly", name: "Libellule",  color: "#f9a8d4", light: "#fce7f3", accent: "#ec4899" },
  { id: "frog",      name: "Grenouille", color: "#86efac", light: "#dcfce7", accent: "#16a34a" },
  { id: "koi",       name: "Koï",        color: "#fdba74", light: "#ffedd5", accent: "#f97316" },
  { id: "snail",     name: "Escargot",   color: "#93c5fd", light: "#dbeafe", accent: "#2563eb" },
];

// ── SVGs ──────────────────────────────────────────────────────────────────────
const SVG_DRAGONFLY = (
  <svg viewBox="0 0 60 60" fill="none" style={{width:"100%",height:"100%"}}>
    <ellipse cx="30" cy="32" rx="3" ry="14" fill="#be185d" opacity="0.9"/>
    <ellipse cx="30" cy="28" rx="4" ry="4" fill="#be185d"/>
    <ellipse cx="17" cy="24" rx="13" ry="6" fill="#fbcfe8" opacity="0.75" transform="rotate(-18 17 24)"/>
    <ellipse cx="43" cy="24" rx="13" ry="6" fill="#fbcfe8" opacity="0.75" transform="rotate(18 43 24)"/>
    <ellipse cx="15" cy="33" rx="12" ry="5" fill="#f9a8d4" opacity="0.6" transform="rotate(-10 15 33)"/>
    <ellipse cx="45" cy="33" rx="12" ry="5" fill="#f9a8d4" opacity="0.6" transform="rotate(10 45 33)"/>
    <circle cx="28" cy="27" r="2" fill="white" opacity="0.9"/>
    <circle cx="32" cy="27" r="2" fill="white" opacity="0.9"/>
  </svg>
);
const SVG_FROG = (
  <svg viewBox="0 0 60 60" fill="none" style={{width:"100%",height:"100%"}}>
    <ellipse cx="30" cy="36" rx="16" ry="12" fill="#16a34a"/>
    <circle cx="20" cy="22" r="8" fill="#16a34a"/>
    <circle cx="40" cy="22" r="8" fill="#16a34a"/>
    <circle cx="20" cy="22" r="4.5" fill="#bbf7d0"/>
    <circle cx="40" cy="22" r="4.5" fill="#bbf7d0"/>
    <circle cx="20" cy="22" r="2.2" fill="#14532d"/>
    <circle cx="40" cy="22" r="2.2" fill="#14532d"/>
    <path d="M23 41 Q30 47 37 41" stroke="#bbf7d0" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    <ellipse cx="14" cy="46" rx="8" ry="3.5" fill="#15803d" transform="rotate(-22 14 46)"/>
    <ellipse cx="46" cy="46" rx="8" ry="3.5" fill="#15803d" transform="rotate(22 46 46)"/>
  </svg>
);
const SVG_KOI = (
  <svg viewBox="0 0 60 60" fill="none" style={{width:"100%",height:"100%"}}>
    <path d="M10 30 Q25 10 46 24 Q56 30 46 36 Q25 50 10 30Z" fill="#ea580c"/>
    <path d="M43 24 Q53 19 56 30 Q53 41 43 36Z" fill="#fdba74"/>
    <path d="M10 30 Q4 20 2 30 Q4 40 10 30Z" fill="#fdba74"/>
    <path d="M16 27 Q26 21 39 25" stroke="#fff7ed" strokeWidth="1.5" fill="none" opacity="0.7"/>
    <path d="M16 33 Q26 39 39 35" stroke="#fff7ed" strokeWidth="1.5" fill="none" opacity="0.7"/>
    <circle cx="16" cy="30" r="3.5" fill="white"/>
    <circle cx="16" cy="30" r="1.8" fill="#1c1917"/>
    <circle cx="15.2" cy="29.2" r="0.8" fill="white"/>
  </svg>
);
const SVG_SNAIL = (
  <svg viewBox="0 0 60 60" fill="none" style={{width:"100%",height:"100%"}}>
    <ellipse cx="22" cy="41" rx="19" ry="8" fill="#bfdbfe"/>
    <circle cx="38" cy="27" r="17" fill="#93c5fd" opacity="0.25" stroke="#3b82f6" strokeWidth="1.5"/>
    <circle cx="38" cy="27" r="12" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.55"/>
    <circle cx="38" cy="27" r="7.5" fill="none" stroke="#1d4ed8" strokeWidth="1.5" opacity="0.45"/>
    <circle cx="38" cy="27" r="3.5" fill="#1d4ed8" opacity="0.35"/>
    <path d="M8 41 Q13 29 23 32" stroke="#93c5fd" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="11" cy="31" r="1.8" fill="#bfdbfe"/>
    <circle cx="8"  cy="27" r="1.5" fill="#93c5fd"/>
    <circle cx="16" cy="28" r="1.8" fill="#bfdbfe"/>
    <circle cx="20" cy="25" r="1.5" fill="#93c5fd"/>
  </svg>
);
const SVGS = { dragonfly: SVG_DRAGONFLY, frog: SVG_FROG, koi: SVG_KOI, snail: SVG_SNAIL };

// ── Decorative ────────────────────────────────────────────────────────────────
const FloralBg = ({ color }) => (
  <svg viewBox="0 0 200 200" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.14,pointerEvents:"none"}}>
    {[...Array(14)].map((_,i) => <circle key={i} cx={(i*37+15)%190} cy={(i*53+20)%190} r={4+(i%4)*2} fill={color}/>)}
    {[...Array(8)].map((_,i) => (
      <g key={i} transform={`translate(${(i*71+30)%175},${(i*43+40)%175})`}>
        {[0,72,144,216,288].map(a => <ellipse key={a} cx={0} cy={-7} rx={3} ry={5.5} fill={color} transform={`rotate(${a})`} opacity={0.65}/>)}
      </g>
    ))}
  </svg>
);

const Confetti = ({ color }) => {
  const colors = [color, "#fbbf24", "#a78bfa", "#34d399", "#fb7185", "#38bdf8"];
  const pieces = [...Array(40)].map((_,i) => ({
    left: `${(i * 137) % 100}%`,
    delay: `${(i * 0.05).toFixed(2)}s`,
    size: 5 + (i % 6) * 3,
    rot: (i * 47) % 360,
    bg: colors[i % colors.length],
  }));
  return (
    <div style={{position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:299}}>
      {pieces.map((p,i) => (
        <div key={i} style={{
          position:"absolute", top:-24, left:p.left,
          width:p.size, height:p.size, background:p.bg,
          borderRadius: p.size % 3 === 0 ? "50%" : "2px",
          transform:`rotate(${p.rot}deg)`,
          animation:`confettiFall 2.6s ${p.delay} ease-in forwards`,
        }}/>
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0)      rotate(0deg);   opacity: 1; }
          100% { transform: translateY(110vh)  rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// ── Storage / helpers ─────────────────────────────────────────────────────────
const GROUPS_KEY  = "symbiose_groups_v4";
const HISTORY_KEY = "symbiose_history_v4";

const blankScores  = () => Object.fromEntries(ANIMALS.map(a => [a.id, [["","","",""],["","","",""]]]));
const sumGrid      = grid => grid.flat().reduce((s, v) => s + (parseInt(v) || 0), 0);
const gridComplete = grid => grid.flat().every(v => v !== "");
const gameComplete = s => ANIMALS.every(a => gridComplete(s[a.id]));
const blankAssign  = () => Object.fromEntries(ANIMALS.map(a => [a.id, null]));

// ═════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("game"); // "game" | "groups" | "history"

  // ── Groups ─────────────────────────────────────────────────────────────────
  const [groups, setGroups] = useState(() => {
    try { return JSON.parse(localStorage.getItem(GROUPS_KEY)) || []; } catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem(GROUPS_KEY, JSON.stringify(groups)); } catch {} }, [groups]);
  const [groupEditor, setGroupEditor] = useState(null); // null | { mode, id?, name, players }

  // ── Game ───────────────────────────────────────────────────────────────────
  // phase: "setup" | "playing" | "ended"
  const [phase, setPhase]         = useState("setup");
  const [assignment, setAssignment] = useState(blankAssign()); // animalId → playerName|null
  const [scores, setScores]         = useState(blankScores());
  const [active, setActive]         = useState(null); // { animalId, row, col }
  const [inputVal, setInputVal]     = useState("");
  const [winner, setWinner]         = useState(null); // snap saved on game end

  // ── History ────────────────────────────────────────────────────────────────
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch {} }, [history]);
  const [confirmReset, setConfirmReset] = useState(false);

  // ── Derived ────────────────────────────────────────────────────────────────
  const allPlayers     = [...new Set(groups.flatMap(g => g.players))];
  const assignedNames  = Object.values(assignment).filter(Boolean);
  const setupComplete  = ANIMALS.every(a => assignment[a.id]);

  // ── Group editor ───────────────────────────────────────────────────────────
  const openNewGroup  = () => setGroupEditor({ mode:"new",  name:"", players:["",""] });
  const openEditGroup = (g) => setGroupEditor({ mode:"edit", id:g.id, name:g.name, players:[...g.players] });

  const saveGroup = () => {
    const name    = groupEditor.name.trim();
    const players = groupEditor.players.map(p => p.trim()).filter(Boolean);
    if (!name || players.length < 2) return;
    if (groupEditor.mode === "new") {
      setGroups(prev => [...prev, { id: Date.now().toString(), name, players }]);
    } else {
      setGroups(prev => prev.map(g => g.id === groupEditor.id ? { ...g, name, players } : g));
    }
    setGroupEditor(null);
  };

  // ── Game flow ──────────────────────────────────────────────────────────────
  // Quick-start: pre-fill assignment from a group in order of animals
  const quickStart = (groupId) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    const a = blankAssign();
    group.players.forEach((p, i) => { if (i < ANIMALS.length) a[ANIMALS[i].id] = p; });
    setAssignment(a);
    setView("game");
  };

  const launchGame = () => {
    setScores(blankScores());
    setActive(null);
    setWinner(null);
    setPhase("playing");
  };

  const resetToSetup = () => {
    setPhase("setup");
    setAssignment(blankAssign());
    setScores(blankScores());
    setActive(null);
    setWinner(null);
  };

  // ── Numpad ─────────────────────────────────────────────────────────────────
  const openCell = (animalId, row, col) => {
    if (phase !== "playing") return;
    setActive({ animalId, row, col });
    setInputVal(scores[animalId][row][col] || "");
  };

  const numpad = (d) => {
    if (!active) return;
    if (d === "⌫") { setInputVal(v => v.slice(0, -1)); return; }
    if (d === "✕") { setActive(null); setInputVal(""); return; }
    if (d === "✓") {
      const { animalId, row, col } = active;
      const updated = {
        ...scores,
        [animalId]: scores[animalId].map((r, ri) =>
          ri === row ? r.map((c, ci) => ci === col ? inputVal : c) : r
        ),
      };
      setScores(updated);
      setActive(null);
      setInputVal("");
      // Check game end
      if (gameComplete(updated)) {
        const winAnimal = ANIMALS.reduce((best, a) =>
          sumGrid(updated[a.id]) > sumGrid(updated[best.id]) ? a : best
        );
        const snap = {
          date:       new Date().toLocaleString("fr-FR"),
          winnerId:   winAnimal.id,
          winnerName: assignment[winAnimal.id],
          slots:      Object.fromEntries(ANIMALS.map(a => [a.id, {
            player: assignment[a.id],
            total:  sumGrid(updated[a.id]),
          }])),
        };
        setHistory(prev => [snap, ...prev].slice(0, 60));
        setWinner({ animal: winAnimal, snap });
        setPhase("ended");
      }
      return;
    }
    setInputVal(v => (v + d).slice(0, 4));
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const stats = (() => {
    const wins = {}, bests = {};
    history.forEach(entry => {
      const wn = entry.winnerName || "?";
      wins[wn] = (wins[wn] || 0) + 1;
      Object.values(entry.slots).forEach(({ player, total }) => {
        if (player && (!bests[player] || total > bests[player])) bests[player] = total;
      });
    });
    return {
      gamesPlayed: history.length,
      topWinner:   Object.entries(wins).sort((a, b) => b[1] - a[1])[0],
      topScore:    Object.entries(bests).sort((a, b) => b[1] - a[1])[0],
      wins, bests,
    };
  })();

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(145deg,#fce7f3 0%,#f0fdf4 40%,#eff6ff 75%,#fff7ed 100%)",
      fontFamily: "'Georgia','Times New Roman',serif",
      position: "relative",
      overflowX: "hidden",
    }}>

      {/* ── Floating bg dots ── */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        {[...Array(24)].map((_, i) => (
          <div key={i} style={{
            position:"absolute", borderRadius:"50%",
            width: 5+(i%5)*5, height: 5+(i%5)*5,
            left: `${(i*137)%100}%`, top: `${(i*97)%100}%`,
            background: ANIMALS[i%4].color, opacity: 0.18,
          }}/>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"18px 16px 10px"}}>
        {/* Animal icons row */}
        <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:6}}>
          {ANIMALS.map(a => (
            <div key={a.id} style={{
              width:30, height:30, background:a.light, borderRadius:"50%",
              border:`2px solid ${a.color}`, padding:3,
            }}>
              {SVGS[a.id]}
            </div>
          ))}
        </div>
        <h1 style={{
          margin:0, fontSize:"2rem", fontStyle:"italic",
          background:"linear-gradient(135deg,#ec4899 0%,#16a34a 40%,#f97316 70%,#2563eb 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          letterSpacing:"0.06em",
        }}>Symbiose</h1>
        <p style={{margin:"2px 0 12px",fontSize:"0.73rem",color:"#9ca3af",letterSpacing:"0.12em",textTransform:"uppercase"}}>
          Compteur de points
        </p>

        {/* Nav */}
        <div style={{display:"flex",justifyContent:"center",gap:6}}>
          {[
            { k:"game",    label:"🎮 Jeu"      },
            { k:"groups",  label:"👥 Groupes"  },
            { k:"history", label:"📜 Stats"    },
          ].map(({k, label}) => (
            <button key={k} onClick={() => setView(k)} style={{
              padding:"6px 16px", borderRadius:20, border:"none", cursor:"pointer",
              background: view===k ? "rgba(0,0,0,0.13)" : "rgba(255,255,255,0.6)",
              color: view===k ? "#374151" : "#6b7280",
              fontFamily:"inherit", fontSize:"0.79rem",
              fontWeight: view===k ? 700 : 400,
              backdropFilter:"blur(6px)",
              boxShadow: view===k ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
              transition:"all .15s",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW: JEU
      ══════════════════════════════════════════════════════════════════════ */}
      {view === "game" && (
        <div style={{position:"relative",zIndex:1,padding:"4px 12px 140px"}}>

          {/* ── SETUP ── */}
          {phase === "setup" && (
            <div style={{
              borderRadius:22, background:"rgba(255,255,255,0.78)",
              backdropFilter:"blur(12px)",
              border:"1.5px solid rgba(255,255,255,0.92)",
              padding:"20px 16px",
              boxShadow:"0 4px 24px rgba(0,0,0,0.06)",
            }}>
              <div style={{textAlign:"center",marginBottom:18}}>
                <div style={{fontSize:"1.15rem",fontWeight:700,color:"#374151"}}>⚙️ Nouvelle partie</div>
                <div style={{fontSize:"0.78rem",color:"#9ca3af",marginTop:4}}>
                  Assigne un joueur à chaque animal
                </div>
              </div>

              {/* Quick-start buttons */}
              {groups.length > 0 && (
                <div style={{marginBottom:18}}>
                  <div style={{fontSize:"0.7rem",fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>
                    ⚡ Démarrage rapide
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {groups.map(g => (
                      <button key={g.id} onClick={() => quickStart(g.id)} style={{
                        padding:"9px 14px", borderRadius:14,
                        border:"1.5px solid #e5e7eb",
                        background:"rgba(255,255,255,0.8)",
                        cursor:"pointer", fontFamily:"inherit",
                        display:"flex", alignItems:"center", justifyContent:"space-between",
                        transition:"box-shadow .15s",
                      }}>
                        <span style={{fontWeight:700,color:"#374151",fontSize:"0.88rem"}}>👥 {g.name}</span>
                        <span style={{color:"#9ca3af",fontSize:"0.74rem"}}>{g.players.slice(0,4).join(" · ")}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8,margin:"16px 0 14px",color:"#d1d5db",fontSize:"0.74rem"}}>
                    <div style={{flex:1,height:1,background:"#e5e7eb"}}/>
                    ou assigner manuellement
                    <div style={{flex:1,height:1,background:"#e5e7eb"}}/>
                  </div>
                </div>
              )}

              {/* Manual assignment selects */}
              {ANIMALS.map(animal => {
                const current = assignment[animal.id];
                const usedElsewhere = ANIMALS.filter(a => a.id !== animal.id).map(a => assignment[a.id]).filter(Boolean);
                return (
                  <div key={animal.id} style={{
                    borderRadius:14,
                    border:`2px solid ${current ? animal.accent+"99" : animal.color+"55"}`,
                    background: current ? animal.light : "rgba(255,255,255,0.55)",
                    padding:"10px 12px", marginBottom:8, transition:"all .2s",
                  }}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:36,height:36,background:animal.light,borderRadius:"50%",padding:3,border:`2px solid ${animal.color}`,flexShrink:0}}>
                        {SVGS[animal.id]}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:"0.7rem",color:animal.accent,fontStyle:"italic",fontWeight:600,marginBottom:4}}>
                          {animal.name}
                        </div>
                        <select
                          value={assignment[animal.id] || ""}
                          onChange={e => setAssignment(prev => ({ ...prev, [animal.id]: e.target.value || null }))}
                          style={{
                            width:"100%", padding:"6px 10px", borderRadius:9,
                            border:`1.5px solid ${animal.color}`, fontFamily:"inherit",
                            background:"white", fontSize:"0.87rem", color:"#374151",
                            outline:"none", cursor:"pointer",
                          }}
                        >
                          <option value="">— Choisir un joueur —</option>
                          {groups.length > 0
                            ? groups.map(g => (
                              <optgroup key={g.id} label={`👥 ${g.name}`}>
                                {g.players.map(p => (
                                  <option key={p} value={p} disabled={usedElsewhere.includes(p)}>
                                    {p}{usedElsewhere.includes(p) ? "  ✗ déjà assigné" : ""}
                                  </option>
                                ))}
                              </optgroup>
                            ))
                            : allPlayers.map(p => (
                              <option key={p} value={p} disabled={usedElsewhere.includes(p)}>{p}</option>
                            ))
                          }
                        </select>
                      </div>
                      {current && (
                        <div style={{
                          background:animal.accent, color:"white",
                          borderRadius:20, padding:"4px 11px",
                          fontSize:"0.8rem", fontWeight:700, flexShrink:0,
                          boxShadow:`0 2px 8px ${animal.color}`,
                        }}>✓</div>
                      )}
                    </div>
                  </div>
                );
              })}

              {groups.length === 0 && (
                <div style={{textAlign:"center",color:"#9ca3af",fontSize:"0.82rem",fontStyle:"italic",padding:"6px 0 12px"}}>
                  💡 Crée un groupe dans l'onglet 👥 Groupes pour démarrer plus vite !
                </div>
              )}

              <button
                disabled={!setupComplete}
                onClick={launchGame}
                style={{
                  marginTop:10, width:"100%", padding:"13px", borderRadius:14, border:"none",
                  background: setupComplete
                    ? "linear-gradient(135deg,#ec4899,#16a34a,#f97316)"
                    : "rgba(0,0,0,0.07)",
                  color: setupComplete ? "white" : "#9ca3af",
                  fontFamily:"inherit", fontSize:"1rem", fontWeight:700,
                  cursor: setupComplete ? "pointer" : "default",
                  transition:"all .2s",
                  boxShadow: setupComplete ? "0 4px 18px rgba(236,72,153,0.35)" : "none",
                  letterSpacing:"0.03em",
                }}
              >
                {setupComplete ? "▶ Lancer la partie !" : "Assigne les 4 joueurs pour démarrer"}
              </button>
            </div>
          )}

          {/* ── PLAYING ── */}
          {(phase === "playing" || phase === "ended") && ANIMALS.map(animal => {
            const playerName = assignment[animal.id];
            const total      = sumGrid(scores[animal.id]);
            const maxScore   = Math.max(...ANIMALS.map(a => sumGrid(scores[a.id])));
            const isLeading  = total === maxScore && total > 0;
            const done       = gridComplete(scores[animal.id]);

            return (
              <div key={animal.id} style={{
                marginBottom:12, borderRadius:22,
                background:"rgba(255,255,255,0.75)",
                backdropFilter:"blur(10px)",
                border: isLeading ? `2px solid ${animal.accent}` : "2px solid rgba(255,255,255,0.85)",
                boxShadow: isLeading
                  ? `0 6px 28px ${animal.color}cc, 0 2px 8px rgba(0,0,0,0.05)`
                  : "0 2px 12px rgba(0,0,0,0.05)",
                overflow:"hidden", position:"relative",
                transition:"box-shadow .3s, border-color .3s",
              }}>
                <FloralBg color={animal.color}/>

                {/* Card header */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px 6px",position:"relative"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{
                      width:44, height:44, background:animal.light, borderRadius:"50%",
                      padding:4, border:`2px solid ${animal.color}`, flexShrink:0,
                    }}>
                      {SVGS[animal.id]}
                    </div>
                    <div>
                      <div style={{
                        display:"inline-flex", alignItems:"center", gap:6,
                        background:animal.color, borderRadius:20,
                        padding:"3px 12px",
                        fontSize:"0.95rem", fontWeight:800, color:animal.accent,
                      }}>
                        👤 {playerName}
                      </div>
                      <div style={{fontSize:"0.67rem",color:"#9ca3af",fontStyle:"italic",marginTop:3}}>
                        {animal.name} {done && "· ✓ complet"}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    background: isLeading ? animal.accent : animal.color,
                    color: isLeading ? "white" : animal.accent,
                    borderRadius:14, padding:"5px 15px",
                    fontWeight:800, fontSize:"1.4rem",
                    boxShadow: isLeading ? `0 3px 12px ${animal.color}` : "none",
                    minWidth:54, textAlign:"center",
                    transition:"all .3s", flexShrink:0,
                  }}>{total}</div>
                </div>

                {/* Score grid */}
                <div style={{padding:"4px 14px 13px",position:"relative"}}>
                  {[0, 1].map(row => (
                    <div key={row} style={{
                      display:"grid", gridTemplateColumns:"repeat(4,1fr)",
                      gap:5, marginBottom: row===0 ? 5 : 0, position:"relative",
                    }}>
                      {/* Watermark arrows */}
                      <div style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",fontSize:"0.9rem",color:animal.color,opacity:0.3,pointerEvents:"none",userSelect:"none"}}>←</div>
                      <div style={{position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",fontSize:"0.9rem",color:animal.color,opacity:0.3,pointerEvents:"none",userSelect:"none"}}>→</div>

                      {[0,1,2,3].map(col => {
                        const isAct = active?.animalId===animal.id && active?.row===row && active?.col===col;
                        const val   = scores[animal.id][row][col];
                        return (
                          <div
                            key={col}
                            onClick={() => openCell(animal.id, row, col)}
                            style={{
                              height:46, borderRadius:11,
                              background: isAct ? animal.light : val !== "" ? `${animal.light}99` : "rgba(255,255,255,0.7)",
                              border: isAct
                                ? `2px solid ${animal.accent}`
                                : val !== "" ? `1.5px solid ${animal.color}` : `1.5px solid ${animal.color}55`,
                              display:"flex", alignItems:"center", justifyContent:"center",
                              cursor: phase==="playing" ? "pointer" : "default",
                              fontSize:"1.1rem", fontWeight:800,
                              transition:"all .12s",
                              boxShadow: isAct ? `0 0 0 3px ${animal.color}66` : "none",
                            }}
                          >
                            {isAct && inputVal !== ""
                              ? <span style={{color:animal.accent}}>{inputVal}</span>
                              : val !== ""
                              ? <span style={{color:animal.accent}}>{val}</span>
                              : <span style={{color:animal.color,opacity:0.3,fontSize:"0.75rem"}}>—</span>
                            }
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {(phase === "playing" || phase === "ended") && (
            <div style={{textAlign:"center",marginTop:6}}>
              <button onClick={resetToSetup} style={{
                padding:"9px 24px", borderRadius:20,
                border:"1.5px solid #e5e7eb",
                background:"rgba(255,255,255,0.7)",
                cursor:"pointer", fontFamily:"inherit",
                fontSize:"0.84rem", color:"#9ca3af",
                backdropFilter:"blur(4px)",
              }}>↩ Reconfigurer la partie</button>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW: GROUPES
      ══════════════════════════════════════════════════════════════════════ */}
      {view === "groups" && (
        <div style={{position:"relative",zIndex:1,padding:"6px 12px 40px"}}>
          <div style={{
            borderRadius:22, background:"rgba(255,255,255,0.75)",
            backdropFilter:"blur(12px)",
            border:"1.5px solid rgba(255,255,255,0.9)",
            padding:"16px",
            boxShadow:"0 4px 24px rgba(0,0,0,0.05)",
          }}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontSize:"0.8rem",fontWeight:700,color:"#6b7280",letterSpacing:"0.08em",textTransform:"uppercase"}}>
                Mes groupes ({groups.length})
              </div>
              <button onClick={openNewGroup} style={{
                padding:"6px 16px", borderRadius:14, border:"none",
                background:"linear-gradient(135deg,#f9a8d4,#93c5fd)",
                color:"white", fontFamily:"inherit",
                fontSize:"0.82rem", fontWeight:700, cursor:"pointer",
                boxShadow:"0 2px 10px rgba(249,168,212,0.4)",
              }}>+ Créer un groupe</button>
            </div>

            {groups.length === 0 && (
              <div style={{textAlign:"center",padding:"28px 0",color:"#9ca3af"}}>
                <div style={{fontSize:"2.5rem",marginBottom:8}}>👥</div>
                <div style={{fontSize:"0.88rem",fontStyle:"italic"}}>Aucun groupe créé</div>
                <div style={{fontSize:"0.74rem",marginTop:4,color:"#c4b5fd"}}>
                  Ex : "Les Batraciens" avec Marc, Louise, Francis
                </div>
              </div>
            )}

            {groups.map(group => (
              <div key={group.id} style={{
                borderRadius:16, background:"rgba(255,255,255,0.6)",
                border:"1.5px solid rgba(220,220,220,0.6)",
                padding:"12px 14px", marginBottom:10,
                boxShadow:"0 1px 6px rgba(0,0,0,0.04)",
              }}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,color:"#374151",fontSize:"1rem",marginBottom:8}}>
                      👥 {group.name}
                    </div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                      {group.players.map((p, i) => {
                        const a = ANIMALS[i % ANIMALS.length];
                        return (
                          <span key={i} style={{
                            background:a.light, borderRadius:18,
                            padding:"3px 12px",
                            fontSize:"0.77rem", fontWeight:600,
                            color:a.accent, border:`1px solid ${a.color}`,
                          }}>👤 {p}</span>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:5,marginLeft:10,flexShrink:0}}>
                    <button onClick={() => openEditGroup(group)} style={{
                      padding:"5px 11px", borderRadius:9, border:"none",
                      background:"#fef3c7", color:"#92400e",
                      fontSize:"0.78rem", cursor:"pointer",
                    }}>✏️</button>
                    <button onClick={() => setGroups(prev => prev.filter(g => g.id !== group.id))} style={{
                      padding:"5px 11px", borderRadius:9, border:"none",
                      background:"#fee2e2", color:"#991b1b",
                      fontSize:"0.78rem", cursor:"pointer",
                    }}>🗑️</button>
                  </div>
                </div>
                <button onClick={() => { quickStart(group.id); }} style={{
                  marginTop:10, width:"100%", padding:"8px", borderRadius:11, border:"none",
                  background:`linear-gradient(135deg,${ANIMALS[0].accent},${ANIMALS[1].accent})`,
                  color:"white", fontFamily:"inherit",
                  fontSize:"0.85rem", fontWeight:700, cursor:"pointer",
                  boxShadow:"0 2px 10px rgba(236,72,153,0.25)",
                }}>▶ Jouer avec ce groupe</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW: STATS
      ══════════════════════════════════════════════════════════════════════ */}
      {view === "history" && (
        <div style={{position:"relative",zIndex:1,padding:"6px 12px 40px"}}>

          {/* KPI cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
            {[
              { label:"Parties",    value: stats.gamesPlayed,                         sub: null },
              { label:"🏆 Champion",value: stats.topWinner ? stats.topWinner[0] : "—", sub: stats.topWinner ? `${stats.topWinner[1]} victoire${stats.topWinner[1]>1?"s":""}` : null },
              { label:"⭐ Record",  value: stats.topScore ? `${stats.topScore[1]} pts` : "—", sub: stats.topScore ? stats.topScore[0] : null },
            ].map((s, i) => (
              <div key={i} style={{
                borderRadius:16, background:"rgba(255,255,255,0.75)",
                backdropFilter:"blur(10px)",
                border:"1.5px solid rgba(255,255,255,0.9)",
                padding:"11px 8px", textAlign:"center",
                boxShadow:"0 2px 10px rgba(0,0,0,0.05)",
              }}>
                <div style={{fontSize:"0.6rem",color:"#9ca3af",letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:4}}>{s.label}</div>
                <div style={{fontSize:"0.92rem",fontWeight:800,color:"#374151",lineHeight:1.2,wordBreak:"break-word"}}>{s.value}</div>
                {s.sub && <div style={{fontSize:"0.62rem",color:"#9ca3af",marginTop:3}}>{s.sub}</div>}
              </div>
            ))}
          </div>

          {/* Victories ranking */}
          {Object.keys(stats.wins).length > 0 && (
            <div style={{
              borderRadius:18, background:"rgba(255,255,255,0.75)", backdropFilter:"blur(10px)",
              border:"1.5px solid rgba(255,255,255,0.9)", padding:"14px", marginBottom:12,
            }}>
              <div style={{fontSize:"0.74rem",fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>
                🏆 Classement victoires
              </div>
              {Object.entries(stats.wins).sort((a,b) => b[1]-a[1]).map(([name, v], i) => (
                <div key={name} style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  background: i===0 ? "#fef9c3" : i===1 ? "#f9fafb" : "rgba(255,255,255,0.4)",
                  border: i===0 ? "1.5px solid #fde047" : "1.5px solid transparent",
                  borderRadius:11, padding:"7px 12px", marginBottom:5,
                }}>
                  <span style={{fontWeight:600,color:"#374151",fontSize:"0.88rem",display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:"1.05rem"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":"  "}</span>
                    {name}
                  </span>
                  <span style={{fontWeight:800,color:i===0?"#ca8a04":"#6b7280",fontSize:"0.95rem"}}>
                    {v} victoire{v>1?"s":""}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Personal bests */}
          {Object.keys(stats.bests).length > 0 && (
            <div style={{
              borderRadius:18, background:"rgba(255,255,255,0.75)", backdropFilter:"blur(10px)",
              border:"1.5px solid rgba(255,255,255,0.9)", padding:"14px", marginBottom:12,
            }}>
              <div style={{fontSize:"0.74rem",fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>
                ⭐ Meilleurs scores personnels
              </div>
              {Object.entries(stats.bests).sort((a,b) => b[1]-a[1]).map(([name, pts], i) => (
                <div key={name} style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  background: i===0 ? "#fef9c3" : "rgba(255,255,255,0.4)",
                  border: i===0 ? "1.5px solid #fde047" : "1.5px solid transparent",
                  borderRadius:11, padding:"7px 12px", marginBottom:5,
                }}>
                  <span style={{fontWeight:600,color:"#374151",fontSize:"0.88rem"}}>👤 {name}</span>
                  <span style={{fontWeight:800,color:i===0?"#d97706":"#6b7280"}}>{pts} pts</span>
                </div>
              ))}
            </div>
          )}

          {/* Game log */}
          <div style={{
            borderRadius:18, background:"rgba(255,255,255,0.75)", backdropFilter:"blur(10px)",
            border:"1.5px solid rgba(255,255,255,0.9)", padding:"14px", marginBottom:14,
          }}>
            <div style={{fontSize:"0.74rem",fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>
              📋 Historique des parties ({history.length})
            </div>
            {history.length === 0 && (
              <div style={{textAlign:"center",color:"#9ca3af",fontStyle:"italic",fontSize:"0.85rem",padding:"10px 0"}}>
                Aucune partie terminée
              </div>
            )}
            {history.map((entry, i) => {
              const sorted = [...ANIMALS].sort((a,b) => (entry.slots[b.id]?.total||0) - (entry.slots[a.id]?.total||0));
              return (
                <div key={i} style={{
                  borderRadius:13, border:"1.5px solid rgba(220,220,220,0.5)",
                  background:"rgba(255,255,255,0.5)", padding:"9px 11px", marginBottom:9,
                }}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                    <span style={{fontSize:"0.67rem",color:"#9ca3af"}}>{entry.date}</span>
                    <span style={{
                      fontSize:"0.73rem", fontWeight:700,
                      background:"#fef9c3", color:"#92400e",
                      padding:"2px 9px", borderRadius:8,
                    }}>🏆 {entry.winnerName}</span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                    {sorted.map((a, rank) => {
                      const slot  = entry.slots[a.id];
                      const isWin = entry.winnerId === a.id;
                      return (
                        <div key={a.id} style={{
                          borderRadius:9, padding:"5px 9px",
                          background: isWin ? a.light : "rgba(255,255,255,0.35)",
                          border: isWin ? `1.5px solid ${a.color}` : "1.5px solid transparent",
                          display:"flex", alignItems:"center", justifyContent:"space-between",
                        }}>
                          <div style={{display:"flex",alignItems:"center",gap:5}}>
                            <span style={{fontSize:"0.8rem"}}>{rank===0?"🥇":rank===1?"🥈":rank===2?"🥉":"4."}</span>
                            <div style={{width:14,height:14,flexShrink:0}}>{SVGS[a.id]}</div>
                            <span style={{fontSize:"0.76rem",fontWeight:isWin?700:500,color:isWin?a.accent:"#374151"}}>
                              {slot?.player || "—"}
                            </span>
                          </div>
                          <span style={{fontWeight:800,fontSize:"0.88rem",color:isWin?a.accent:"#6b7280"}}>
                            {slot?.total}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset history */}
          {!confirmReset ? (
            <div style={{textAlign:"center"}}>
              <button onClick={() => setConfirmReset(true)} style={{
                padding:"9px 24px", borderRadius:16,
                border:"1.5px solid #fca5a5",
                background:"rgba(255,255,255,0.65)",
                cursor:"pointer", fontFamily:"inherit",
                fontSize:"0.83rem", color:"#ef4444",
              }}>🗑️ Réinitialiser l'historique</button>
            </div>
          ) : (
            <div style={{
              borderRadius:16, background:"#fee2e2",
              border:"1.5px solid #fca5a5",
              padding:"14px 16px", textAlign:"center",
            }}>
              <div style={{fontSize:"0.9rem",fontWeight:700,color:"#991b1b",marginBottom:12}}>
                Effacer tout l'historique et les stats ?
              </div>
              <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                <button onClick={() => { setHistory([]); setConfirmReset(false); }} style={{
                  padding:"8px 22px", borderRadius:12, border:"none",
                  background:"#ef4444", color:"white",
                  fontFamily:"inherit", fontSize:"0.87rem", fontWeight:700, cursor:"pointer",
                }}>Oui, tout effacer</button>
                <button onClick={() => setConfirmReset(false)} style={{
                  padding:"8px 22px", borderRadius:12,
                  border:"1.5px solid #e5e7eb", background:"white",
                  color:"#374151", fontFamily:"inherit",
                  fontSize:"0.87rem", cursor:"pointer",
                }}>Annuler</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          NUMPAD
      ══════════════════════════════════════════════════════════════════════ */}
      {active && (
        <div style={{
          position:"fixed", bottom:0, left:0, right:0, zIndex:150,
          background:"rgba(255,255,255,0.97)",
          backdropFilter:"blur(24px)",
          borderTop:"1px solid rgba(200,200,200,0.35)",
          borderRadius:"24px 24px 0 0",
          padding:"14px 20px 28px",
          boxShadow:"0 -10px 40px rgba(0,0,0,0.10)",
        }}>
          {/* Current value display */}
          <div style={{
            textAlign:"center", fontSize:"2.1rem", fontWeight:800, color:"#374151",
            height:50, display:"flex", alignItems:"center", justifyContent:"center",
            marginBottom:12, background:"rgba(0,0,0,0.04)", borderRadius:14,
          }}>
            {inputVal !== ""
              ? inputVal
              : <span style={{color:"#d1d5db",fontSize:"0.95rem"}}>Entrez un nombre</span>
            }
          </div>

          {/* Digit grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,maxWidth:300,margin:"0 auto"}}>
            {[1,2,3,4,5,6,7,8,9,"✕",0,"⌫"].map(d => (
              <button key={d} onClick={() => numpad(String(d))} style={{
                height:54, borderRadius:14,
                border:"1.5px solid #e5e7eb",
                background: d==="✕" ? "#fee2e2" : d==="⌫" ? "#fef3c7" : "white",
                fontSize: typeof d==="number" ? "1.4rem" : "1.15rem",
                fontWeight:600, cursor:"pointer", color:"#374151",
                fontFamily:"inherit",
                boxShadow:"0 1px 4px rgba(0,0,0,0.06)",
                transition:"transform .08s",
                active:{transform:"scale(0.95)"},
              }}>{d}</button>
            ))}
          </div>

          {/* Confirm */}
          <div style={{maxWidth:300,margin:"10px auto 0"}}>
            <button onClick={() => numpad("✓")} style={{
              width:"100%", height:50, borderRadius:14, border:"none",
              background:"linear-gradient(135deg,#ec4899,#16a34a)",
              color:"white", fontSize:"1.05rem", fontWeight:700,
              cursor:"pointer", fontFamily:"inherit",
              boxShadow:"0 4px 16px rgba(236,72,153,0.3)",
            }}>✓ Confirmer</button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          GROUP EDITOR MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {groupEditor && (
        <div style={{
          position:"fixed", inset:0, zIndex:200,
          background:"rgba(0,0,0,0.48)", backdropFilter:"blur(8px)",
          display:"flex", alignItems:"flex-end", justifyContent:"center",
        }}
          onClick={e => { if (e.target===e.currentTarget) setGroupEditor(null); }}
        >
          <div style={{
            background:"white", borderRadius:"26px 26px 0 0",
            width:"100%", maxWidth:480,
            padding:"24px 20px 36px",
            boxShadow:"0 -10px 48px rgba(0,0,0,0.14)",
          }}>
            {/* Handle */}
            <div style={{width:40,height:4,background:"#e5e7eb",borderRadius:4,margin:"0 auto 18px"}}/>

            <div style={{textAlign:"center",fontWeight:700,fontSize:"1.08rem",color:"#374151",marginBottom:18}}>
              {groupEditor.mode==="new" ? "✨ Nouveau groupe" : "✏️ Modifier le groupe"}
            </div>

            {/* Name */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:"0.72rem",fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6}}>
                Nom du groupe
              </div>
              <input
                autoFocus
                value={groupEditor.name}
                onChange={e => setGroupEditor(ed => ({...ed, name:e.target.value}))}
                placeholder="ex : Les Batraciens"
                style={{
                  width:"100%", padding:"10px 14px", borderRadius:12,
                  border:"1.5px solid #e5e7eb",
                  fontFamily:"inherit", fontSize:"0.97rem", outline:"none",
                  boxSizing:"border-box",
                  background:"#f9fafb",
                }}
              />
            </div>

            {/* Players */}
            <div style={{marginBottom:18}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{fontSize:"0.72rem",fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.07em"}}>
                  Joueurs ({groupEditor.players.length} / 4)
                </div>
                {groupEditor.players.length < 4 && (
                  <button
                    onClick={() => setGroupEditor(e => ({...e, players:[...e.players,""]}))}
                    style={{
                      padding:"4px 11px", borderRadius:9, border:"none",
                      background:"#dcfce7", color:"#166534",
                      fontSize:"0.76rem", fontWeight:700,
                      cursor:"pointer", fontFamily:"inherit",
                    }}
                  >+ Joueur</button>
                )}
              </div>
              {groupEditor.players.map((p, i) => {
                const a = ANIMALS[i % ANIMALS.length];
                return (
                  <div key={i} style={{display:"flex",gap:7,marginBottom:7,alignItems:"center"}}>
                    <div style={{
                      width:30, height:30, background:a.light, borderRadius:"50%",
                      padding:3, border:`1.5px solid ${a.color}`, flexShrink:0,
                    }}>
                      {SVGS[a.id]}
                    </div>
                    <input
                      value={p}
                      onChange={e => setGroupEditor(ed => ({
                        ...ed,
                        players: ed.players.map((pp, idx) => idx===i ? e.target.value : pp),
                      }))}
                      placeholder={`Joueur ${i+1}`}
                      style={{
                        flex:1, padding:"9px 13px", borderRadius:11,
                        border:`1.5px solid ${a.color}`,
                        fontFamily:"inherit", fontSize:"0.92rem", outline:"none",
                        background:"#f9fafb",
                      }}
                    />
                    {groupEditor.players.length > 2 && (
                      <button
                        onClick={() => setGroupEditor(e => ({...e, players:e.players.filter((_,idx) => idx!==i)}))}
                        style={{
                          width:36, height:36, borderRadius:10, border:"none",
                          background:"#fee2e2", color:"#ef4444",
                          fontSize:"1.1rem", cursor:"pointer", flexShrink:0,
                        }}
                      >×</button>
                    )}
                  </div>
                );
              })}
              {groupEditor.players.filter(p=>p.trim()).length < 2 && (
                <div style={{fontSize:"0.73rem",color:"#f87171",marginTop:4}}>
                  ⚠️ Minimum 2 joueurs requis
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{display:"flex",gap:8}}>
              <button onClick={() => setGroupEditor(null)} style={{
                flex:1, padding:"12px", borderRadius:13,
                border:"1.5px solid #e5e7eb", background:"white",
                color:"#6b7280", fontFamily:"inherit", fontSize:"0.92rem", cursor:"pointer",
              }}>Annuler</button>
              <button
                onClick={saveGroup}
                disabled={!groupEditor.name.trim() || groupEditor.players.filter(p=>p.trim()).length < 2}
                style={{
                  flex:2, padding:"12px", borderRadius:13, border:"none",
                  background: groupEditor.name.trim() && groupEditor.players.filter(p=>p.trim()).length >= 2
                    ? "linear-gradient(135deg,#ec4899,#16a34a)"
                    : "rgba(0,0,0,0.07)",
                  color: groupEditor.name.trim() && groupEditor.players.filter(p=>p.trim()).length >= 2 ? "white" : "#9ca3af",
                  fontFamily:"inherit", fontSize:"0.97rem", fontWeight:700,
                  cursor: groupEditor.name.trim() && groupEditor.players.filter(p=>p.trim()).length >= 2 ? "pointer" : "default",
                  boxShadow: groupEditor.name.trim() && groupEditor.players.filter(p=>p.trim()).length >= 2
                    ? "0 4px 16px rgba(236,72,153,0.3)" : "none",
                }}
              >
                {groupEditor.mode === "new" ? "Créer le groupe" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          WINNER POPUP
      ══════════════════════════════════════════════════════════════════════ */}
      {winner && phase === "ended" && (
        <>
          <Confetti color={winner.animal.color}/>
          <div style={{
            position:"fixed", inset:0, zIndex:250,
            background:"rgba(0,0,0,0.58)", backdropFilter:"blur(8px)",
            display:"flex", alignItems:"center", justifyContent:"center",
            padding:"20px",
          }}>
            <div style={{
              background:"white", borderRadius:30,
              padding:"28px 22px 24px",
              maxWidth:340, width:"100%",
              boxShadow:`0 24px 64px ${winner.animal.color}bb, 0 4px 20px rgba(0,0,0,0.12)`,
              textAlign:"center",
              border:`3px solid ${winner.animal.accent}`,
              position:"relative", zIndex:1,
            }}>
              <div style={{fontSize:"3.2rem",marginBottom:4}}>🎉</div>
              <div style={{fontSize:"0.72rem",letterSpacing:"0.13em",textTransform:"uppercase",color:"#9ca3af",marginBottom:6}}>
                Vainqueur de la partie
              </div>

              {/* Winner badge */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:10,
                background:winner.animal.light, borderRadius:22,
                padding:"8px 20px", marginBottom:6,
                border:`2px solid ${winner.animal.color}`,
              }}>
                <div style={{width:32,height:32}}>{SVGS[winner.animal.id]}</div>
                <span style={{fontSize:"1.55rem",fontWeight:800,color:winner.animal.accent}}>
                  {winner.snap.winnerName}
                </span>
              </div>

              <div style={{fontSize:"0.83rem",color:"#6b7280",marginBottom:20,fontStyle:"italic"}}>
                {winner.snap.slots[winner.animal.id]?.total} points · {winner.animal.name}
              </div>

              {/* Full podium */}
              <div style={{marginBottom:22}}>
                {[...ANIMALS]
                  .sort((a,b) => (winner.snap.slots[b.id]?.total||0) - (winner.snap.slots[a.id]?.total||0))
                  .map((a, i) => {
                    const slot = winner.snap.slots[a.id];
                    return (
                      <div key={a.id} style={{
                        display:"flex", alignItems:"center", justifyContent:"space-between",
                        background: i===0 ? a.light : i===1 ? "#f9fafb" : "rgba(0,0,0,0.02)",
                        borderRadius:12, padding:"7px 13px", marginBottom:5,
                        border: i===0 ? `1.5px solid ${a.color}` : "1.5px solid transparent",
                      }}>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <span style={{fontSize:"1.05rem",width:22,textAlign:"center"}}>
                            {i===0?"🥇":i===1?"🥈":i===2?"🥉":"4."}
                          </span>
                          <div style={{width:20,height:20,flexShrink:0}}>{SVGS[a.id]}</div>
                          <span style={{
                            fontSize:"0.9rem",
                            fontWeight: i===0 ? 800 : 500,
                            color: i===0 ? a.accent : "#374151",
                          }}>
                            {slot?.player}
                          </span>
                        </div>
                        <span style={{
                          fontWeight:800,
                          fontSize: i===0 ? "1.05rem" : "0.92rem",
                          color: i===0 ? a.accent : "#6b7280",
                        }}>
                          {slot?.total} pts
                        </span>
                      </div>
                    );
                  })}
              </div>

              {/* CTA buttons */}
              <div style={{display:"flex",gap:8}}>
                <button onClick={resetToSetup} style={{
                  flex:1, padding:"12px", borderRadius:15, border:"none",
                  background:`linear-gradient(135deg,${winner.animal.accent},#f97316)`,
                  color:"white", fontFamily:"inherit",
                  fontSize:"0.93rem", fontWeight:700, cursor:"pointer",
                  boxShadow:`0 4px 16px ${winner.animal.color}`,
                }}>🔄 Nouvelle partie</button>
                <button onClick={() => { setWinner(null); setView("history"); }} style={{
                  flex:1, padding:"12px", borderRadius:15,
                  border:"1.5px solid #e5e7eb", background:"white",
                  color:"#6b7280", fontFamily:"inherit",
                  fontSize:"0.88rem", cursor:"pointer",
                }}>📜 Voir les stats</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
