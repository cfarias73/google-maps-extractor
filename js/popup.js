function normalizeProfileId(a) {
    return a.trim().toLowerCase()
}

document.getElementById("addprofilebtn").addEventListener("click", function() {
    var a = normalizeProfileId(document.getElementById("profileid").value);
    window.open("https://www.google.com/maps/search/" + encodeURIComponent(a))
});

$(document).ready(function() {
    // Hide buttons that are no longer needed
    document.getElementById("loginbtn").style.display = "none";
    document.getElementById("upgradebtn").style.display = "none";
    document.getElementById("managesubscription").style.display = "none";

    chrome.storage.sync.get(null, function(a) {
        if (a.uid) {
            // Even if logged in, keep login button hidden and show PRO status
            rolecheck().then(function(b) {
                document.getElementById("accountinfo").innerHTML = `Current Plan: PRO (Unlocked), Quota: Unlimited`;
            }).catch(() => {
                document.getElementById("accountinfo").innerHTML = "Plan: Unlimited Access (Local)";
            });
        } else {
            document.getElementById("accountinfo").innerHTML = "Plan: Unlimited Access (Local)";
        }
    });

    document.getElementById("customerportal").addEventListener("click", customerportal)
});

// Remove or disable listeners for unused features
document.getElementById("upgradebtn").addEventListener("click", function() {
    // upgradeToPro() // Disabled
});
