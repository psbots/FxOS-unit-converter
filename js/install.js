// Install app
$('#install').closest('.ui-btn').hide();
if (navigator.mozApps) {
    var checkIfInstalled = navigator.mozApps.getSelf();
    checkIfInstalled.onsuccess = function () {
        if (checkIfInstalled.result) {
            // Already installed
            //var installationInstructions = document.querySelector("#installation-instructions");
	    var install = document.querySelector("#install");
            //if (installationInstructions) {
            //    installationInstructions.style.display = "none";
            //}
	    if (install) {
		$('#install').closest('.ui-btn').hide();
		//install.style.display = "none";
	    }
        }
        else {
            var install = document.querySelector("#install"),
                manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
		$('#install').closest('.ui-btn').show();
            	//install.className = "show-install";
            install.onclick = function () {
                var installApp = navigator.mozApps.install(manifestURL);
                installApp.onsuccess = function(data) {
                    install.style.display = "none";
                };
                installApp.onerror = function() {
                    alert("Install failed\n\n:" + installApp.error.name);
                };
            };
        }
    };
}
else {
    console.log("Open Web Apps not supported");
}
