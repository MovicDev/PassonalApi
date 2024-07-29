import React from 'react';
import AIInput from './components/AIInput';
import AIHeader from './components/AIHeader';


const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg">
        <AIHeader/>
        <AIInput/>
      </div>
    </div>
  );
}

export default App;
