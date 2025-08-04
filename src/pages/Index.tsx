import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PlantAnalyzer } from '@/components/PlantAnalyzer';
import { ChatInterface } from '@/components/ChatInterface';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ModeSelector } from '@/components/ModeSelector';
import { Leaf, Camera, MessageCircle, Settings, Sparkles } from 'lucide-react';
import heroPlant from '@/assets/hero-plant.jpg';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [analysisMode, setAnalysisMode] = useState('quick');

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-light via-background to-secondary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroPlant})` }}
        />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary text-primary-foreground animate-leaf-bounce">
                <Leaf className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-leaf-green bg-clip-text text-transparent">
                PlantAI Doctor
              </h1>
              <div className="p-3 rounded-full bg-accent text-accent-foreground animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              AI-powered plant disease detection with multi-language support and voice commands. 
              Snap a photo, get instant diagnosis, and save your plants with expert care recommendations.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm">
                🔬 Advanced AI Analysis
              </Badge>
              <Badge className="bg-accent/10 text-accent-foreground border-accent/20 px-4 py-2 text-sm">
                🌍 12+ Languages
              </Badge>
              <Badge className="bg-nature-green/10 text-nature-green border-nature-green/20 px-4 py-2 text-sm">
                🎤 Voice Commands
              </Badge>
              <Badge className="bg-leaf-green/10 text-leaf-green border-leaf-green/20 px-4 py-2 text-sm">
                📱 Mobile Friendly
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="analyzer" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/50 backdrop-blur-sm border border-primary/20">
              <TabsTrigger 
                value="analyzer" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Camera className="w-4 h-4" />
                Scanner
              </TabsTrigger>
              <TabsTrigger 
                value="chat" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MessageCircle className="w-4 h-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="max-w-4xl mx-auto">
            <TabsContent value="analyzer" className="space-y-6 animate-fade-in-up">
              <PlantAnalyzer 
                selectedLanguage={selectedLanguage}
                analysisMode={analysisMode}
              />
            </TabsContent>

            <TabsContent value="chat" className="animate-fade-in-up">
              <ChatInterface selectedLanguage={selectedLanguage} />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 animate-fade-in-up">
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                <LanguageSelector
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                />
                <ModeSelector
                  selectedMode={analysisMode}
                  onModeChange={setAnalysisMode}
                />
              </div>
              
              <Card className="border-primary/20 shadow-nature">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Ready to Get Started?</h3>
                    <p className="text-muted-foreground">
                      Switch to the Scanner tab to begin analyzing your plants, or use the Chat tab 
                      to ask questions about plant care and diseases.
                    </p>
                    <Button variant="nature" size="lg" className="animate-pulse-nature">
                      <Camera className="w-4 h-4 mr-2" />
                      Start Plant Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default Index;
