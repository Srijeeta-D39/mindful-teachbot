
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SubjectSelectorProps {
  onSelectSubject: (subject: string) => void;
  selectedSubject: string | null;
}

const SubjectSelector = ({ onSelectSubject, selectedSubject }: SubjectSelectorProps) => {
  const subjects = [
    "Mathematics", 
    "Physics", 
    "Computer Science", 
    "History", 
    "Literature", 
    "Philosophy"
  ];

  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-lg font-medium mb-4">Choose a subject to begin</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {subjects.map((subject, index) => (
          <Button
            key={subject}
            variant={selectedSubject === subject ? "default" : "outline"}
            className={`justify-start h-auto py-3 px-4 rounded-xl transition-all ${
              selectedSubject === subject 
                ? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20" 
                : "hover:bg-secondary"
            }`}
            onClick={() => onSelectSubject(subject)}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between w-full">
              <span>{subject}</span>
              {selectedSubject === subject && (
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;
