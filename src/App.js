import "./styles.css";

import { useState, createContext, useContext, useEffect } from "react";

const RobotContext = createContext();

const RobotProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [robo, setRobo] = useState([]);

  const addRobot = () => {
    if (robo.some((ro) => ro.name === input)) {
      alert("Robot listede bulunuyor!");
    }
    const newRobot = {
      name: input,
      image: `https://robohash.org/${input}`,
    };
    setRobo([...robo, newRobot]);
    
    setInput("");
  };
  const removeRobot = (name) => {
    setRobo(robo.filter((r) => r.name !== name));
  };
  return (
    <RobotContext.Provider
      value={{ input, setInput, robo, addRobot, removeRobot }}
    >
      {children}
    </RobotContext.Provider>
  );
};

function App() {
  return (
    <RobotProvider>
      <RobotList />
    </RobotProvider>
  );
}

const RobotList = () => {
  const { input, setInput, robo, addRobot, removeRobot } =
    useContext(RobotContext);

    return (
      <div className="container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Robot Adı Giriniz..."
          className="input-field"
        />
        <button onClick={addRobot} className="add-button">Enter</button>
        <div className="robot-list">
          {robo.map((rob) => (
            <div key={rob.name} className="robot-item">
              <img
                src={rob.image}
                alt={rob.name}
                onClick={() => removeRobot(rob.name)}
                className="robot-image"
              />
            </div>
          ))}
        </div>
      </div>
    );
};
export default App;
