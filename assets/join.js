// 회원가입 버튼 클릭 시 회원가입 처리
document
  .getElementById("signupSubmit")
  .addEventListener("click", async function () {
    const login_id = document.getElementById("login_id").value;
    const password = document.getElementById("UserPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const nickname = document.getElementById("UserNickname").value;
    const email = document.getElementById("UserEmail").value;
    const introduction = document.getElementById("introduction").value;
    const age = document.getElementById("UserAge").value;
    
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_id,
          nickname,
          age,
          password,
          confirmPassword,
          email,
          introduction,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // 회원가입 성공
        alert(data.message); // 알림 창 띄우기
        window.location.href = "/"; // 회원가입 완료시 메인페이지 이동

        location.reload(); // 페이지 새로고침
        // 회원가입 후 필요한 동작 수행
      } else {
        // 회원가입 실패
        alert(data.message);
        // 실패 처리 로직 수행
      }
    } catch (error) {
      console.error("Error:", error);

      // 에러 처리 로직 수행
    }
  });
