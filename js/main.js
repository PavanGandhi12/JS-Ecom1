
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
  
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
  
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
  
        if (username === 'Darshan' && password === '1234') {
          
          window.location.href = 'Homepage.html'; 
        } else if(username === 'Darshan' && password === '1234'){
            window.location.href = 'Homepage.html'; 
        }else{
            alert('Invalid username or password. Please try again.');
        }
  
        usernameInput.value = '';
        passwordInput.value = '';
      });
    }
  });
  