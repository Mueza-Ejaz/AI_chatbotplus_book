import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatbotWidget.module.css';
import clsx from 'clsx';
import { useChatbot } from '@site/src/contexts/ChatbotContext'; // Import useChatbot

type ChatMode = 'book' | 'selectedText';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  sources?: string[];
}

const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://your-production-backend.com'; // Adjust for production

const ChatbotWidget: React.FC = () => {
  const { isChatbotOpen, toggleChatbot } = useChatbot(); // Use context for chatbot open state
  const [chatMode, setChatMode] = useState<ChatMode>('book');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleModeChange = (mode: ChatMode) => {
    setChatMode(mode);
  };

  const clearChatHistory = () => {
    setMessages([]);
  };

  const exportConversation = () => {
    const conversation = messages
      .map((msg) => `${msg.sender === 'user' ? 'User' : 'Bot'}: ${msg.text}${msg.sources && msg.sources.length > 0 ? ` (Sources: ${msg.sources.join(', ')})` : ''}`)
      .join('\n');
    const blob = new Blob([conversation], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chatbot_conversation.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSelectedText = (): string => {
    if (typeof window !== 'undefined') {
      return window.getSelection()?.toString() || '';
    }
    return '';
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { id: messages.length + 1, text: inputMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    let selectedText = '';
    if (chatMode === 'selectedText') {
      selectedText = getSelectedText();
      if (!selectedText) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: "Please select some text on the page to use 'Query Selected Text' mode.", sender: 'bot' },
        ]);
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.text,
          mode: chatMode === 'book' ? 'full_book' : 'selected_text',
          selected_text: selectedText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch response from chatbot.');
      }

      const data = await response.json();
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        text: data.response,
        sender: 'bot',
        sources: data.sources,
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error: any) {
      console.error('Chatbot API error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: `Error: ${error.message}`, sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {isChatbotOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Chatbot Assistant</h3>
            <button onClick={toggleChatbot} className={styles.closeButton}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.closeIcon}>
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 12.707a1 1 0 01-1.414 0L12 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L10.586 12l-3.293-3.293a1 1 0 011.414-1.414L12 10.586l3.293-3.293a1 1 0 011.414 1.414L13.414 12l3.293 3.293a1 1 0 010 1.414z" />
              </svg>
            </button>
          </div>
          <div className={styles.chatControls}>
            <div className={styles.modeToggle}>
              <button
                className={clsx(styles.controlButton, chatMode === 'book' && styles.activeMode)}
                onClick={() => handleModeChange('book')}
                title="Query Book Content"
              >
                Query Book
              </button>
              <button
                className={clsx(styles.controlButton, chatMode === 'selectedText' && styles.activeMode)}
                onClick={() => handleModeChange('selectedText')}
                title="Query Selected Text on Page"
              >
                Query Selected Text
              </button>
            </div>
            <div className={styles.actionButtons}>
              <button onClick={exportConversation} className={styles.controlButton} title="Export Conversation">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.actionIcon}>
                  <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14a1 1 0 01-2 0V9a1 1 0 012 0zm-1-7a1 1 0 010-2 1 1 0 010 2z" opacity="0"></path>
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.5 9.75a.75.75 0 00-1.5 0V16a.75.75 0 001.5 0v-4zm-.25-5.25a.75.75 0 00-1.5 0 .75.75 0 001.5 0z" clipRule="evenodd" />
                </svg>
                Export
              </button>
              <button onClick={clearChatHistory} className={styles.controlButton} title="Clear Chat History">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.actionIcon}>
                  <path d="M14.74 3H9.26a2.25 2.25 0 00-2.247 2.074L6.2 8.75A2.25 2.25 0 006 9.75a.75.75 0 00.75.75h10.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.813-1.676l-1.313-3.674A2.25 2.25 0 0014.74 3zM12 14.25a.75.75 0 01-.75-.75V10a.75.75 0 011.5 0v3.5a.75.75 0 01-.75.75zm.75 2.25a.75.75 0 00-1.5 0 .75.75 0 001.5 0z" opacity="0"></path>
                  <path fillRule="evenodd" d="M16.5 4.478v.25c0 1.092-.907 1.972-2.025 2.115L12 7.726l-2.475-.883C8.407 6.7 7.5 5.828 7.5 4.728v-.25c0-1.07.834-1.947 1.868-1.979L12 2.25l2.632.249c1.034.032 1.868.909 1.868 1.979zM12 9.75a.75.75 0 00-1.5 0V14a.75.75 0 001.5 0V9.75zm3.75 4.5a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75V8.25a.75.75 0 011.5 0v5.5H15V9.75a.75.75 0 011.5 0v4.5zm-4.5 2.25a.75.75 0 00-1.5 0 .75.75 0 001.5 0z" clipRule="evenodd" />
                </svg>
                Clear
              </button>
            </div>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((message) => (
              <div key={message.id} className={clsx(
                styles.messageBubble,
                message.sender === 'user' ? styles.userMessage : styles.botMessage
              )}>
                <p>{message.text}</p>
                {message.sources && message.sources.length > 0 && (
                  <div className={styles.messageSources}>
                    <strong>Sources:</strong> {message.sources.join(', ')}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className={clsx(styles.messageBubble, styles.botMessage)}>
                <p>Typing...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.chatInputArea}>
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className={styles.chatInputField}
            />
            <button onClick={sendMessage} disabled={isLoading} className={styles.sendButton}>
              Send
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.sendIcon}>
                <path d="M3.478 2.404a.75.75 0 00-.924 1.053l.56 1.109L22.84 12l-19.726 7.434-.56 1.109a.75.75 0 00.924 1.053L22.378 13.11a.75.75 0 000-1.22l-18.9-9.486z" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <button onClick={toggleChatbot} className={clsx(styles.chatToggleButton, isChatbotOpen && styles.chatToggleButtonOpen)}>
        {isChatbotOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.closeIcon}>
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 12.707a1 1 0 01-1.414 0L12 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L10.586 12l-3.293-3.293a1 1 0 011.414-1.414L12 10.586l3.293-3.293a1 1 0 011.414 1.414L13.414 12l3.293 3.293a1 1 0 010 1.414z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.openIcon}>
            <path d="M4.031 3.22C1.309 5.378 0 8.056 0 11.238c0 2.221.71 4.316 2.059 6.041.092.115.198.225.319.324-.468 1.168-1.006 2.375-1.055 2.502-.132.348-.052.748.204 1.004a.75.75 0 001.004.204c.127-.049 1.334-.587 2.502-1.055.099.121.209.227.324.319 1.725 1.349 3.82 2.059 6.041 2.059 3.182 0 5.86-1.309 8.018-4.031C22.68 18.22 24 15.542 24 12.36S22.68 6.666 19.957 4.508C17.235 2.35 14.557 1 11.375 1S5.697 2.35 4.031 3.22zm1.259 2.247c1.378-.716 3.037-1.125 4.885-1.125 2.56 0 4.791 1.096 6.556 3.266 1.765 2.17 2.648 4.67 2.648 7.255 0 2.586-.883 5.085-2.648 7.255-1.765 2.17-3.996 3.266-6.556 3.266-1.848 0-3.507-.41-4.885-1.125a.75.75 0 00-.28-.088l-1.905.748c-.017.006-.03.01-.044.013a.75.75 0 01-.617-.46l-1.055-2.502a.75.75 0 00-.088-.28A8.875 8.875 0 015.29 5.467zM11.75 9a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V9zm3.5 0a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V9z" opacity="0"></path>
            <path fillRule="evenodd" d="M4.031 3.22C1.309 5.378 0 8.056 0 11.238c0 2.221.71 4.316 2.059 6.041.092.115.198.225.319.324-.468 1.168-1.006 2.375-1.055 2.502-.132.348-.052.748.204 1.004a.75.75 0 001.004.204c.127-.049 1.334-.587 2.502-1.055.099.121.209.227.324.319 1.725 1.349 3.82 2.059 6.041 2.059 3.182 0 5.86-1.309 8.018-4.031C22.68 18.22 24 15.542 24 12.36S22.68 6.666 19.957 4.508C17.235 2.35 14.557 1 11.375 1S5.697 2.35 4.031 3.22zM12 4.5a.75.75 0 01.75.75v5a.75.75 0 01-1.5 0v-5A.75.75 0 0112 4.5zm-3.5 5.75a.75.75 0 00-1.5 0V14a.75.75 0 001.5 0v-3.75z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </>
  );
};

export default ChatbotWidget;
