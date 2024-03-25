type BanListData = {
  characterTags?: string[];
  displayName: string;
  role: {
    displayName: string;
  };
};

type AgentDisplayProps = {
  agent: {
    displayName: string;
    role: {
      displayName: string;
    } | null;
    description: string;
    displayIconSmall: string;
    characterTags: string[] | null;
  };

  event: (ban: BanListData) => void;
};

const AgentDisplay = ({ agent, event }: AgentDisplayProps) => {
  const handleClick = (value: string, type: string) => {
    const ban: BanListData = {
      displayName: type === "displayName" ? value : agent.displayName,
      role: type === "role" ? { displayName: value } : agent.role,
      characterTags: type === "characterTag" ? [value] : agent.characterTags,
    };
    event(ban);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex gap-4 justify-evenly text-sm mb-4">
        <h1
          className="border-4 p-4 rounded-lg bg-[#4b182c]"
          onClick={() => handleClick(agent.displayName, "displayName")}
        >
          {agent.displayName}
        </h1>
        {agent.role && (
          <h1
            className="border-4 p-4 rounded-lg bg-[#4b182c]"
            onClick={() => handleClick(agent.role.displayName, "role")}
          >
            {agent.role.displayName}
          </h1>
        )}
        {agent.characterTags !== null &&
          agent.characterTags.map((characterTag, index) => (
            <div
              key={index}
              className=" flex justify-center items-center text-3xl border-4 p-4 rounded-lg bg-[#4b182c]"
              onClick={() => handleClick(characterTag, "characterTag")}
            >
              {characterTag}
            </div>
          ))}
      </div>
      <h1 className="border-4 p-4 rounded-lg bg-black text-2xl mb-4 font-bold italic w-[64rem]">
        {agent.description}
      </h1>
      <img
        src={agent.displayIconSmall}
        className="w-[30rem] h-[28rem] rounded-lg bg-black"
      />
    </div>
  );
};

export default AgentDisplay;
