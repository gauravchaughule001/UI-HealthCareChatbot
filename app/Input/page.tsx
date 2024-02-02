'use client'
import TextInputComponent from '@/components/TextInputComponent';
import React, { useState, useRef } from 'react';

const YourComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTyping = (event:any) => {
    setInputValue(event.target.value);
    adjustTextareaHeight(); // Adjust textarea height when typing
  };

  const handleEnter = (event:any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      yourFunction();
      event.preventDefault();
    } else if (event.key === 'Enter' && event.shiftKey) {
      setInputValue(prevValue => prevValue + '\t');
      adjustTextareaHeight();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset the height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height to the scrollHeight
    }
  };

  const yourFunction = () => {
    console.log('Function called!');
    alert()
  };

  return (
    <div className="input-wrapper">
      <textarea
      placeholder='Enter a message...'
        ref={textareaRef}
        value={inputValue}
        onChange={handleTyping}
        onKeyDown={handleEnter}
        style={{
          maxHeight: '200px',
          width: '100%',
          resize: 'none',
          overflowY: 'auto',
          boxSizing: 'border-box',
          border: '1px solid #ccc',
          padding: '8px',
        }}
      />


      <TextInputComponent/>
    </div>
  );
};

export default YourComponent;
