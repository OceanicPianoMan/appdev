import React from 'react';

const Home = () => {
  // Dummy data for cards
  const cards = [
    { id: 1, title: 'Card 1', description: 'Description for Card 1' },
    { id: 2, title: 'Card 2', description: 'Description for Card 2' },
    { id: 3, title: 'Card 3', description: 'Description for Card 3' },
    // Add more cards as needed
  ];

  return (
    <div className="home">
      {cards.map(card => (
        <div key={card.id} className="card">
          <h2>{card.title}</h2>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
