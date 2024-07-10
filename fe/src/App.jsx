import { Routes, Route } from "react-router-dom";
import HomeTrackerScreen from "./screens/HomeTrackerScreen";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import Trackers from "./components/Trackers/Trackers";
import CreateCharacter from "./components/Characters/CreateCharacter";
import Progress from "./components/Progress/Progress";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import RegistrationScreen from "./screens/RegistrationScreen";

const App = () => {
  return (
    <div>
      <ErrorBoundary>
        <Routes>
          <Route element={<HomeTrackerScreen />}>
            <Route index element={<Trackers />} />
            <Route path="/progress" element={<Progress />} />
          </Route>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegistrationScreen />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/create-character" element={<CreateCharacter />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
