import { AICodeHelp } from '../types';

// In a real app, this would call a backend endpoint that interfaces with OpenAI/Gemini
// For demo purposes, we'll simulate API responses
export const getCodeExplanation = async (
  code: string,
  language: string
): Promise<AICodeHelp> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simple mock explanations based on language
  const explanations: Record<string, string> = {
    javascript: 
      "This JavaScript code defines a function called 'welcome' that logs a greeting message to the console. " +
      "When the code runs, it calls this function which displays 'Welcome to the collaborative session!' in the console. " +
      "This is a simple demonstration of function definition and execution in JavaScript.",
    
    typescript: 
      "This TypeScript code creates a function that outputs a welcome message. " +
      "TypeScript extends JavaScript by adding type annotations and other features that help catch errors during development. " +
      "In this example, no explicit types are defined, but TypeScript will infer them automatically.",
    
    python:
      "This Python code defines a function called 'welcome' that prints a greeting message. " +
      "The function is then called to display 'Welcome to the collaborative session!' in the console. " +
      "Python uses indentation to define code blocks, unlike many other languages that use braces.",
    
    java:
      "This Java code defines a class with a main method that prints a welcome message. " +
      "In Java, all code must be within a class, and the program execution starts from the main method. " +
      "System.out.println() is used to output text to the console.",
    
    // Default explanation for other languages
    default:
      "This code defines a function that outputs a welcome message to the console and then executes it. " +
      "This is a common pattern in programming to organize code into reusable blocks (functions) " +
      "and then invoke them when needed."
  };

  // Generate mock suggestions
  const suggestions = [
    "Consider adding comments to explain the purpose of this function",
    "You could make this more reusable by accepting a parameter for the message",
    "For better organization, you might want to group related functions in a module or class"
  ];

  return {
    code,
    language,
    explanation: explanations[language] || explanations.default,
    suggestions
  };
};

// Function to get debugging help
export const getDebuggingHelp = async (
  code: string,
  language: string,
  error: string
): Promise<AICodeHelp> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1800));

  return {
    code,
    language,
    explanation: 
      `The error "${error}" typically occurs when there's a syntax issue in your code. ` +
      `In ${language}, you need to ensure all brackets and parentheses are properly closed. ` +
      `Check for missing semicolons or commas if required by the language. ` +
      `Also, verify that all variables are properly declared before use.`,
    suggestions: [
      "Ensure all opening brackets have matching closing brackets",
      "Check for missing semicolons at the end of statements",
      "Verify that all variables are declared before being used",
      "Look for typos in variable or function names"
    ]
  };
};

// Function to get code improvement suggestions
export const getCodeImprovements = async (
  code: string,
  language: string
): Promise<AICodeHelp> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    code,
    language,
    explanation: 
      `Your code is functional, but could be improved in several ways. ` +
      `For ${language} code, consider following these best practices: ` +
      `Use descriptive variable names, add comments for complex logic, ` +
      `and structure your code for readability and maintainability.`,
    suggestions: [
      "Use more descriptive variable and function names",
      "Add comments to explain complex sections of code",
      "Consider breaking down large functions into smaller, more focused ones",
      "Add error handling for more robust code",
      "Use consistent formatting and indentation"
    ]
  };
};