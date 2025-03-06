$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/users/getAll",
        success: function (users) {

            users.forEach(function (user) {

                var $row = $("<tr>").append(
                    $("<td>").text(user.id),
                    $("<td>").text(user.name),
                    $("<td>").text(user.email),
                    $("<td>").text(user.password),
                    $("<td>").text(user.phoneNumber),
                    $("<td>").append(
                        $("<button>").text("Delete").click(function () { deleteUserById(user.id); })
                    )
                );

                $("#usersList").append($row);
            });
        },
        error: function (error) {
            console.error("Error fetching user data: ", error);
        }
    });
});

function deleteUserById(userId) {
    $.ajax({
        type: "DELETE",
        url: "/user/delete/" + userId,
        success: function (response) {

            console.log("User deleted successfully");
            alert("تم حذف المستخدم بنجاح!");

            location.reload();
        },
        error: function (error) {
            console.error("Error deleting user: ", error);
        }
    });
}
