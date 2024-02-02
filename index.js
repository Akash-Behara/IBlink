function showMethodolgyDiv() {
    const animateDiv = document.getElementById("method__div");
    animateDiv.classList.add("animate__fadeInDown");
    animateDiv.style.display = "none";
    animateDiv.style.opacity = "1";

    animateDiv.offsetHeight;

    animateDiv.style.display = "flex";
}

function hideMethodolgyDiv() {
    const animateDiv = document.getElementById("method__div");
    // animateDiv.style.opacity = "0";
    animateDiv.classList.add("animate__backOutUp");
    animateDiv.style.display = "flex";
    animateDiv.offsetHeight;
    animateDiv.style.display = "none";
}