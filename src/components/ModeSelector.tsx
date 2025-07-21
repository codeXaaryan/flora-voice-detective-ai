import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Scan, FileText, Zap, Clock, Target } from 'lucide-react';

interface AnalysisMode {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  recommended?: boolean;
}

interface ModeSelectorProps {
  selectedMode: string;
  onModeChange: (mode: string) => void;
}

const analysisModes: AnalysisMode[] = [
  {
    id: 'quick',
    name: 'Quick Scan',
    description: 'Fast disease detection for immediate results',
    icon: <Zap className="w-5 h-5" />,
    features: ['Instant analysis', 'Basic treatment', 'Common diseases'],
    recommended: true
  },
  {
    id: 'detailed',
    name: 'Detailed Analysis',
    description: 'Comprehensive health assessment with detailed insights',
    icon: <Scan className="w-5 h-5" />,
    features: ['Deep analysis', 'Multiple diseases', 'Confidence scores', 'Detailed treatment']
  },
  {
    id: 'professional',
    name: 'Professional Mode',
    description: 'Advanced analysis for agricultural professionals',
    icon: <Target className="w-5 h-5" />,
    features: ['Scientific names', 'Chemical treatments', 'Growth stage analysis', 'Yield impact']
  },
  {
    id: 'monitoring',
    name: 'Health Monitoring',
    description: 'Track plant health over time with progress reports',
    icon: <Clock className="w-5 h-5" />,
    features: ['Progress tracking', 'Historical data', 'Treatment effectiveness', 'Alerts']
  }
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({ 
  selectedMode, 
  onModeChange 
}) => {
  const selectedModeData = analysisModes.find(mode => mode.id === selectedMode);

  return (
    <Card className="border-primary/20 shadow-nature">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Analysis Mode
          <Badge variant="outline" className="ml-auto">
            {selectedModeData?.name}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {analysisModes.map((mode) => (
            <div
              key={mode.id}
              className={`relative rounded-lg border-2 transition-all cursor-pointer ${
                selectedMode === mode.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onModeChange(mode.id)}
            >
              {mode.recommended && (
                <Badge 
                  className="absolute -top-2 -right-2 bg-accent text-accent-foreground"
                >
                  Recommended
                </Badge>
              )}
              
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    selectedMode === mode.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {mode.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      selectedMode === mode.id ? 'text-primary' : 'text-foreground'
                    }`}>
                      {mode.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {mode.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {mode.features.map((feature, index) => (
                        <Badge 
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedMode === mode.id
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {selectedMode === mode.id && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};