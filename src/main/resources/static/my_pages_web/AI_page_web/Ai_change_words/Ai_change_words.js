const GEMINI_API_KEY = "AIzaSyDQaoCoBLu6yl57pR-GkikmLCUjck1HBnc"; // استبدل بمفتاح API الصحيح
const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// ✅ وظيفة تصحيح الإملاء
async function generateText() {
    const inputElement = document.getElementById("inputText");
    const outputElement = document.getElementById("outputText");
    let userInput = inputElement.value.trim();

    if (!userInput) {
        alert("يرجى إدخال نص لتصحيحه.");
        return;
    }

    outputElement.textContent = "جاري تصحيح النص...";

    try {
        const response = await fetch(MODEL_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        "text": `اعد صياغة الجملة بحيث تكون اقصر ولها نفس المعنى وبسيطة (اجب فقط بالجواب):\n"${userInput}"`
                    }]
                }]
            })
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const result = await response.json();
        console.log(result);

        // استخراج النص المصحح
        const correctedText = result.candidates[0]?.content?.parts[0]?.text || "لم يتم الحصول على استجابة.";

        outputElement.textContent = correctedText;
    } catch (error) {
        outputElement.textContent = "حدث خطأ أثناء التصحيح. حاول لاحقًا.";
        console.error("Model request failed:", error);
    }

    inputElement.value = "";
}
