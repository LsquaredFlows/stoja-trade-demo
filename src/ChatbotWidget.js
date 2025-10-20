import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPaperPlane, 
  FaTimes,
  FaRobot,
  FaUser,
  FaComments
} from 'react-icons/fa';
import './ChatbotWidget.css';

const WEBHOOK_URL = 'https://lsquaredflows.app.n8n.cloud/webhook/realestate_demo';

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Živjo! 👋 Dobrodošli v Stoja Trade.\n\nPomagam vam lahko z:\n• Iskanjem nepremičnin\n• Informacijami o stanovanjih\n• Cenami in lokacijami\n• Dogovorom za ogled\n\nKako vam lahko pomagam?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Send message to webhook
  const sendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          sessionId: sessionId,
          language: 'slovenian',
          action: 'sendMessage'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage = {
        role: 'assistant',
        content: data.response || data.message || data.output || 'Opravičujem se, vendar imam trenutno tehnične težave.',
        timestamp: new Date(),
        metadata: {
          hasUrl: data.url || false,
          url: data.url || null,
          language: data.language || 'slovenian'
        }
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage = {
        role: 'assistant',
        content: 'Opravičujem se, vendar imam trenutno težave s povezavo. Prosim, poskusite kasneje.',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  // Format message to make URLs clickable
  const formatMessageWithLinks = (text) => {
    // Regex for detecting URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Split text by URLs
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      // If it's a URL, make it clickable
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index}
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="message-url-link"
            onClick={(e) => e.stopPropagation()}
          >
            🔗 Kliknite za pregled
          </a>
        );
      }
      // Otherwise return plain text
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      {/* Chat Widget Button */}
      <motion.button
        className="chat-widget-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </motion.button>

      {/* Chat Widget Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-widget-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="chat-widget-header">
              <div className="chat-header-content">
                <FaRobot className="chat-header-icon" />
                <div>
                  <h4>Stoja Trade Asistent</h4>
                  <span className="status-online">● Na voljo</span>
                </div>
              </div>
              <button 
                className="chat-close-btn" 
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="chat-widget-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                  <div className="message-avatar">
                    {msg.role === 'assistant' ? <FaRobot /> : <FaUser />}
                  </div>
                  <div className="message-bubble">
                    <div className="message-text">
                      {formatMessageWithLinks(msg.content)}
                      {msg.timestamp && (
                        <span className="message-timestamp">
                          {new Date(msg.timestamp).toLocaleTimeString('sl-SI', { 
                            hour: 'numeric', 
                            minute: '2-digit',
                            hour12: false 
                          })}
                        </span>
                      )}
                    </div>
                    {msg.metadata?.hasUrl && msg.metadata.url && (
                      <a 
                        href={msg.metadata.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="message-link"
                      >
                        🔗 Oglejte si nepremičnine
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="chat-message assistant">
                  <div className="message-avatar">
                    <FaRobot />
                  </div>
                  <div className="message-bubble">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form className="chat-widget-input" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Vpišite sporočilo..."
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !inputMessage.trim()}
                className="send-button"
              >
                <FaPaperPlane />
              </button>
            </form>

            {/* Footer */}
            <div className="chat-widget-footer">
              <span className="footer-text">Powered by L² Flows AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatbotWidget;

