
import { useState, useEffect, useCallback } from 'react';

// Basic implementation of attention mechanism
const calculateAttention = (query: number[], key: number[][]) => {
  // Simple dot product attention
  const scores = key.map(k => {
    // Dot product between query and key
    return query.reduce((sum, q, i) => sum + q * k[i], 0);
  });
  
  // Apply softmax to get attention weights
  const expScores = scores.map(score => Math.exp(score));
  const sumExpScores = expScores.reduce((sum, exp) => sum + exp, 0);
  const attentionWeights = expScores.map(exp => exp / sumExpScores);
  
  return attentionWeights;
};

// Multi-head attention implementation
const multiHeadAttention = (
  query: number[], 
  keys: number[][], 
  values: string[],
  numHeads: number = 2
) => {
  // Calculate attention weights
  const attentionWeights = calculateAttention(query, keys);
  
  // Find the index of the highest attention weight
  const maxIndex = attentionWeights.indexOf(Math.max(...attentionWeights));
  
  // Return the most relevant response
  return values[maxIndex] || '';
};

// A simple tokenizer for the model
const tokenize = (text: string): string[] => {
  return text.toLowerCase().split(/\s+|[.,!?;:()[\]{}'"]/g).filter(token => token.length > 0);
};

// Vector representation of tokens (extremely simplified)
const vectorize = (token: string): number[] => {
  // This is a very simplistic representation
  // In a real implementation, this would use embeddings
  const vector = new Array(10).fill(0);
  
  for (let i = 0; i < token.length; i++) {
    const code = token.charCodeAt(i);
    vector[i % vector.length] += code;
  }
  
  // Normalize
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map(val => val / (magnitude || 1));
};

// Subject knowledge bases with more humanized, conversational responses
const subjectResponses: Record<string, string[]> = {
  'Mathematics': [
    "I'd love to explain functions in mathematics! A function is like a machine that takes an input and produces exactly one output. For every element you put in, you get exactly one element out.",
    "The Pythagorean theorem is actually quite fascinating - it tells us that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides. It's pretty amazing how this works for ALL right triangles!",
    "Calculus might seem intimidating, but it's really just the study of how things change. It helps us understand rates of change and accumulation - things that are constantly happening in the world around us.",
    "Prime numbers are like the atoms of mathematics - they're the building blocks that can't be broken down further. Any number greater than 1 that isn't divisible by anything except itself and 1 is prime.",
    "Statistics is all about making sense of data. It helps us collect information, organize it, and draw meaningful conclusions - which is super important in today's data-driven world!",
    "Matrices might look like just grids of numbers, but they're incredibly useful tools. They help us solve systems of equations, transform coordinates, and they're essential in computer graphics and machine learning."
  ],
  'Physics': [
    "Newton's first law is pretty intuitive when you think about it - objects like to keep doing what they're already doing unless something interferes. If it's moving, it'll keep moving. If it's still, it'll stay put. This property is called inertia!",
    "Quantum mechanics reveals a weird but fascinating world at the tiny scale. Particles can behave like waves, exist in multiple states at once, and even seem to 'know' when they're being observed. It challenges our everyday intuition!",
    "Einstein's theory of relativity completely changed how we understand space and time. Instead of being fixed and absolute, they're actually connected and can stretch or compress depending on motion and gravity. Mind-blowing, right?",
    "Energy is such a fundamental concept - it's basically the ability to do work or create change. And one of the coolest things about energy is that it can't be created or destroyed, only transformed from one form to another.",
    "Thermodynamics is all about heat, energy, and work - and it affects everything from car engines to the universe itself. The laws of thermodynamics are some of the most fundamental rules in all of physics!",
    "The electromagnetic spectrum includes everything from radio waves to gamma rays, with visible light being just a tiny slice in the middle. It's amazing to think that all these different phenomena are actually the same type of wave, just with different energies!"
  ],
  'Computer Science': [
    "Algorithms are like recipes for solving problems. They're step-by-step instructions that help computers (and humans!) complete tasks efficiently. The cool thing is that the same algorithm works no matter what computer you run it on.",
    "Programming languages are how we communicate with computers. Each language has its own style and strengths - some are great for web development, others for scientific computing, and others for making games. It's all about picking the right tool for the job!",
    "Object-oriented programming is a really intuitive way to structure code. It models real-world objects with both data (properties) and behaviors (methods). This approach makes code more organized and reusable - pretty neat, right?",
    "Databases are like super-organized digital filing cabinets. They store massive amounts of information and let us retrieve exactly what we need, when we need it. Without them, services like social media or online shopping wouldn't be possible!",
    "Artificial intelligence tries to create systems that can learn and make decisions. While we're nowhere near human-level general intelligence, AI has gotten impressively good at specific tasks like image recognition and language processing.",
    "Big O notation helps us understand how algorithms perform as data gets larger. It's crucial because an algorithm that works fine with small amounts of data might become painfully slow with larger datasets. Efficiency matters!"
  ],
  'History': [
    "World War II was a truly global conflict that reshaped our world. It involved over 30 countries, cost tens of millions of lives, and led to major social and political changes that we still feel today.",
    "The Renaissance was this incredible period of rebirth in Europe where art, science, and learning flourished. People began questioning old ideas and embracing new ones - leading to amazing achievements in architecture, painting, literature, and science!",
    "The Industrial Revolution transformed not just how we make things, but how we live. People moved from farms to factories, cities grew rapidly, and for the first time, machines began doing work that humans and animals had always done before.",
    "Ancient Egypt created one of the most fascinating civilizations ever. For over 3,000 years, they built monuments that still amaze us today, developed sophisticated writing systems, and created a complex culture with detailed beliefs about life and death.",
    "The Cold War wasn't fought with direct battles between superpowers, but through espionage, proxy wars, and intense competition. The threat of nuclear war hung over everything, influencing politics, culture, and daily life around the world.",
    "The French Revolution completely overturned the old political and social order. It began with calls for liberty, equality, and fraternity but eventually led to the Reign of Terror and then Napoleon's rise to power - showing how revolutions can take unexpected turns."
  ],
  'Literature': [
    "Shakespeare wasn't just a playwright - he was a master of language who transformed English literature. He invented countless words and phrases we still use today, and created characters whose struggles feel remarkably modern even 400 years later.",
    "The novel as an art form gives us this amazing window into other lives and experiences. It can transport us to different times, places, and even into the minds of people completely different from ourselves.",
    "Poetry does something really special - it uses the sounds, rhythms, and patterns of language to create meaning and emotion that goes beyond just the dictionary definitions of words. It's language at its most concentrated and powerful!",
    "The Iliad is one of the oldest stories we have, and it's still captivating. It examines big themes like honor, rage, glory, and mortality through the lens of the Trojan War. It's been influencing storytellers for nearly 3,000 years!",
    "Modernist literature tried to capture the fragmented, disorienting experience of life in the early 20th century. Writers experimented with stream-of-consciousness techniques, non-linear narratives, and multiple perspectives to show how complex our inner lives really are.",
    "Jane Austen was revolutionary in how she portrayed everyday life and the interior thoughts of her characters, especially women. Her novels seem like simple romance stories on the surface, but they're actually sharp social critiques full of wit and insight."
  ],
  'Philosophy': [
    "Epistemology tackles some fascinating questions: How do we know what we know? Can we be certain about anything? What's the difference between knowledge and belief? These questions might seem abstract, but they're actually fundamental to how we understand our world.",
    "Existentialism focuses on our individual existence and the choices we make. Thinkers like Sartre suggested that we create our own meaning in a universe that doesn't provide it for us - which is both liberating and a bit terrifying!",
    "Ethics investigates what makes actions right or wrong, good or bad. Different ethical theories might emphasize consequences, duties, virtues, or care - and these different approaches can lead to very different conclusions about how we should live.",
    "Plato's ideas continue to shape Western thought 2,400 years later. His allegory of the cave, theory of forms, and dialogues on justice, knowledge, and love remain incredibly influential and thought-provoking even today.",
    "Kant revolutionized philosophy by suggesting that our minds actively structure our experience rather than passively receiving information. His categorical imperative - acting only according to rules you'd want universalized - remains one of the most important ideas in ethics.",
    "Nietzsche challenged conventional morality and urged us to question received wisdom. His ideas about power, the 'death of God,' and creating our own values have profoundly influenced modern thought, even if they're often misunderstood or oversimplified."
  ]
};

// Create keyword mappings for better question matching
const keywordMappings: Record<string, Record<string, number[]>> = {
  'Mathematics': {
    'function': [0],
    'pythagorean': [1], 'triangle': [1], 'hypotenuse': [1],
    'calculus': [2], 'derivative': [2], 'integral': [2],
    'prime': [3], 'numbers': [3],
    'statistics': [4], 'data': [4], 'probability': [4],
    'matrix': [5], 'matrices': [5], 'linear algebra': [5]
  },
  'Physics': {
    'newton': [0], 'motion': [0], 'inertia': [0], 'force': [0],
    'quantum': [1], 'mechanics': [1], 'uncertainty': [1], 'wave': [1],
    'relativity': [2], 'einstein': [2], 'spacetime': [2], 'gravity': [2],
    'energy': [3], 'conservation': [3], 'work': [3],
    'thermodynamics': [4], 'heat': [4], 'entropy': [4],
    'electromagnetic': [5], 'radiation': [5], 'light': [5], 'wave': [5]
  },
  'Computer Science': {
    'algorithm': [0], 'complexity': [0], 'efficiency': [0],
    'programming': [1], 'language': [1], 'syntax': [1], 'code': [1],
    'object': [2], 'class': [2], 'inheritance': [2], 'polymorphism': [2],
    'database': [3], 'sql': [3], 'query': [3], 'storage': [3],
    'artificial': [4], 'intelligence': [4], 'ai': [4], 'learning': [4],
    'big o': [5], 'time complexity': [5], 'space complexity': [5]
  },
  'History': {
    'world war': [0], 'ww2': [0], 'nazi': [0], 'holocaust': [0],
    'renaissance': [1], 'art': [1], 'da vinci': [1], 'michelangelo': [1],
    'industrial': [2], 'revolution': [2], 'factory': [2], 'steam': [2],
    'egypt': [3], 'pharaoh': [3], 'pyramid': [3], 'mummy': [3],
    'cold war': [4], 'soviet': [4], 'nuclear': [4], 'cuban missile': [4],
    'french revolution': [5], 'bastille': [5], 'napoleon': [5], 'robespierre': [5]
  },
  'Literature': {
    'shakespeare': [0], 'hamlet': [0], 'macbeth': [0], 'romeo': [0],
    'novel': [1], 'fiction': [1], 'character': [1], 'plot': [1],
    'poetry': [2], 'poem': [2], 'verse': [2], 'stanza': [2],
    'iliad': [3], 'odyssey': [3], 'homer': [3], 'trojan': [3], 
    'modernist': [4], 'joyce': [4], 'woolf': [4], 'stream of consciousness': [4],
    'austen': [5], 'pride and prejudice': [5], 'emma': [5], 'jane': [5]
  },
  'Philosophy': {
    'epistemology': [0], 'knowledge': [0], 'truth': [0], 'belief': [0],
    'existentialism': [1], 'existence': [1], 'sartre': [1], 'camus': [1],
    'ethics': [2], 'moral': [2], 'right': [2], 'wrong': [2], 'good': [2], 'bad': [2],
    'plato': [3], 'socrates': [3], 'cave': [3], 'form': [3], 'republic': [3],
    'kant': [4], 'categorical': [4], 'imperative': [4], 'duty': [4],
    'nietzsche': [5], 'god is dead': [5], 'will to power': [5], 'ubermensch': [5]
  }
};

// Function to find the most relevant response index based on keywords
const findRelevantResponseIndex = (query: string, subject: string): number => {
  const tokens = tokenize(query);
  const subjectKeywords = keywordMappings[subject] || {};
  
  // Count the matches for each response
  const responseMatches = new Array(subjectResponses[subject]?.length || 0).fill(0);
  
  tokens.forEach(token => {
    // Check for exact matches
    if (subjectKeywords[token]) {
      subjectKeywords[token].forEach(index => {
        responseMatches[index] += 2; // Give more weight to exact matches
      });
    }
    
    // Check for partial matches
    Object.keys(subjectKeywords).forEach(keyword => {
      if (keyword.includes(token) || token.includes(keyword)) {
        subjectKeywords[keyword].forEach(index => {
          responseMatches[index] += 1;
        });
      }
    });
  });
  
  // Find the response with the most matches
  let bestResponseIndex = 0;
  let highestMatch = 0;
  
  responseMatches.forEach((matchCount, index) => {
    if (matchCount > highestMatch) {
      highestMatch = matchCount;
      bestResponseIndex = index;
    }
  });
  
  // If no good matches, pick a random response
  if (highestMatch === 0) {
    return Math.floor(Math.random() * responseMatches.length);
  }
  
  return bestResponseIndex;
};

// Generate a response using our simple transformer model implementation
const generateTransformerResponse = (query: string, subject: string): string => {
  // Tokenize the input query
  const queryTokens = tokenize(query);
  
  // Get subject knowledge base
  const subjectData = subjectResponses[subject] || subjectResponses['Mathematics'];
  
  // Convert tokens to vector representations
  const queryVectors = queryTokens.map(token => vectorize(token));
  
  // Calculate average query vector (simplified)
  const queryVector = queryVectors.reduce(
    (avg, vec) => avg.map((val, i) => val + vec[i]),
    new Array(queryVectors[0]?.length || 10).fill(0)
  ).map(val => val / (queryVectors.length || 1));
  
  // If no valid query, return a friendly prompt
  if (queryTokens.length === 0) {
    return "I didn't quite catch that. Could you rephrase your question? I'm here to help you learn about " + subject + "!";
  }
  
  // Create keys from subject data
  const keys = subjectData.map(data => {
    const tokens = tokenize(data);
    const vectors = tokens.map(token => vectorize(token));
    return vectors.reduce(
      (avg, vec) => avg.map((val, i) => val + vec[i]),
      new Array(vectors[0]?.length || 10).fill(0)
    ).map(val => val / (vectors.length || 1));
  });
  
  // Find the most relevant response index based on keywords
  const relevantIndex = findRelevantResponseIndex(query, subject);
  
  // Get the most relevant response
  let mostRelevantInfo = subjectData[relevantIndex] || '';
  
  // Add conversational openings and personal touches
  const openings = [
    "Great question! ",
    "I'd be happy to explain that. ",
    "That's an interesting topic! ",
    "I'm glad you asked about that. ",
    "Let me help you understand that. ",
    "That's something I enjoy discussing! "
  ];
  
  const personalTouches = [
    " Does that make sense?",
    " What do you think about that?",
    " I hope that helps clarify things!",
    " Is there a specific part you'd like me to elaborate on?",
    " That's a fascinating area to explore, isn't it?",
    " Is there anything else you'd like to know about this topic?"
  ];

  // Check if a meaningful response was generated
  if (mostRelevantInfo) {
    // Construct a more personalized response based on query type
    const randomOpening = openings[Math.floor(Math.random() * openings.length)];
    const randomTouch = personalTouches[Math.floor(Math.random() * personalTouches.length)];
    
    // Adjust response based on query type
    let response = '';
    if (queryTokens.includes('what') || queryTokens.includes('explain') || queryTokens.includes('tell')) {
      response = `${randomOpening}${mostRelevantInfo}${randomTouch}`;
    } else if (queryTokens.includes('how')) {
      response = `${randomOpening}Here's how it works: ${mostRelevantInfo}${randomTouch}`;
    } else if (queryTokens.includes('why')) {
      response = `${randomOpening}The reason is fascinating: ${mostRelevantInfo}${randomTouch}`;
    } else if (queryTokens.includes('can') || queryTokens.includes('could')) {
      response = `${randomOpening}Yes, let me explain: ${mostRelevantInfo}${randomTouch}`;
    } else if (queryTokens.includes('define') || queryTokens.includes('meaning')) {
      response = `${randomOpening}Here's what that means: ${mostRelevantInfo}${randomTouch}`;
    } else {
      response = `${randomOpening}Regarding ${queryTokens.filter(t => t.length > 3).slice(0, 2).join(', ')}: ${mostRelevantInfo}${randomTouch}`;
    }
    
    return response;
  }
  
  return `I'm not entirely sure about that specific aspect of ${subject} yet, but I'd be happy to discuss something else in this area! What particular topic interests you most?`;
};

// Custom hook to use the transformer
export const useTransformer = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize the model
  useEffect(() => {
    // Simulate loading of model weights
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Generate a response
  const generateResponse = useCallback(async (query: string, subject: string): Promise<string> => {
    if (!isInitialized) {
      return "I'm still initializing. Please wait a moment...";
    }
    
    // Add artificial delay to simulate processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = generateTransformerResponse(query, subject);
        resolve(response);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    });
  }, [isInitialized]);
  
  return { generateResponse, isInitialized };
};
