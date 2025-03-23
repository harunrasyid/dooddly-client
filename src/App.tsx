import { Routes, Route } from "react-router";
import { JoinRoomPage, RoomPage } from "@/modules";
import "./App.css";

const App = () => {
  return (
    <Routes>
      {/* TODO: add auth */}
      <Route path="/" element={<JoinRoomPage />} />
      <Route path="/:roomId" element={<RoomPage />} />
    </Routes>
  );
};

export default App;
