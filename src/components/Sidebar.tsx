import { useChat } from "../context/ChatContext";

const SidebarNew = () => {
  const { selectedUser, setSelectedUser, selectedChannel, setSelectedChannel } =
    useChat();
  return (
    <aside className="w-full  md:w-1/4 p-6 rounded-lg shadow-md flex flex-col space-y-6 bg-[#f4f5fb]">
      <div>
        <label
          htmlFor="user-select"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          1. Choose your user
        </label>
        <div className="relative">
          <select
            id="user-select"
            className="block appearance-none w-full bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value as any)}
          >
            <option>Joyse</option>
            <option>Russell</option>
            <option>Sam</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <p className="block text-gray-700 text-sm font-medium mb-2">
          2. Choose your Channel
        </p>
        <div className="space-y-2">
          {["General Channel", "Technology Channel", "LGTM Channel"].map(
            (channel) => (
              <div
                key={channel}
                className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedChannel === channel
                    ? "bg-[#E0F2FE] text-[#007BFF] font-semibold"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
                onClick={() => setSelectedChannel(channel as any)}
              >
                {channel}
              </div>
            )
          )}
        </div>
      </div>
    </aside>
  );
};

export default SidebarNew;
