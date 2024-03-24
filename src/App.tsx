import { useState } from "react";
import "./App.css";
import Hamburger from "./assets/hamburger.png";

type AgentData = {
  abiltiies: [
    slot: string,
    displayName: string,
    description: string,
    displayIcon: string
  ];
  assetPath: string;
  background: string;
  backgroundGradientColors: string[];
  bustPortrait: string;
  characterTags: string[];
  description: string;
  developerName: string;
  displayIcon: string;
  displayIconSmall: string;
  displayName: string;
  fullPortrait: string;
  fullPortraitV2: string;
  isAvailableForTest: string;
  role: {
    uuid: string;
    displayName: string;
    description: string;
  };
  uuid: string;
};

function App() {
  const [agent, setAgent] = useState<AgentData | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const URL = `https://valorant-api.com/v1/agents`;

  const generateAgent = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => data.data)
      .then((list) => getRandomAgent(list))
      .then((agent) => setAgent(agent));
    console.log(agent);
  };

  const getRandomAgent = (list: AgentData[]) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomAgent = list[randomIndex];
    return randomAgent;
  };

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  };

  return (
    <main className="flex flex-col">
      {showSidebar === false ? (
        <div className="absolute top-5 right-2 z-10">
          <img src={Hamburger} width={30} height={30} onClick={handleSidebar} />
        </div>
      ) : (
        <div className="absolute top-0 right-0 z-10">
          <div
            className="flex w-[30rem] h-[100vh] justify-center items-center bg-black border-l-4"
            onClick={handleSidebar}
          >
            <h1 className="font-bold">Ban List</h1>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center gap-6 lg:w-[64rem] lg:h-[42rem] md:w-[48rem] md:h-[36rem] sm:w-[36rem] sm:h-[24rem] rounded-lg">
        <h1 className="text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Veni Vici!
        </h1>
        <p className="text-white text-3xl font-bold">
          Discover Valorant Agents!
        </p>
        {agent === null ? (
          <h1>No Agent Yet</h1>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <div className="flex gap-4 justify-evenly text-sm mb-4">
              <h1>{agent.displayName}</h1>
              <h1>{agent.role.displayName}</h1>
            </div>
            <h1 className="text-sm mb-4">{agent.description}</h1>
            <img
              src={agent.displayIconSmall}
              className="lg:w-[30rem] lg:h-[24rem] md:w-[36rem] md:h-[20rem] sm:w-[24rem] sm:h-[12rem] border-2 rounded-lg"
            />
          </div>
        )}
        <button
          onClick={generateAgent}
          className="w-42 h-15 text-xl border-1 border-white"
        >
          Generate Agent
        </button>
      </div>
    </main>
  );
}

export default App;
