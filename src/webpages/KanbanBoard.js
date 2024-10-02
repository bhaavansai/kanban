// src/components/KanbanBoard.js
import React, { useEffect, useState } from 'react';
import '../styles/KanbanBoard.css'; // Separate CSS for Kanban board
import axios from 'axios';
import Card from '../components/Card.js';

const KanbanBoard = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [grouping, setGrouping] = useState('Status');
  const [ordering, setOrdering] = useState('Priority');
  const [tickets, setTickets] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});

  function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }
  useEffect(() => {
    // Fetch the data from the API
    const fetchTicketsAndUsers = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        
        // Assuming the response has the structure { tickets: [], users: [] }
        const { tickets, users } = response.data;

        // Add username to each ticket by matching the userId with users array
        const updatedTickets = tickets.map(ticket => {
          const userVar = users.find(user => user.id === ticket.userId);
          return {
            ...ticket,
            user: userVar ? userVar.name : 'Unknown', // Add username to ticket
            userAvailable: userVar ? userVar.available : false // Optionally add availability
          };
        });

        setTickets(updatedTickets); // Update state with modified tickets
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTicketsAndUsers();
  }, []);

  useEffect(() => {
    // Function to group and sort tickets
    const groupAndSortTickets = (tickets, grouping, ordering) => {
      // Create an empty object to store the grouped tickets
      const grouped = {};

      // Group tickets based on the `grouping` state (status, user, priority)
      tickets.forEach(ticket => {
        //console.log(ticket);
        const groupKey = ticket[lowercaseFirstLetter(grouping)]; // Group by either status, user, or priority
        //console.log(groupKey);
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(ticket); // Add ticket to the appropriate group
      });
      //console.log(grouped, "from grouping");
      // Sort the tickets inside each group based on the `ordering` state (priority, title)
      Object.keys(grouped).forEach(groupKey => {
        grouped[groupKey].sort((a, b) => {
          if (lowercaseFirstLetter(ordering) === 'priority') {
            return b.priority - a.priority ; // Sort by numeric priority (ascending)
          } else if (lowercaseFirstLetter(ordering) === 'title') {
            return a.title.localeCompare(b.title); // Sort alphabetically by title
          }
          return 0; // Default case (no sorting)
        });
      });
      
      return grouped;
    };

    // Call the function and set the state with grouped and sorted tickets
    const updatedGroupedTickets = groupAndSortTickets(tickets, grouping, ordering);
    setGroupedTickets(updatedGroupedTickets);

  }, [grouping, ordering, tickets]);

  //console.log(tickets,"from tickets");
  //console.log(groupedTickets);
  // Toggle display menu
  const handleDisplayClick = () => {
    setDisplayMenu(!displayMenu);
  };

  // Grouping change
  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
    //console.log(e.target.value)
  };

  // Ordering change
  const handleOrderingChange = (e) => {
    setOrdering(e.target.value);
    //console.log(e.target.value);
  };

  // return (
  //   <div className="kanban-board">
  //     <div className="header">
  //       <button onClick={handleDisplayClick} className="display-button">
  //         {/* Filter Icon as SVG */}
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="16"
  //           height="16"
  //           fill="currentColor"
  //           className="filter-icon"
  //           viewBox="0 0 16 16"
  //         >
  //           <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-4-4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
  //         </svg>
  //         Display
  //       </button>
  //       {displayMenu && (
  //         <div className="dropdown-menu">
  //           <div className="dropdown-item">
  //             <label htmlFor="grouping">Grouping</label>
  //             <select id="grouping" value={grouping} onChange={handleGroupingChange}>
  //               <option value="Status">Status</option>
  //               <option value="User">User</option>
  //               <option value="Priority">Priority</option>
  //             </select>
  //           </div>
  //           <div className="dropdown-item">
  //             <label htmlFor="ordering">Ordering</label>
  //             <select id="ordering" value={ordering} onChange={handleOrderingChange}>
  //               <option value="Priority">Priority</option>
  //               <option value="Title">Title</option>
  //             </select>
  //           </div>
  //         </div>
  //       )}
  //     </div>

  //     {/* Placeholder for Kanban Board content */}
  //     <div className="board-content">
  //       <h3>Kanban Board Content</h3>
  //       {/* You can replace this with dynamic cards */}
  //     </div>
  //   </div>
  // );
  return (
    <div className="kanban-board">
      <div className="header">
        <button onClick={handleDisplayClick} className="display-button">
          {/* Filter Icon as SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="filter-icon"
            viewBox="0 0 16 16"
          >
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-4-4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />
          </svg>
          Display
        </button>
        {displayMenu && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <label htmlFor="grouping">Grouping</label>
              <select id="grouping" value={grouping} onChange={handleGroupingChange}>
                <option value="Status">Status</option>
                <option value="User">User</option>
                <option value="Priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <label htmlFor="ordering">Ordering</label>
              <select id="ordering" value={ordering} onChange={handleOrderingChange}>
                <option value="Priority">Priority</option>
                <option value="Title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Kanban Board Content */}
      <div className="board-content">
        {Object.keys(groupedTickets).map((groupKey) => (
          <div key={groupKey} className="kanban-column">
            <h3>{groupKey}</h3>
            {groupedTickets[groupKey].map((ticket) => (
              <Card key={ticket.id} card={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default KanbanBoard;