
$(document).ready(function() {
	
	myVideo=document.getElementById("video");
	myVideo.style.opacity = 0;
	myVideo.muted = true;
	// wordList = ['miko', 'renzo', 'alex', 'rishi', 'rachel', 'baek', 'raphael', 'peter',
	// 	            'david', 'heidi', 'shaq', 'emily', 'charles', 'amanda', 'moko', 'phil',
	// 	            'jason', 'bill', 'mark', 'thomas', 'steve', 'burt', 'richard', 'sid',
	// 	            'neil', 'christian', 'jesus', 'mary', 'joseph', 'javier', 'george', 'carol',
	// 	            'chris', 'yoyo', 'donna', 'sarabeth', 'alvin', 'matthew', 'hanson', 'ben',
	// 	            'ron', 'nat', 'olga', 'adil', 'andres', 'katie', 'lenny', 'joe',
	// 	            'luke', 'lucas', 'stefan', 'andrew', 'zach', 'manny', 'tiffany', 'willa',
	// 	            'walter', 'jordan', 'jess', 'aaron', 'curtis', 'connie', 'ivan', 'francis'];
	
	showId = 0;
	
	meSpeak.loadConfig("mespeak/mespeak_config.json");
	meSpeak.loadVoice('mespeak/voices/en/en-us.json');
	
	for (var i = 0; i < wordList.length; i++) {
		meSpeak.speak(wordList[i], {volume:0});
	}
	
	$("#play").click(function() {
		//playSlideShow();
		// console.log("playing");
		$("#play").hide();
		$("body").animate({
			'background-position-y': '30%'
		}, "slow");
		myVideo.style.opacity = 1;
		myVideo.play();
		playVoiceAudio();
		playBackgroundAudio();
		//$("#play").fadeOut(1000);
	});

	console.log("hey!");
	console.log($("#first-names").html());
	console.log("asdf");
});

function playBackgroundAudio() {
	var myAudio = document.getElementById("myAudio");
	//myAudio.volume = 0.5;
	console.log(myAudio);
	myAudio.play();
}

function playVoiceAudio() {
	
        filter = 2400  
        start = 17790 - filter - 512
        start2 = 38200 - filter
        start3 = 51500 - filter
        start4 = 68000 - filter
        interval = 450
       
        wordList1 = wordList.slice(0, 16);

        setTimeout(function() {
				myVideo.style.opacity = 0;
				$("#0").show();
                meSpeak.speak(wordList1[0]);
                
                wordList1.splice(0, 1);
                callOuts(wordList1, 512);
        }, start);
 
        wordList2 = wordList.slice(16, 32);
 
        setTimeout(function() {
				myVideo.style.opacity = 0;
				showNextPicture();
                meSpeak.speak(wordList2[0]);
                wordList2.splice(0, 1);
                callOuts(wordList2, 512);
        }, start2);
 
        wordList3 = wordList.slice(32, 48);
 
        setTimeout(function() {
				myVideo.style.opacity = 0;
				showNextPicture();
                meSpeak.speak(wordList3[0]);
                wordList3.splice(0, 1);
                callOuts(wordList3, 512);
        }, start3);
 
        wordList4 = wordList.slice(48, 64);
 
        setTimeout(function() {
				myVideo.style.opacity = 0;
				showNextPicture();
                meSpeak.speak(wordList4[0]);
                wordList4.splice(0, 1);
                callOuts(wordList4, 512);
        }, start4);
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

function showNextPicture() {
	$("#" + showId).hide();
	showId += 1;
	$("#" + showId).show();
}

function hideCurrentPicture() {
	$("#" + showId).hide();
}
