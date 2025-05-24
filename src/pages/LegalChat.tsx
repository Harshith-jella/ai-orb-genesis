
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden flex flex-col">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0.05),rgba(147,51,234,0.05),rgba(59,130,246,0.05))]"></div>
      
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(147,51,234,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>
      
      {/* Dynamic Light Rays */}
      <motion.div
        className="absolute inset-0 z-5"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      </motion.div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 z-15">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? 'rgba(59, 130, 246, 0.3)' : i % 3 === 1 ? 'rgba(147, 51, 234, 0.3)' : 'rgba(168, 85, 247, 0.3)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Top Bar */}
      <div className="relative z-20 bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white/20 backdrop-blur-sm border-2 border-white/30">
            <img 
              src="/lovable-uploads/a8363c4d-868a-43dc-afae-732459153676.png" 
              alt="Legal Bot"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold text-white">General Legal Bot</h1>
          <div className="ml-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
              Webhook Active
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="relative z-20 flex-1 overflow-y-auto px-4 py-6">
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
                        ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-bl-md'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                    } shadow-lg`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <div className={`mt-2 text-xs text-slate-300 ${message.isAI ? 'text-left' : 'text-right'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {message.isAI && (
                  <div className="order-1 mr-3 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white/20 backdrop-blur-sm border-2 border-white/30">
                      <img 
                        src="/lovable-uploads/a8363c4d-868a-43dc-afae-732459153676.png" 
                        alt="Legal Bot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {!message.isAI && (
                  <div className="order-2 ml-3 flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
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
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white/20 backdrop-blur-sm border-2 border-white/30">
                    <img 
                      src="/lovable-uploads/a8363c4d-868a-43dc-afae-732459153676.png" 
                      alt="Legal Bot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="max-w-xs">
                  <div className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl rounded-bl-md shadow-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-300">AI is typing...</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Section */}
      <div className="relative z-20 border-t border-white/20 bg-white/5 backdrop-blur-sm px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Helper Tip */}
          <div className="mb-3 text-center">
            <span className="text-sm text-slate-300">You can type in plain language.</span>
          </div>
          
          {/* Input Bar */}
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your legal issue..."
                className="rounded-full pr-12 py-3 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-slate-300 focus:border-blue-400 focus:ring-blue-400/50"
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="rounded-full w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-slate-500/50 border-0"
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
