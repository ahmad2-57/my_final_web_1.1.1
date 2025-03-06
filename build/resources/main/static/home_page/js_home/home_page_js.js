
    document.addEventListener('DOMContentLoaded', function() {
        const userId = localStorage.getItem('userId');
        if (userId) {
            $.ajax({
                type: "GET",
                url: "/user/findUserId/" + userId,
                success: function(user) {

                    document.getElementById('loginLink').innerHTML =user.email;
                    document.getElementById('loginLink').href = '#';
                },
                error: function(error) {
                    console.log("خطأ في جلب معلومات المستخدم: ", error);
                    alert("لم يتم العثور على المستخدم.");
                }
            });
        } else {
            document.getElementById('loginLink').style.display = 'inline';
            document.getElementById('userAccount').style.display = 'none';
        }

        const profileButton = document.querySelector('.profile-button');
        profileButton.addEventListener('click', checkAdminAndRedirect);
    });

    function checkLoginAndRedirect() {
        const userId = localStorage.getItem('userId');
        if (userId) {
            window.location.href = 'my_pages_web/AI_page_web/chosing_AI.html';
        } else {
            window.location.href = 'my_pages_web/long_in_page_web/long_in.html';
        }
    }

    function checkAdminAndRedirect() {
        const admen = localStorage.getItem('admen');
        console.log("af"+admen);

        if (admen === 'true') {
            window.location.href = 'my_pages_web/user_data_page_web/adman_v_data/admin_page.html';
        } else {
            window.location.href = 'my_pages_web/user_data_page_web/user_data/user_data.html';
        }
    }
