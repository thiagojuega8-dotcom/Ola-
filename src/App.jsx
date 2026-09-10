import { useState } from "react";
import { AVATARS, COLORS, FONT_SANS, MISSION_POOL, TODAY_LABEL } from "./constants";
import Onboarding from "./components/Onboarding";
import { BottomNav, TopHeader } from "./components/Layout";
import { TabHoy, TabMisiones, TabNosotros, TabSecretos, TabTimeline } from "./components/Tabs";

export default function HiloRojoApp() {
  const [screen, setScreen] = useState("onboarding");
  const [coupleName, setCoupleName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [startDate, setStartDate] = useState("");
  const [activeTab, setActiveTab] = useState("hoy");

  const [dayCount, setDayCount] = useState(1);
  const [qPointer, setQPointer] = useState(0);
  const [myAnswer, setMyAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [streak, setStreak] = useState(0);

  const [timeline, setTimeline] = useState([
    { id: 1, text: "Empezamos a tejer nuestra historia en Hilo Rojo.", tag: "hito", date: TODAY_LABEL },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [momentText, setMomentText] = useState("");
  const [momentTag, setMomentTag] = useState("hito");

  const [missions, setMissions] = useState(
    MISSION_POOL.slice(0, 4).map((m, i) => ({ id: i + 1, ...m, completed: false }))
  );
  const [missionPoolIndex, setMissionPoolIndex] = useState(4);

  const [secrets, setSecrets] = useState([]);
  const [newSecret, setNewSecret] = useState("");

  const [letters, setLetters] = useState([]);
  const [letterForm, setLetterForm] = useState({ text: "", label: "" });

  function submitAnswer() {
    if (!myAnswer.trim()) return;
    setAnswered(true);
    setWaiting(true);
    setTimeout(() => {
      setWaiting(false);
      setRevealed(true);
    }, 1600);
  }

  function nextDay() {
    setAnsweredCount((c) => c + 1);
    setStreak((s) => s + 1);
    setDayCount((d) => d + 1);
    setQPointer((p) => p + 1);
    setMyAnswer("");
    setAnswered(false);
    setRevealed(false);
  }

  function addMoment() {
    if (!momentText.trim()) return;
    setTimeline((t) => [{ id: Date.now(), text: momentText.trim(), tag: momentTag, date: TODAY_LABEL }, ...t]);
    setMomentText("");
    setShowAdd(false);
  }

  function toggleMission(id) {
    setMissions((ms) => ms.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m)));
  }

  function suggestMission() {
    if (missionPoolIndex >= MISSION_POOL.length) return;
    const next = MISSION_POOL[missionPoolIndex];
    setMissions((ms) => [...ms, { id: Date.now(), ...next, completed: false }]);
    setMissionPoolIndex((i) => i + 1);
  }

  function addSecret() {
    if (!newSecret.trim()) return;
    setSecrets((s) => [{ id: Date.now(), text: newSecret.trim(), revealed: false, revealing: false }, ...s]);
    setNewSecret("");
  }

  function revealSecret(id) {
    setSecrets((s) => s.map((x) => (x.id === id ? { ...x, revealing: true } : x)));
    setTimeout(() => {
      setSecrets((s) => s.map((x) => (x.id === id ? { ...x, revealed: true, revealing: false } : x)));
    }, 1200);
  }

  function addLetter() {
    if (!letterForm.text.trim() || !letterForm.label.trim()) return;
    setLetters((l) => [{ id: Date.now(), text: letterForm.text.trim(), label: letterForm.label.trim() }, ...l]);
    setLetterForm({ text: "", label: "" });
  }

  if (screen === "onboarding") {
    return (
      <div style={{ backgroundColor: COLORS.ink, minHeight: "100vh" }} className="w-full max-w-md mx-auto">
        <Onboarding
          coupleName={coupleName}
          setCoupleName={setCoupleName}
          avatar={avatar}
          setAvatar={setAvatar}
          startDate={startDate}
          setStartDate={setStartDate}
          onStart={() => coupleName.trim() && setScreen("app")}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${COLORS.ink} 0%, ${COLORS.inkDeep} 100%)`,
        minHeight: "100vh",
        fontFamily: FONT_SANS,
      }}
      className="w-full max-w-md mx-auto relative"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <TopHeader coupleName={coupleName} avatar={avatar} dayCount={dayCount} streak={streak} />

      <div className="pb-20">
        {activeTab === "hoy" && (
          <TabHoy
            state={{ qPointer, myAnswer, answered, revealed, waiting, missions }}
            actions={{ setMyAnswer, submitAnswer, nextDay }}
          />
        )}
        {activeTab === "timeline" && (
          <TabTimeline
            timeline={timeline}
            form={{ showAdd, text: momentText, tag: momentTag }}
            actions={{ setShowAdd, setText: setMomentText, setTag: setMomentTag, addMoment }}
          />
        )}
        {activeTab === "misiones" && (
          <TabMisiones
            missions={missions}
            missionPoolIndex={missionPoolIndex}
            actions={{ toggleMission, suggestMission }}
          />
        )}
        {activeTab === "nosotros" && (
          <TabNosotros
            streak={streak}
            answeredCount={answeredCount}
            timelineCount={timeline.length}
            missionsCompleted={missions.filter((m) => m.completed).length}
            startDate={startDate}
          />
        )}
        {activeTab === "secretos" && (
          <TabSecretos
            secrets={secrets}
            newSecret={newSecret}
            setNewSecret={setNewSecret}
            addSecret={addSecret}
            revealSecret={revealSecret}
            letters={letters}
            letterForm={letterForm}
            setLetterForm={setLetterForm}
            addLetter={addLetter}
          />
        )}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
