if (location.pathname.includes("mtb")) {
  startCountdownAndRedirect()

  function startCountdownAndRedirect() {
    var countdownElement = document.getElementById('banner__countdown');
    var count = 3;

    // Function to update countdown text
    function updateCountdown() {
        countdownElement.textContent = count;
        count--;

        if (count <= 0) {
            // Redirect when countdown completes
            window.location.href = "https://www.youtube.com/playlist?list=PLBW-m5aC1WXYLfdPiV_auW6SUZ1D7hBUg";
        } else {
            // Continue countdown after 1 second
            setTimeout(updateCountdown, 3000); // 3000 milliseconds = 1 second
        }
    }

    // Initial call to start countdown
    updateCountdown();
  }
}
