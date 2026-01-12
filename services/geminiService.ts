/**
 * Gemini AI Service
 * Disabled for GitHub Pages deployment
 */

export const generateAIResponse = async (prompt: string): Promise<string> => {
  console.warn("Gemini AI service is disabled on GitHub Pages");
  return 'AI service is currently unavailable.';
};

export const isAIAvailable = (): boolean => {
  return false; // Always return false to disable AI features on GitHub Pages
};

export default {
  generateAIResponse,
  isAIAvailable,
};