import React, { useState } from 'react';
import axios from 'axios';

function ChatGPTExample() {
    const [response, setResponse] = useState('');

    const sendRequest = async () => {
        const url = "https://api.openai.com/v1/engines/davinci-codex/completions";
        const apiKey = "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";
        const headers = {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        };

        const data = {
            "prompt": "مرحبًا، أنا بحاجة إلى مساعدة في...",
            "max_tokens": 100
        };

        try {
            const result = await axios.post(url, data, { headers });
            console.log(result.data);

            if (result.data.choices && result.data.choices.length > 0) {
                setResponse(result.data.choices[0].text);
            } else {
                setResponse("حدث خطأ في الاستجابة");
            }
        } catch (error) {
            console.error(error);
            setResponse("حدث خطأ في الاتصال بالخادم");
        }
    };

    return (
        <div>
            <button onClick={sendRequest}>إرسال الطلب</button>
            <p>{response}</p>
        </div>
    );
}

export default ChatGPTExample;
