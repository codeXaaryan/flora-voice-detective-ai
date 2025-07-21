import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Mic, MicOff, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isAudio?: boolean;
}

interface ChatInterfaceProps {
  selectedLanguage: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedLanguage }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI plant health assistant. I can help you identify plant diseases, provide treatment recommendations, and answer questions about plant care. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your description, it sounds like your plant might have a nutrient deficiency. Can you tell me more about the yellowing pattern on the leaves?",
        "That's a great question! For watering, most houseplants prefer to dry out slightly between waterings. Check the soil moisture with your finger about 1-2 inches deep.",
        "Fungal infections are common in humid conditions. I recommend improving air circulation and reducing watering frequency. You might also want to apply a fungicide.",
        "To prevent future issues, ensure your plant has proper drainage, adequate light, and isn't overcrowded with other plants.",
        "Would you like me to analyze a photo of your plant? I can provide more specific recommendations based on what I see."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    sendMessage(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Implement Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'es' ? 'es-ES' : selectedLanguage === 'fr' ? 'fr-FR' : 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
        toast({
          title: "Voice Input",
          description: "Voice message captured successfully",
        });
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Input Error",
          description: "Could not capture voice input",
        });
      };

      recognition.start();
    } else {
      setIsListening(false);
      toast({
        title: "Voice Input Not Supported",
        description: "Your browser doesn't support voice input",
      });
    }
  };

  const speakMessage = (content: string) => {
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = selectedLanguage === 'es' ? 'es-ES' : selectedLanguage === 'fr' ? 'fr-FR' : 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <Card className="h-[600px] flex flex-col border-primary/20 shadow-nature">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          AI Plant Health Assistant
          <Badge variant="outline" className="ml-auto">
            {selectedLanguage.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-2 gap-2">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {message.sender === 'bot' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakMessage(message.content)}
                      className="h-auto p-1 opacity-70 hover:opacity-100"
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-secondary text-secondary-foreground rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about plant diseases, care tips, or upload a photo..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              variant="outline"
              onClick={startVoiceInput}
              disabled={isTyping || isListening}
              className={isListening ? 'bg-red-100 border-red-300 text-red-700' : ''}
            >
              {isListening ? <Mic className="w-4 h-4 animate-pulse" /> : <MicOff className="w-4 h-4" />}
            </Button>
            <Button 
              onClick={handleSend} 
              disabled={!inputMessage.trim() || isTyping}
              variant="nature"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};