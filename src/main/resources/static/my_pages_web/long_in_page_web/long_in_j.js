$(document).ready(function() {
    $("#long_in_form").submit(function(event) {
        event.preventDefault();
        let userData = {
            email: $("#email").val(),
            password: $("#password").val()
        };

        $.ajax({
            type: "POST",
            url: "/login",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(userData),
            success: function(data) {
                // بعد تسجيل الدخول بنجاح، قم بإجراء طلب للحصول على معرف المستخدم
                $.ajax({
                    type: "GET",
                    url: "/user/findUserIdByEmail",
                    data: { email: userData.email },
                    success: function(userId) {
                        if (userId !== -1) {
                            localStorage.setItem('userId', userId);
                            var admen = data.admen;
                            localStorage.setItem('admen', admen);
                            alert("تم تسجيل الدخول بنجاح");
                            window.location.href = "../AI_page_web/chosing_AI.html";
                        } else {
                            alert("تعذر الحصول على معرف المستخدم.");
                        }
                    },
                    error: function(error) {
                        alert("فشل في الحصول على معرف المستخدم: " + error.responseText);
                    }
                });
            },
            error: function(error) {
                alert(error.responseText);
            }
        });
    });
});
