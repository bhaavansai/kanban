import React from 'react';
//import Card from './components/Card.js';
import KanbanBoard from './webpages/KanbanBoard.js'

function App() {
  // const cardData = {
  //   id: "CAM-10",
  //   title: "Conduct Security Vulnerability Assessment",
  //   tag: ["Feature Request"],
  //   userId: "usr-4",
  //   status: "Backlog",
  //   priority: 1
  // };

  return (
    <div className="App">
      {/* <Card card={cardData} /> */}
      <KanbanBoard/>
    </div>
  );
}

export default App;
