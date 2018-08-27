$(document).ready(function(){	
	// establish kit
	var myKit;
	var siteUrl = 'https://yourkit.pw/#';

	if(window.location.hash) {
		// view existing record, set kit from that
		$('#header h1').html('Viewing shared details');
		$('#header p').html('Someone provided the following browser details to you for support purposes. <a href="/">Get yours</a>.');
		$('#share').hide();
		$('#qna').css({
			paddingTop: '85px'
		});

		var res = window.atob(window.location.hash.substr(1))
		var tempKit = res.split('|');
		myKit = {
			a: tempKit[0],
			b: tempKit[1],
			c: tempKit[2],
			d: tempKit[3],
			e: tempKit[4],
			f: tempKit[5],
			g: tempKit[6],
			h: tempKit[7],
		}
		setKitValues();
	} else {
		// create a new record for kit
		myKit = {
			a: platform.os.family + ' ' + platform.os.version + ' (' + platform.os.architecture + ')',
			b: platform.name + ' ' + platform.version,
			c: screen.width + 'x' + screen.height,
			d: window.innerWidth + 'x' + window.innerHeight,
			e: 1,
			f: window.devicePixelRatio,
		}
		// cookies on kit
		if(navigator.cookieEnabled){
			myKit.g = 1;
		} else {		
			myKit.g = 0;
		}

		// adblock on kit
		function adBlockNotDetected() {
			myKit.h = 0;
			setKitValues();
		}
		function adBlockDetected() {
			myKit.h = 1;
			setKitValues();
		}
		if(typeof fuckAdBlock !== 'undefined' || typeof FuckAdBlock !== 'undefined') {
			adBlockDetected();
		} else {
			var importFAB = document.createElement('script');
			importFAB.onload = function() {
				fuckAdBlock.onDetected(adBlockDetected)
				fuckAdBlock.onNotDetected(adBlockNotDetected);
			};
			importFAB.onerror = function() {
				adBlockDetected(); 
			};
			importFAB.integrity = 'sha256-xjwKUY/NgkPjZZBOtOxRYtK20GaqTwUCf7WYCJ1z69w=';
			importFAB.crossOrigin = 'anonymous';
			importFAB.src = 'https://cdnjs.cloudflare.com/ajax/libs/fuckadblock/3.2.1/fuckadblock.min.js';
			document.head.appendChild(importFAB);
		}
		setKitValues();
	}

	
	
	// set kit values
	function setKitValues(){
		$('#entry-os .entry-status').html(myKit.a);
		$('#entry-os').addClass('active');
		$('#entry-browser .entry-status').html(myKit.b);
		$('#entry-browser').addClass('active');
		$('#entry-screen .entry-status').html(myKit.c);
		$('#entry-screen').addClass('active');
		$('#entry-viewport .entry-status').html(myKit.d);
		$('#entry-viewport').addClass('active');
		if(myKit.e == 0){
			$('#entry-js .entry-status').html('disabled');
		} else {
			$('#entry-js .entry-status').html('enabled');
			$('#entry-js').addClass('active');
		}
		$('#entry-pixel-ratio .entry-status').html(myKit.f);
		if(myKit.f > .9){
			$('#entry-pixel-ratio').addClass('active');	
		}	
		if(myKit.g == 0){
			$('#entry-cookies .entry-status').html('disabled');
		} else {
			$('#entry-cookies .entry-status').html('enabled');
			$('#entry-cookies').addClass('active');
		}
		if(myKit.h == 0){
			$('#entry-adblocker .entry-status').html('disabled');
			$('#entry-adblocker').addClass('active');
		} else {
			$('#entry-adblocker .entry-status').html('enabled');
		}
		var encString = myKit.a + "|" + myKit.b + "|" + myKit.c + "|" + myKit.d + "|" + myKit.e + "|" + myKit.f + "|" + myKit.g + "|" + myKit.h;
		var t = window.btoa(encString);
		$("#get-link").attr('href', siteUrl + t);
	}
		

	$('#get-link').click(function(){
		var encString = myKit.a + "|" + myKit.b + "|" + myKit.c + "|" + myKit.d + "|" + myKit.e + "|" + myKit.f + "|" + myKit.g + "|" + myKit.h;
		var t = window.btoa(encString);
		var temp = $('<input>');
		$('body').append(temp);
		temp.val(siteUrl + t).select();
		document.execCommand('copy');
		temp.remove();
		$(this).text('Link Copied!');
		return false;
	});
	
});
