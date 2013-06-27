// Install app
$(document).ready(function(){
$('#install').button();
$('#install').closest('.ui-btn').hide();
if (navigator.mozApps) {
    var checkIfInstalled = navigator.mozApps.getSelf();
    checkIfInstalled.onsuccess = function () {
        if (!checkIfInstalled.result) {
                var install = document.querySelector("#install"),
                manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
		$('#install').closest('.ui-btn').show();
            	//install.className = "show-install";
            install.onclick = function () {
                var installApp = navigator.mozApps.install(manifestURL);
                installApp.onsuccess = function(data) {
                    $('#install').closest('.ui-btn').hide();
                };
                installApp.onerror = function() {
                    alert("Install failed\n\n:" + installApp.error.name);
                };
            };
        }
    };
}
else {
    $('#install').closest('.ui-btn').hide();
    console.log("Open Web Apps not supported");
    console.log($('#install'));
}
});
