
// async function logout() {
//     localStorage.removeItem("token");
//     const response = await fetch("http://localhost:8000/logout", {
//         method: "POST",
//         headers: {
//             "Authorization": `Bearer ${localStorage.getItem("token")}`
//         }
//     });

//     alert("Logged out!");
// }



function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
    // location.reload();
}