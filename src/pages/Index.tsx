import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Copy, Sparkles, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_CHARS = 20000;

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [writingStyle, setWritingStyle] = useState("academic");
  const [personality, setPersonality] = useState("");
  const { toast } = useToast();

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to humanize.",
        variant: "destructive",
      });
      return;
    }

    if (inputText.length > MAX_CHARS) {
      toast({
        title: "Text too long",
        description: `Please keep your text under ${MAX_CHARS} characters.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setOutputText("");

    try {
      const { data, error } = await supabase.functions.invoke("humanize-text", {
        body: { text: inputText, style: writingStyle, personality: personality.trim() },
      });

      if (error) throw error;

      if (data?.humanizedText) {
        setOutputText(data.humanizedText);
        toast({
          title: "Success!",
          description: "Text humanized with 100% human writing approach!",
        });
      } else {
        throw new Error("No humanized text received");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to humanize text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text.",
        variant: "destructive",
      });
    }
  };

  const remainingChars = MAX_CHARS - inputText.length;
  const isOverLimit = remainingChars < 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 bg-card text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium font-logo">The Best Fucking Humanizer</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary font-logo">
            The Best Fucking Humanizer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform text into authentic human writing using patterns from doctoral dissertations, published literature, and peer-reviewed scholarly works—100% human-written training sources.
          </p>
        </div>

        {/* Configuration Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Writing Style Selector */}
          <Card className="p-6 border-border">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Writing Style</h3>
                <p className="text-sm text-muted-foreground">Based on scholarly human-written sources</p>
              </div>
              <Select value={writingStyle} onValueChange={setWritingStyle}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">📚 Academic (Scholarly Literature)</SelectItem>
                  <SelectItem value="creative">✨ Creative (Published Fiction)</SelectItem>
                  <SelectItem value="professional">💼 Professional (Business Writing)</SelectItem>
                  <SelectItem value="conversational">💬 Conversational (Essays & Memoirs)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Personality Input */}
          <Card className="p-6 border-border">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Personality (Optional)</h3>
                <p className="text-sm text-muted-foreground">Describe the writer's personality or voice</p>
              </div>
              <Textarea
                placeholder="e.g., skeptical and analytical, enthusiastic and curious, measured and thoughtful, direct and no-nonsense..."
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                className="min-h-[80px] resize-none"
                disabled={isLoading}
              />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Input Section */}
          <Card className="p-6 space-y-4 border-border hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="w-8 h-8 border border-primary flex items-center justify-center text-primary text-sm font-bold">
                  1
                </span>
                Original Text
              </h2>
              <span className={`text-sm font-medium ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                {remainingChars.toLocaleString()} characters left
              </span>
            </div>
            <Textarea
              placeholder="Paste your text here (up to 20,000 characters)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[400px] resize-none text-base leading-relaxed"
              disabled={isLoading}
            />
          </Card>

          {/* Output Section */}
          <Card className="p-6 space-y-4 border-border hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="w-8 h-8 border border-primary flex items-center justify-center text-primary text-sm font-bold">
                  2
                </span>
                Humanized Text
              </h2>
              {outputText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              )}
            </div>
            <Textarea
              placeholder="Your humanized text will appear here..."
              value={outputText}
              readOnly
              className="min-h-[400px] resize-none text-base leading-relaxed bg-muted"
            />
          </Card>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleHumanize}
            disabled={isLoading || !inputText.trim() || isOverLimit}
            size="lg"
            className="gap-2 px-8 py-6 text-lg font-semibold transition-all"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                Humanizing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Humanize Text
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="p-6 text-center space-y-3 border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 border border-primary flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">
              Trained exclusively on authentic scholarly literature—dissertations, peer-reviewed articles, and published works by human authors
            </p>
          </Card>

          <Card className="p-6 text-center space-y-3 border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 border border-primary flex items-center justify-center mx-auto">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Instant Results</h3>
            <p className="text-sm text-muted-foreground">
              Get humanized text in seconds with one click
            </p>
          </Card>

          <Card className="p-6 text-center space-y-3 border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 border border-primary flex items-center justify-center mx-auto">
              <Copy className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Easy to Use</h3>
            <p className="text-sm text-muted-foreground">
              Simple interface with copy-paste functionality
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
