document.getElementById("updateProfile","onnicknamePut").addEventListener("click", async function () {
    // 프로필 수정 버튼 클릭 시

document
  .getElementById("updateProfile")
  .addEventListener("click", async function () {
    const nickname = document.getElementById("nickname_value").value;
    const password = document.getElementById("password_value").value;
    const newPassword = document.getElementById("newPassword_value").value;
    const confirmPassword = document.getElementById("confirmPassword_value").value;
    const email = document.getElementById("eamil_value").value;
    const age = document.getElementById("age_value").value;
    const introduction = document.getElementById("introduction_value").value;
    
    const newdata = JSON.stringify({
        nickname,
        password,
        newPassword,
        confirmPassword,
        age,
        email,
        introduction,
      });

      console.log(newdata);

      fetch("/api/profiles/:login_id", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: newdata,
    })
    .then(response => {
        if (response.ok) {
            // 프로필 수정 성공
            // 팝업 창으로 로그인 완료 메시지 전송
            window.opener.postMessage("loggedIn", "*");
            window.close();
        } else {
            // 프로필 수정 실패
            alert("프로필 수정에 실패했습니다.");
        }
    })


    .catch(error => {
        console.error("프로필 수정 중 오류가 발생했습니다.", error);
        alert("프로필 수정 중 오류가 발생했습니다.");
    });
});
})