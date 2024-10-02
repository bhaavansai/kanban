import React from 'react';
import '../styles/Card.css'; // Assume you have some styles here

const Card = ({ card }) => {
  const { id, title, tag, userId, user, status, priority } = card;

  // Function to generate initials from the username
  const getInitials = (user) => {
    if (!user) return '';
    const initials = user.slice(0, 2).toUpperCase(); // Take first 2 letters
    console.log(initials);
    return initials;
  };
  //console.log(username);

  // Determine priority icon and style based on the priority level
  const renderPriorityIcon = (priority) => {
    switch (priority) {
      case 1:
        return <span className="priority-icon">❗</span>; // High priority icon
      case 2:
        return <span className="priority-icon">⚠️</span>; // Medium priority icon
      default:
        return <span className="priority-icon">⬤</span>; // Low priority icon
    }
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <span className="card-id">#{id}</span>
        <div className="card-user">
          {/* Avatar with initials */}
          <div className="user-avatar-initials">
            {getInitials(user)}
          </div>
        </div>
      </div>

      <div className="card-content">
        <h3>{title}</h3>
        <div className="card-tags">
          {tag.map((t, index) => (
            <span key={index} className="tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <div className="card-status">{status}</div>
        <div className="card-priority">{renderPriorityIcon(priority)}</div>
      </div>
    </div>
  );
};
export default Card;
