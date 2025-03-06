const GEMINI_API_KEY = "AIzaSyDQaoCoBLu6yl57pR-GkikmLCUjck1HBnc"; // استبدل بمفتاح API الصحيح
const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

async function generateJoke() {
    const outputElement = document.getElementById("outputText");

    outputElement.textContent = "جاري معالجة الرد...";

    // مواضيع عشوائية لزيادة التنوع في النكت
    const topics = ["الحيوانات", "المدرسة", "الأصدقاء", "الرياضيات", "الطعام", "الحياة اليومية"];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    try {
        const response = await fetch(MODEL_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ "text": `اعطني نكتة جديدة عن ${randomTopic} (فقط النكتة بدون أي كلام آخر)` }]
                }],
                generationConfig: {
                    temperature: 0.9, // زيادة العشوائية في الردود
                    top_p: 0.8
                }
            })
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const result = await response.json();
        console.log(result);

        // استخراج رد النموذج
        const botResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "لم يتم الحصول على استجابة.";

        outputElement.textContent = botResponse;
    } catch (error) {
        outputElement.textContent = "حدث خطأ أثناء المعالجة. حاول لاحقًا.";
        console.error("Model request failed:", error);
    }
}
