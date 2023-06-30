// 회원가입 버튼 클릭 시 회원가입 처리
document
  .getElementById("loginSubmit")
  .addEventListener("click", async function () {
    const login_id = document.getElementById("login_id").value;
    const password = document.getElementById("password").value;
    
    try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            password,
          }),
        });
    
          const data = await response.json();
          if (response.ok) {
            // 로그인 성공
            alert(data.message); // 알림 창 띄우기
            window.location.href = "myInfo.html"; // 새로운 페이지로 이동
            // 로그인 후 필요한 동작 수행
          } else {
            // 로그인 실패
            alert(data.message);
            // 실패 처리 로직 수행
          }
        } catch (error) {
          console.error("Error:", error);
          // 에러 처리 로직 수행
        }
      });