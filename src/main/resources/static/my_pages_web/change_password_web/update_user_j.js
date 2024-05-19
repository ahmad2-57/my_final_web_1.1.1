 $(document).ready(function() {
 $("#change_password_form").submit(function (event) {
        event.preventDefault();
        let password = $("#password").val();
        let email = $("#email").val();
        let phoneNumber = $("#phoneNumber").val();
        console.log("كلمة المرور: " + password);

        let userUpdateRequest = {
            email: email,
            phoneNumber: phoneNumber,
            password: password
        };

        $.get("/user/findUserIdByEmail", { email: email }, function (userId) {
            if (userId !== -1) {
                $.ajax({
                    type: "PUT",
                    url: "/users/changePassword/" + userId,
                    contentType: "application/json",
                    data: JSON.stringify(userUpdateRequest),
                    success: function (response) {
                        alert("تم تغيير كلمة المرور بنجاح!");
                        window.location.href = "../../index.html";
                    },
                    error: function (error) {
                        alert("حدث خطأ أثناء تغيير كلمة المرور: " + error.responseText);
                    }
                });
            } else {
                alert("لا يوجد مستخدم مسجل بالبريد الإلكتروني المدخل.");
            }
        });
    });
});