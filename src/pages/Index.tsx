
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const subjects = [
    "Mathematics", 
    "Physics", 
    "Computer Science", 
    "History", 
    "Literature", 
    "Philosophy"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-32 px-4">
        <section className="max-w-5xl mx-auto">
          <div className={`text-center transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              Transformative Learning
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Learn Any Subject With 
              <span className="text-primary ml-2">AI Precision</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Experience education reimagined with our custom-built transformer model, 
              designed to adapt to your learning style and help you master any subject.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button asChild size="lg" className="rounded-full transition-all hover:scale-105">
                <Link to="/chat">Start Learning Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-2 transition-all hover:bg-secondary">
                Explore Capabilities
              </Button>
            </div>
          </div>

          <div className={`mt-20 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-semibold text-center mb-10">Available Subjects</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {subjects.map((subject, index) => (
                <div 
                  key={subject}
                  className="group aspect-square flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-secondary/50 shadow-sm hover:shadow-md transition-all border"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                    <span className="text-primary font-semibold">{subject.charAt(0)}</span>
                  </div>
                  <h3 className="font-medium text-center">{subject}</h3>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Interactive lessons
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`mt-32 mb-20 text-center transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
              Our custom-built transformer model is designed from scratch to provide personalized
              learning experiences across a wide range of subjects.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 rounded-2xl border bg-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 mx-auto">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Choose Your Subject</h3>
                <p className="text-sm text-muted-foreground">
                  Select from our growing library of subjects that interest you
                </p>
              </div>
              
              <div className="p-6 rounded-2xl border bg-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Ask Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Engage in a natural conversation to explore concepts and ideas
                </p>
              </div>
              
              <div className="p-6 rounded-2xl border bg-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Master Concepts</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI adapts to your learning style to help you truly understand
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TeachBot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
