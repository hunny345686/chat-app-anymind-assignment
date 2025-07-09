import ChatGround from "./components/ChatGround";
import Header from "./components/Header";
import SidebarNew from "./components/Sidebar";
function App() {
  return (
    <div className="container h-full max-w-screen-lg mx-auto shadow-md rounded-lg mt-5">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <SidebarNew />
        <ChatGround />
      </div>
    </div>
  );
}

export default App;
