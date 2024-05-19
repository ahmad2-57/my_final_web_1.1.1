$(document).ready(function () {
    // Fetch data using AJAX

$.ajax({
    type: "GET",
    url: "/users/getAll",
    success: function(users) {
        // Iterate through the users and display them in the table
        users.forEach(function(user) {
            // إنشاء صف جديد
            var $row = $("<tr>").append(
                $("<td>").text(user.id),
                $("<td>").text(user.name),
                $("<td>").text(user.email),
                $("<td>").text(user.password),
                $("<td>").text(user.phoneNumber),
                $("<td>").append(
                $("<button>").text("Profile").click(function() { findUserById(user.id); }),
                $("<button>").text("Delete").click(function() { deleteUserById(user.id); })
                )
            );

            // إضافة الصف إلى الجدول
            $("#usersList").append($row);
        });
    },
    error: function(error) {
        console.error("Error fetching user data: ", error);
    }
});

    $.get("/users/currentUser", function (user) {
        $("#email").text(user.email);
        $("#phone").text(user.phoneNumber);
    });

    $("#long_in_form").submit(function (event) {
        event.preventDefault();
        let userData = {
            email: $("#email").val(),
            password: $("#password").val()
        };

        $.ajax({
            type: "POST",
            url: "/login",
            contentType: "application/json",
            data: JSON.stringify(userData),
            success: function (response) {
                alert(response);
                window.location.href = "index.html";
            },
            error: function (error) {
                alert(error.responseText);
            }
        });
    });
});
