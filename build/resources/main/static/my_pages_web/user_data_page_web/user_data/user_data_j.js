$(document).ready(function () {
        const urlParams = new URLSearchParams(window.location.search);
        let userId = urlParams.get('id'+1);

        if (!userId) {
            userId = localStorage.getItem('userId');
            if (!userId) {
                console.log("لم يتم العثور على المستخدم.");
                return;
            }
        }

        //console.log("User ID: ", userId);

        $.ajax({
            type: "GET",
            url: "/user/findUserId/" + userId,
            success: function (user) {
                $("#email").text(user.email);
                $("#phoneNumber").text(user.phoneNumber);
                $("#name").text(user.name);
                $("#password").text(user.password);
            },
            error: function (error) {
                console.log("خطأ في جلب معلومات المستخدم: ", error);
                alert("لم يتم العثور على المستخدم.");
            }
        });
        $("#delete-user-btn").click(function () {
            if (confirm("هل أنت متأكد أنك تريد حذف هذا المستخدم؟")) {
                $.ajax({
                    type: "DELETE",
                    url: "/user/delete/" + userId,
                    success: function (response) {
                        console.log("تم حذف المستخدم بنجاح.");
                        window.location.href = "../../../index.html";
                    },
                    error: function (error) {
                        console.log("حدث خطأ أثناء محاولة حذف المستخدم: ", error);
                    }
                });
            }
        });
    });