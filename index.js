
$(document).ready(function() {
	
	/* Perform some caching */
	loggedIn = false;
	meSpeak.loadConfig("mespeak/mespeak_config.json");
	meSpeak.loadVoice('mespeak/voices/en/en-us.json');
	myVideo = document.getElementById("video");
	$("#video").hide();
	$("#slideshow").hide();
	$("#share-wrapper").hide();
	myVideo.muted = true;
	showId = 0;
	
	/* A lot of caching to be done... */
	filter = 2400  
    start = 17790 - filter - 512
    start2 = 38200 - filter - 100
    start3 = 51500 - filter - 100
    start4 = 68000 - filter
    interval = 450
	
	/* Automatically resize text */
	performTextResize();
	
	/* Hover in and our for the Pikachu button */
	$("#playButton").mouseenter(function(event) {
		if (!loggedIn) {
			$("#popover").popover('show');
	}});
		
	$("#playButton").mouseleave(function(event) {
		$("#popover").popover('hide');
	});
	
	/* Begin the entire show upon clicking Pikachu */
	$("#playButton").click(function(event) {
		if (loggedIn) {
			$("#video").show();
			$("#video").animate({
				'left': '25%'
			}, 1500);
			$("#header").animate({
							'left': '-100%'
						}, 1500, function() {
							$("#slideshow").show();
							$("#share-wrapper").show();
							myVideo.play();
							playVoiceAudio();
							playBackgroundAudio();
						});
		}
	});
	
	

});

/* Dynamically resize text when scaling browser */ 
function performTextResize() {
	var $body = $('body'); //Cache this for performance
	var setBodyScale = function() {
		var scaleSource = $body.width(),
			scaleFactor = 0.2,                     
			maxScale = 600,
			minScale = 30; //Tweak these values to taste
		var fontSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:
 		if (fontSize > maxScale) fontSize = maxScale;
		if (fontSize < minScale) fontSize = minScale; //Enforce the minimum and maximums
		$('#secondary').css('font-size', fontSize + '%');
	}
	$(window).resize(function(){
		setBodyScale();
	});
	//Fire it when the page first loads:
	setBodyScale();
}

function playBackgroundAudio() {
	var myAudio = document.getElementById("myAudio");
	myAudio.play();
}

function playVoiceAudio() {
		/* Perform some caching here */
		wordList1 = wordList.slice(0, 16);
		wordList2 = wordList.slice(16, 32);
		wordList3 = wordList.slice(32, 48);
		wordList4 = wordList.slice(48, 64);
	
		/* Let the computer practice speaking */
		// for (var i = 0; i < wordList.length; i++) {
		// 	meSpeak.speak(wordList[i], {volume:0});
		// }
		
        setTimeout(function() {
				myVideo.style.opacity = 0;
				$("#0").show();
                meSpeak.speak(wordList1[0]);
                
                wordList1.splice(0, 1);
                callOuts(wordList1, 512);
        }, start);
 
        setTimeout(function() {
				myVideo.style.opacity = 0;
				showNextPicture();
                meSpeak.speak(wordList2[0]);
                wordList2.splice(0, 1);
                callOuts(wordList2, 512);
        }, start2);
 
        setTimeout(function() {
				myVideo.style.opacity = 0;
				showNextPicture();
                meSpeak.speak(wordList3[0]);
                wordList3.splice(0, 1);
                callOuts(wordList3, 512);
        }, start3);
 
        setTimeout(function() {
				myVideo.style.opacity = 0;
				showNextPicture();
                meSpeak.speak(wordList4[0]);
                wordList4.splice(0, 1);
                callOuts2(wordList4, 512);
        }, start4);

      	setTimeout(function() {
      		myVideo.style.opacity = 0;
      	}, 83800)
}

function callOuts(stringList, interval) {
	for (var i = 0; i < stringList.length; i++) {
		setTimeout(function () {
			showNextPicture();
			if (stringList.length == 1) {
				setTimeout(function () {
					myVideo.style.opacity = 1;
					hideCurrentPicture();
				}, interval)
			}
			meSpeak.speak(stringList[0]);
			stringList.splice(0, 1);
		}, interval*(i+1));
	}
}

function callOuts2(stringList, interval) {
	for (var i = 0; i < stringList.length; i++) {
		setTimeout(function () {
			showNextPicture();
			if (stringList.length == 1) {
				setTimeout(function () {
					myVideo.style.opacity = 1;
					meSpeak.speak("pikachu");
					hideCurrentPicture();
				}, interval)
			}
			meSpeak.speak(stringList[0]);
			stringList.splice(0, 1);
		}, interval*(i+1));
	}
}

function showNextPicture() {
	$("#" + showId).hide();
	showId += 1;
	$("#" + showId).show();
}

function hideCurrentPicture() {
	$("#" + showId).hide();
}