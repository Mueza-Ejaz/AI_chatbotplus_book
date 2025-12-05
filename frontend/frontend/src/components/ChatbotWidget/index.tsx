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
    <div className={styles.chatbotContainer}>
      {isChatbotOpen && ( // Use isChatbotOpen from context
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Chatbot Assistant</h3>
            <div className={styles.modeToggle}>
              <button
                className={chatMode === 'book' ? styles.activeMode : ''}
                onClick={() => handleModeChange('book')}
              >
                Query Book
              </button>
              <button
                className={chatMode === 'selectedText' ? styles.activeMode : ''}
                onClick={() => handleModeChange('selectedText')}
              >
                Query Selected Text
              </button>
            </div>
            <button onClick={exportConversation} className={styles.exportButton}>Export</button>
            <button onClick={clearChatHistory} className={styles.clearHistoryButton}>Clear History</button>
            <button onClick={toggleChatbot} className={styles.closeButton}>X</button> {/* Use toggleChatbot from context */}
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
          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading}>Send</button>
          </div>
        </div>
      )}
      <button onClick={toggleChatbot} className={styles.chatToggleButton}> {/* Use toggleChatbot from context */}
        {isChatbotOpen ? 'Close Chat' : 'Open Chat'}
      </button>
    </div>
  );
};

export default ChatbotWidget;
