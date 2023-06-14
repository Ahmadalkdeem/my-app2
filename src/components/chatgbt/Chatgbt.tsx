import React, { useState } from 'react';
import axios from 'axios';

function ChatGPTExample() {
    const apiKey = "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";
    const url = "https://api.openai.com/v1/engines/davinci-codex/completions";
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const sendMessage = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/engines/davinci-codex/completions',
                {
                    prompt: 'hello caath gbt',
                    max_tokens: 50,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': apiKey,
                    },
                }
            );

            const data = response.data;
            console.log(data);


        } catch (error) {
            console.error('حدث خطأ:', error);
        }
    };


    return (
        <div>
            <button onClick={sendMessage}>إرسال الطلب</button>
            {/* <p>{response}</p> */}
        </div>
    );
}

export default ChatGPTExample;
