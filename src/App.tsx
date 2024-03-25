import { useState } from "react";
import "./App.css";
import GenerateButton from "./components/GenerateButton";
import Sidebar from "./components/Sidebar";
import AgentDisplay from "./components/AgentDisplay";

type AgentData = {
  characterTags: string[];
  description: string;
  displayIconSmall: string;
  displayName: string;
  role: {
    displayName: string;
  };
};

type BanListData = {
  characterTags?: string[];
  displayName: string;
  role: {
    displayName: string;
  };
};

function App() {
  const [agent, setAgent] = useState<AgentData | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [banList, setBanList] = useState<BanListData[]>([]);
  const URL = `https://valorant-api.com/v1/agents`;

  const generateAgent = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => data.data)
      .then((list) => {
        const filteredList = filterAgents(list);
        return getRandomAgent(filteredList);
      })
      .then((agent) => setAgent(agent));
  };

  const getRandomAgent = (list: AgentData[]) => {
    let randomIndex = Math.floor(Math.random() * list.length);
    while (list[randomIndex].displayName === agent?.displayName) {
      randomIndex = Math.floor(Math.random() * list.length);
    }
    const randomAgent = list[randomIndex];
    return randomAgent;
  };

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleBanList = (ban: BanListData) => {
    setBanList([...banList, ban]);
    console.log(banList);
    generateAgent();
  };

  const filterAgents = (list: AgentData[]): AgentData[] => {
    return list.filter((agent) => {
      for (const ban of banList) {
        if (ban.displayName && ban.displayName === agent.displayName) {
          return false;
        }
      }
      return true;
    });
  };

  return (
    <main className="flex flex-col">
      <Sidebar
        showSidebar={showSidebar}
        event={handleSidebar}
        banList={banList}
      />
      <div className="flex flex-col justify-center items-center gap-6 w-[72rem] h-[65rem] rounded-md bg-gradient-to-r from-slate-900 to-slate-700 shadow-2xl shadow-black">
        <h1 className="text-white text-7xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Veni Vici!
        </h1>
        <h2 className="text-white text-5xl font-bold">
          Discover Valorant Agents!
        </h2>

        {agent === null ? (
          <h1 className="text-white">No Agent Yet</h1>
        ) : (
          <AgentDisplay agent={agent} event={handleBanList} />
        )}
        <GenerateButton event={generateAgent} />
      </div>
    </main>
  );
}

export default App;
