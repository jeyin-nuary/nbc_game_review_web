window.addEventListener("DOMContentLoaded", async function(){
    fetch("/api/profiles/:login_id")
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        let rows = data["profile_results"];
        const profileList = document.getElementById("profileList");
        rows.forEach(user => {
            const login_id = user["login_id"];
            const password = user["password"];
            const nickname = user["nickname"];
            const age = user["age"];
            const email = user["email"];
            const introduction = user["introduction"];
            console.log(user);
            const temp_html = `<div class="profile_id  profile_style">
            <label for="loginId_value" class="loginId">아이디</label>
            <div class="loginId_input"><input type="text" name="loginId_value" id="loginId_value" value="${login_id}"
            disabled="">
            </div>
        </div>
        <div class="profile_nickname profile_style">
            <label for="nickname_value" class="nickname">닉네임</label>
            <div class="nickname_input"><input type="text" name="nickname_value" id="nickname_value"
                    value="${nickname}" disabled="" >
            </div>
        </div>
        <div class="profile_email profile_style">
            <label for="email_value" class="email">email</label>
            <div class="email_input"><input type="text" name="email_value" id="eamil_value" value="${email}"
            disabled="">
            </div>
        </div>
        <div class="profile_age profile_style">
            <label for="age_value" class="age">나이</label>
            <div class="age_input"><input type="text" name="age_value" id="age_value" value="${age}" disabled="" >
            </div>
        </div>
        <div class="profile_introduction profile_style">
            <label for="introduction_value" class="introduction">소개</label>
            <div class="introduction_input"><input type="text" name="introduction_value"
                    id="introduction_value" value="${introduction}" disabled="">
            </div>
        </div>
        <p></p>
        <div class="btn">
                <a type="button" href="put_profile.html" onclick="openPopup(this.href, 1000, 700); return false;"
                    class="btn btn-dark">
                    프로필 수정
                </a>
            </div>
    </div>`;

            profileList.innerHTML = temp_html;
        });
    })
})