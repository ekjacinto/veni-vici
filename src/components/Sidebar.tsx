import Hamburger from "../assets/hamburger.png";

type BanListData = {
  characterTags?: string[];
  displayName: string;
  role: {
    displayName: string;
  };
};

type SidebarProps = {
  showSidebar: boolean;
  event: () => void;
  banList: BanListData[];
};

const Sidebar = ({ showSidebar, event, banList }: SidebarProps) => {
  return (
    <div>
      {showSidebar === false ? (
        <div className="absolute top-5 right-2 z-10">
          <img src={Hamburger} width={50} height={50} onClick={event} />
        </div>
      ) : (
        <div className="absolute top-0 right-0 z-10 font-bold">
          <div
            className="flex flex-col w-[50rem] h-[100vh] justify-center items-center bg-[#1a1a1a] border-l-4"
            onClick={event}
          >
            <h1 className="text-6xl mb-2">Ban List</h1>
            <h2 className="text-xl">
              Select an attribute in your listings to ban it!
            </h2>
            {banList.map((ban, index) => (
              <h2 key={index} className="text-4xl mt-4">
                {ban.displayName}
              </h2>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
