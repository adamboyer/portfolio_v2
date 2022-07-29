//Hero button hover
const heroBtn = document.getElementById("heroBtn");
const heroArrow = document.getElementById("heroArrow");
heroBtn.addEventListener("mouseenter", () => {
	heroArrow.classList.add("hover");
});

heroBtn.addEventListener("mouseleave", () => {
	heroArrow.classList.remove("hover");
});

let playDone = true;

//Update video function
const updateVideo = async (video, source, choice) => {
	if (!playDone) return;
	console.log(choice);
	source.setAttribute("src", choice);
	video.load();
	playDone = false;
	await video.play().then(()=> {
		playDone = true;
		console.log("here cap");
		setTimeout(console.log("done!"), 3000);
	});

}

//Pick video size
const pickVideo = async (width, height) => {
	console.log("herer");
	console.log(width);
	console.log(height);
	//Get the hero video
	const heroVideo = document.querySelector(".heroVideo");	
	const videoSrc = document.querySelector(".heroVideo source");
	//Get the new window ratio
	let ratio = width / height;
	let choice = "media/heroSquare.mp4";
	let diff = Math.abs(1 -ratio);
	if (Math.abs((16/9)-ratio)< diff) {
		diff = Math.abs((16/9) - ratio);
		choice = "media/heroLandscape.mp4";
	}
	if (Math.abs((9/16)-ratio) < diff ) {
		choice = "media/heroPhone.mp4";
	}
	await updateVideo(heroVideo, videoSrc, choice);
}

//Create an observer for window size
const resizeObserver = new ResizeObserver((el) => {
	if (el[0]) {
		if (el[0].target == document.body) {
			console.log("again");
			console.log(el[0]);
			try {
				pickVideo(el[0].borderBoxSize[0].inlineSize, el[0].borderBoxSize[0].blockSize);
			} catch {
				return;
			}
		}
	}
});

//Change the video if the view port ratio changes
resizeObserver.observe(document.body);

//Change the video if the orientation changes
ScreenOrientation.onchange = (event) => {
	console.log("orientationchange");
	pickVideo(document.body.offsetWidth, document.body.offsetHeight);
}
