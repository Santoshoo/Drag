
import React, { useState } from 'react';
import './App.css'; // Assuming you have some basic styles

const App = () => {
  const [listA, setListA] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [listB, setListB] = useState([]);

  const handleDragStart = (e, item, fromList) => {
    e.dataTransfer.setData('item', item);
    e.dataTransfer.setData('fromList', fromList);
  };

  const handleDrop = (e, toList) => {
    const item = e.dataTransfer.getData('item');
    const fromList = e.dataTransfer.getData('fromList');
    
    if (fromList === 'listA') {
      setListA(listA.filter(i => i !== item));
      setListB([...listB, item]);
      console.log(`Added ${item} to list B`);
    } else {
      setListB(listB.filter(i => i !== item));
      setListA([...listA, item]);
      console.log(`Added ${item} to list A`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div
        className="list"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'listA')}
      >
        <h2>List A</h2>
        {listA.map(item => (
          <div
            key={item}
            draggable
            onDragStart={(e) => handleDragStart(e, item, 'listA')}
            className="item"
          >
            {item}
          </div>
        ))}
      </div>
      
      <div
        className="list"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'listB')}
      >
        <h2>List B</h2>
        {listB.map(item => (
          <div
            key={item}
            draggable
            onDragStart={(e) => handleDragStart(e, item, 'listB')}
            className="item"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

