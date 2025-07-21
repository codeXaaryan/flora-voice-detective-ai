import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  disease: string;
  confidence: number;
  treatment: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

interface PlantAnalyzerProps {
  selectedLanguage: string;
  analysisMode: string;
}

export const PlantAnalyzer: React.FC<PlantAnalyzerProps> = ({ selectedLanguage, analysisMode }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageCapture = () => {
    // In a real app, this would open camera
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: AnalysisResult[] = [
        {
          disease: 'Early Blight',
          confidence: 87,
          treatment: 'Apply copper-based fungicide every 7-10 days. Remove affected leaves and improve air circulation.',
          severity: 'medium',
          description: 'A fungal disease causing brown spots with concentric rings on older leaves.'
        },
        {
          disease: 'Healthy Plant',
          confidence: 94,
          treatment: 'No treatment needed. Continue regular care and monitoring.',
          severity: 'low',
          description: 'Your plant appears healthy with no signs of disease.'
        },
        {
          disease: 'Bacterial Spot',
          confidence: 79,
          treatment: 'Remove infected leaves, avoid overhead watering, and apply bactericide if severe.',
          severity: 'high',
          description: 'Bacterial infection causing dark spots with yellow halos on leaves.'
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${randomResult.disease} (${randomResult.confidence}% confidence)`,
      });
    }, 3000);
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Implement Web Speech API for voice input
    setTimeout(() => {
      setIsListening(false);
      toast({
        title: "Voice Input",
        description: "Voice command received: 'Analyze my plant'",
      });
    }, 2000);
  };

  const speakResult = () => {
    if (analysisResult) {
      setIsSpeaking(true);
      // Implement text-to-speech
      const utterance = new SpeechSynthesisUtterance(
        `Analysis complete. I detected ${analysisResult.disease} with ${analysisResult.confidence}% confidence. ${analysisResult.description} ${analysisResult.treatment}`
      );
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Camera Interface */}
      <Card className="border-primary/20 shadow-nature">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Plant Disease Scanner
            <Badge variant="outline" className="text-primary">
              {analysisMode}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedImage ? (
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Selected plant" 
                className="w-full h-64 object-cover rounded-lg border-2 border-primary/20"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p>Analyzing plant health...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center bg-nature-light">
              <div className="text-center text-muted-foreground">
                <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p>Capture or upload an image of your plant</p>
              </div>
            </div>
          )}
          
          <div className="flex gap-3">
            <Button 
              variant="nature" 
              onClick={handleImageCapture}
              className="flex-1"
              disabled={isAnalyzing}
            >
              <Camera className="w-4 h-4" />
              Capture Image
            </Button>
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
            >
              <Upload className="w-4 h-4" />
              Upload
            </Button>
            <Button
              variant="outline"
              onClick={startVoiceInput}
              disabled={isAnalyzing}
              className={isListening ? 'bg-red-100 border-red-300 text-red-700' : ''}
            >
              {isListening ? <Mic className="w-4 h-4 animate-pulse" /> : <MicOff className="w-4 h-4" />}
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <Card className="border-primary/20 shadow-nature animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Analysis Results
              <Button
                variant="ghost"
                size="sm"
                onClick={speakResult}
                disabled={isSpeaking}
              >
                {isSpeaking ? (
                  <VolumeX className="w-4 h-4 animate-pulse" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-primary">{analysisResult.disease}</h3>
              <Badge className={getSeverityColor(analysisResult.severity)}>
                {analysisResult.confidence}% confidence
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-foreground mb-1">Description</h4>
                <p className="text-muted-foreground">{analysisResult.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-1">Recommended Treatment</h4>
                <p className="text-muted-foreground">{analysisResult.treatment}</p>
              </div>
              
              <Badge 
                variant="outline" 
                className={`${getSeverityColor(analysisResult.severity)} w-fit`}
              >
                Severity: {analysisResult.severity.charAt(0).toUpperCase() + analysisResult.severity.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};