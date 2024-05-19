
    async function generateText() {
        const the_q = "Correct this sentence for me in spelling, correct the meaning, and put the answer on a new line : ";
        const data_to_parse = the_q + document.getElementById("inputText").value + " ' ";
        const inputData = {
            "inputs": data_to_parse
        };
        alert(data_to_parse)
        try {
            const result = await queryModel(inputData);
            console.log("Model output:", result);
            document.getElementById("outputText").innerText = result[0].translation_text.replace(the_q, "").replace(" ' ", "");
        } catch (error) {
            console.error("Model request failed:", error);
        }
    }

    async function queryModel(data) {
        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-fr-en",
                {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer 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",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    }
