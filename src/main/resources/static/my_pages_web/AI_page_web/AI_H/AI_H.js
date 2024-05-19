async function generateText() {
    const userId = localStorage.getItem('userId');
    const the_q = "Correct this sentence for me with its spelling and meaning: ' ";
    const userMessage = $("#inputText").val();
    const data_to_parse = the_q + userMessage + " ' ";
    const inputData = { "inputs": data_to_parse };

    // إرسال رسالة المستخدم إلى الخادم
    saveCorrespondence(userId, "user", userMessage);

    try {
        const result = await queryModel(inputData);
        const aiMessage = result[0].translation_text.replace(the_q, "").replace("'", "");

        // عرض رد الذكاء الاصطناعي
        $("#outputText").text(aiMessage);

        // إرسال رد الذكاء الاصطناعي إلى الخادم
        saveCorrespondence(userId, "ai", aiMessage);
    } catch (error) {
        console.error("Model request failed:", error);
    }
}

async function queryModel(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/daaar/instract_v1",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    return await response.json();
}

function saveCorrespondence(userId, sender, message) {
    $.ajax({
        type: "POST",
        url: "/correspondence/save",
        contentType: "application/json",
        data: JSON.stringify({ userId: userId, sender: sender, message: message }),
        success: function() {
            console.log("Correspondence saved successfully.");
        },
        error: function(error) {
            console.error("Error saving correspondence:", error);
        }
    });
}
