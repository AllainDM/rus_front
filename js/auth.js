// async function login(username, password) {
//     const response = await fetch('http://localhost:8000/token', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: new URLSearchParams({
//             'username': username,
//             'password': password,
//         }),
//     });
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     // Сохраняем токен в localStorage
//     localStorage.setItem('token', data.access_token);
// }