import axios from "axios"

export const askQuestion = async (question,oldConversation) => {
    return await axios.post(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.EXPO_PUBLIC_GEMINI_API_KEY}`,
        {"contents":[
             ...oldConversation,
            {"role": "user","parts":[{"text": question}]}]
        }
     ,   
    { headers : {
        'Content-Type' : 'application/json',
       
    }
    
    } 
)
}