// App.js
import React, { useState } from 'react';
import './style.css';
import SectionTitle from '../src/components/others/SectionTitle';
import CurrencyCard from '../src/components/converter/CurrencyCard';
import AddCardButton from './components/converter/AddCardButton';

function App() {
  const [cards, setCards] = useState([
    {
      id: 0,
      image: require('../src/images/aud-flag.png'),
      title: 'Australiano',
    },
  ]);
  const [showAddButton, setShowAddButton] = useState(true);

  const handleAddCard = () => {
    if (cards.length < 2) {
      const newCard = {
        id: cards.length,
        image: require('../src/images/usd-flag.png'),
        title: 'Americano',
      };

      setCards((prevCards) => [...prevCards, newCard]);

      if (cards.length === 1) {
        setShowAddButton(false);
      }
    }
  };

  return (
    <div className="container mx-auto pt-11">
      <SectionTitle />
      <div className="mt-16 flex overflow-x-scroll">
        {cards.map((card, index) => (
          <div key={card.id} className={`mr-8 ${index === 0 ? 'first-card' : ''}`}>
            <CurrencyCard image={card.image} title={card.title} isFirstCard={index === 0} />
          </div>
        ))}
        {showAddButton && (
          <div className="ml-8">
            <AddCardButton onClick={handleAddCard} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
