
import { useState } from "react";
import Header from "@/components/Header";
import SubjectSelector from "@/components/SubjectSelector";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-8 px-4 max-w-6xl mx-auto w-full">
        <div className="h-full flex flex-col">
          {!selectedSubject ? (
            <div className="flex-1 flex flex-col items-center justify-center pb-12">
              <h1 className="text-3xl font-bold mb-8 text-center animate-fade-in">
                What would you like to learn today?
              </h1>
              <SubjectSelector 
                onSelectSubject={(subject) => setSelectedSubject(subject)}
                selectedSubject={selectedSubject}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-[calc(100vh-130px)]">
              <div className="bg-card shadow-sm border rounded-xl p-3 mb-6 flex items-center justify-between animate-fade-in">
                <div>
                  <div className="text-xs text-muted-foreground">Current subject</div>
                  <div className="font-medium">{selectedSubject}</div>
                </div>
                <button 
                  onClick={() => setSelectedSubject(null)}
                  className="text-sm text-primary hover:underline transition-all"
                >
                  Change subject
                </button>
              </div>
              
              <div className="flex-1 bg-card shadow-sm border rounded-xl overflow-hidden animate-fade-in">
                <ChatInterface subject={selectedSubject} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chat;
