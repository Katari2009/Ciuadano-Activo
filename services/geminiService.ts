import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateStudyContent = async (topic: string): Promise<string> => {
    try {
        const prompt = `Explica el siguiente concepto de Educación Ciudadana de Chile de forma clara, concisa y fácil de entender para un estudiante de secundaria. Utiliza párrafos cortos y listas si es necesario. El concepto es: "${topic}".`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating content with Gemini:", error);
        return "Hubo un error al generar el contenido. Por favor, intenta de nuevo más tarde.";
    }
};

export const generateReviewContent = async (topics: string[]): Promise<string> => {
    const topicList = topics.join(', ');
    try {
        const prompt = `Crea un resumen de repaso conciso para un examen de Educación Ciudadana en Chile. Cubre los siguientes temas clave: ${topicList}. 
Para cada tema, proporciona una explicación clara y enumera los puntos más importantes en viñetas. 
El objetivo es consolidar el conocimiento para la prueba final. Estructura la respuesta con un título principal y subtítulos para cada tema.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating review content with Gemini:", error);
        return "Hubo un error al generar el contenido del repaso. Por favor, intenta de nuevo más tarde.";
    }
};

export const generateReviewQuiz = async (topics: string[]): Promise<any> => {
    const topicList = topics.join(', ');
    try {
        const prompt = `Genera un test de 10 preguntas de selección múltiple sobre los siguientes temas de Educación Ciudadana de Chile: ${topicList}. 
Cada pregunta debe tener exactamente 3 alternativas: una respuesta correcta y dos incorrectas.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    options: {
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING }
                                    },
                                    correctAnswer: { type: Type.STRING }
                                },
                                required: ["question", "options", "correctAnswer"]
                            }
                        }
                    },
                    required: ["questions"]
                },
            },
        });

        // The response text is a JSON string, so we parse it.
        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.questions;

    } catch (error) {
        console.error("Error generating review quiz with Gemini:", error);
        return null;
    }
};