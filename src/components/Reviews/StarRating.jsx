import React from 'react';

const StarRating = ({ star }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ color: i <= star ? 'gold' : 'gray', fontSize: '1.5em' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarRating;