$(document).ready(function() {
$("#sign_in_form").submit(function (event) {
        event.preventDefault();
        let user = {
            name: $("#name").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            phoneNumber: $("#phoneNumber").val(),
            admen: false,
        };

        $.ajax({
            type: "POST",
            url: "/users/addUser",
            contentType: "application/json",
            data: JSON.stringify(user),
            success: function (response) {

                var userId = response.id;
                var admen = response.admen;
                console.log(response);
                localStorage.setItem('userId', userId);
                localStorage.setItem('admen', admen);
                alert("تم حفظ المستخدم بنجاح!");
                window.location.href = "../../index.html";
            },
            error: function (error) {
                console.log("خطأ في حفظ المستخدم: ", error);
            }
        });
    });
});