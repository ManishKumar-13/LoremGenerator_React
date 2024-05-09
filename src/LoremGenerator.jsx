import React, { useState } from 'react';

const LoremGenerator = () => {
  const [paragraphs, setParagraphs] = useState(1);
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerateLorem = async () => {
    try {
      const response = await fetch(`https://baconipsum.com/api/?type=all-meat&paras=${paragraphs}&start-with-lorem=1`);
      if (!response.ok) {
        throw new Error('Failed to fetch Lorem Ipsum text');
      }
      const data = await response.json();
      const formattedText = data.join('\n'); // Join the paragraphs with a newline character between each
      console.log(formattedText);
      setGeneratedText(formattedText);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleParagraphChange = (e) => {
    setParagraphs(e.target.value);
  };

  return (
    <div className="LoremGenerator">
      <h1> Lorem Generator </h1>
      <div className="input-container">
        <label htmlFor="paragraphs">Number of Paragraphs:</label>
        <input
          type="number"
          id="paragraphs"
          value={paragraphs}
          min={1}
          onChange={handleParagraphChange}
        />
        <button onClick={handleGenerateLorem}>Generate</button>
      </div>
      {/* <button onClick={handleGenerateLorem}>Generate</button> */}
      {generatedText && (
        <div className="generated-text">
          {generatedText.split('\n').map((paragraph, index) => (
            <p key={index} style={{ marginLeft: '1rem'}}>{index + 1}. {paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoremGenerator;
