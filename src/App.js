import React, { useState } from 'react';

import './App.css';
import { useSpeech, useRecognition } from 'react-web-voice';

const colors = {
  красный: 'red',
  оранжевый: 'orange',
  жёлтый: 'yellow',
  зелёный: 'green',
  голубой: 'blue',
  синий: 'darkblue',
  фиолетовый: 'violet'
};

const App = () => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#282c34');
  
  const { messages, speak } = useSpeech({ voice: 'Karen' });

  const { transcripts, listen } = useRecognition();

  const handleSpeak = async () => {
    await speak({
      text,
      volume: 1,
      rate: 1,
      pitch: 1
    })
  };

  const handleListen = async () => {
    const transcript = await listen();
    if(Object.keys(colors).includes(transcript)){
      setColor(colors[transcript]);
    }
  };

  const handleSetText = e => setText(e.target.value);

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: color }}>
        <input type="text" onChange={handleSetText} value={text} />
        <button onClick={handleSpeak}>Введите тект и прослушайте</button>
        <br />
        <button onClick={handleListen}>Нажмите кнопку и назовите цвет</button>
        {
          Object.keys(colors).map(color => <p>{color}</p>)
        }
      </header>
    </div>
  );
}

export default App;
