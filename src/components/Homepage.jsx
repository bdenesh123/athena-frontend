import React, { useEffect, useRef, useState } from 'react';
import InputField from './InputField';
import useChatMutation from '@/api/useChatMutation';

const Homepage = () => {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const chatMutation = useChatMutation({
    onSuccess: (reply, userMessage) => {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: userMessage },
        { sender: 'bot', text: reply },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Error getting reply from server.' },
      ]);
    },
  });

  const handleInput = (inputValue) => {
    if (inputValue.trim() === '') return;
    chatMutation.mutate(inputValue);
  };

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatMutation.isPending]);

  return (
    <div className='flex h-[100dvh] flex-col bg-background text-foreground'>
      {/* Chat Header */}
      <div className='flex items-center border-b border-border p-4'>
        <span className='text-lg font-bold'>
          <span className='bg-gradient-to-r from-[#f56565] to-[#ec4899] bg-clip-text text-transparent'>
            Athena AI
          </span>{' '}
          <span className='bg-gradient-to-r from-[#4285F4] to-[#26DDF9] bg-clip-text text-transparent'>
            by Gemini
          </span>
        </span>
      </div>

      {/* Chat Window */}
      <div className='flex-1 space-y-3 overflow-y-auto p-4'>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs break-words rounded-xl px-4 py-2 md:max-w-md ${
                msg.sender === 'user'
                  ? 'rounded-br-none bg-primary text-primary-foreground'
                  : 'rounded-bl-none bg-card text-card-foreground'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {chatMutation.isPending && (
          <div className='flex justify-start'>
            <div className='flex items-center space-x-1 rounded-xl rounded-bl-none bg-card px-4 py-2 text-card-foreground'>
              <span className='h-2 w-2 animate-bounce rounded-full bg-primary'></span>
              <span className='h-2 w-2 animate-bounce rounded-full bg-primary delay-150'></span>
              <span className='h-2 w-2 animate-bounce rounded-full bg-primary delay-300'></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Field */}
      <div className='sticky bottom-0 border-t border-border bg-input p-4'>
        <InputField onChange={handleInput} />
      </div>
    </div>
  );
};

export default Homepage;
