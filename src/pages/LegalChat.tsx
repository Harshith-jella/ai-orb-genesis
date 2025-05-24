import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Spline from '@splinetool/react-spline';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

const LegalChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI legal assistant. I can help you understand legal concepts, document requirements, and guide you through legal processes. How can I assist you today?",
      isAI: true,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendToWebhook = async (message: Message) => {
    try {
      console.log('Sending message to webhook:', message);
      const response = await fetch('https://harshithjella.app.n8n.cloud/webhook-test/general-legal-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId: message.id,
          content: message.content,
          isAI: message.isAI,
          timestamp: message.timestamp.toISOString(),
          sender: message.isAI ? 'bot' : 'user',
          chatSession: 'general-legal-chat'
        }),
      });

      if (response.ok) {
        console.log('Message sent to webhook successfully');
        const responseData = await response.json();
        console.log('Webhook response:', responseData);
        return responseData;
      } else {
        console.error('Failed to send message to webhook:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error sending message to webhook:', error);
      return null;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isAI: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Send user message to webhook and wait for response
    const webhookResponse = await sendToWebhook(userMessage);
    
    // Create AI response based on webhook response
    let aiResponseContent = "I apologize, but I'm having trouble connecting to the legal assistant service right now. Please try again.";
    
    if (webhookResponse) {
      // Extract response content from webhook response
      if (webhookResponse.output) {
        aiResponseContent = webhookResponse.output;
      } else if (typeof webhookResponse === 'string') {
        aiResponseContent = webhookResponse;
      } else if (webhookResponse.message) {
        aiResponseContent = webhookResponse.message;
      }
    }

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: aiResponseContent,
      isAI: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);

    // Send AI response to webhook for logging
    await sendToWebhook(aiResponse);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-navy-600">
            <Spline
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <h1 className="text-xl font-semibold text-slate-800">General Legal Bot</h1>
          <div className="ml-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Webhook Active
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-xs md:max-w-xl ${message.isAI ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.isAI
                        ? 'bg-white border border-slate-200 text-slate-800 rounded-bl-md'
                        : 'bg-blue-600 text-white rounded-br-md'
                    } shadow-sm`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <div className={`mt-2 text-xs text-slate-500 ${message.isAI ? 'text-left' : 'text-right'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {message.isAI && (
                  <div className="order-1 mr-3 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-slate-200">
                      <Spline
                        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                )}
                
                {!message.isAI && (
                  <div className="order-2 ml-3 flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="mr-3 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-slate-200">
                    <Spline
                      scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
                <div className="max-w-xs">
                  <div className="px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">AI is typing...</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Section */}
      <div className="border-t border-slate-200 bg-white px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Helper Tip */}
          <div className="mb-3 text-center">
            <span className="text-sm text-slate-500">You can type in plain language.</span>
          </div>
          
          {/* Input Bar */}
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your legal issue..."
                className="rounded-full pr-12 py-3 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="rounded-full w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-3 text-xs text-slate-400 text-center">
            This AI provides general legal information only and does not constitute legal advice.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalChat;
