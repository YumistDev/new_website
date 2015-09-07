var i = 0; var path = new Array();
// LIST OF IMAGES
path[0] = "website/assets/images/0.jpg";
path[1] = "website/assets/images/1.jpg";
path[2] = "website/assets/images/2.jpg";
path[3] = "website/assets/images/3.jpg";
path[4] = "website/assets/images/4.jpg";
path[5] = "website/assets/images/5.jpg";
path[6] = "website/assets/images/6.jpg";
path[7] = "website/assets/images/7.jpg";

var slideInRightAnimationClass = "animate-slide-in-right";

function swapImage()
{

	document.previousImage.src = path[i];
	//var image = document.getElementById('screenshot-holder');
   	if(i < path.length - 1) 
  	{
  		i++;
  	}
  	else 
	{
		i = 0;
	}
	document.slide.src = path[i];
	document.slide.classList.remove(slideInRightAnimationClass);
	document.slide.offsetWidth = document.slide.offsetWidth;
	document.slide.classList.add(slideInRightAnimationClass);
  	setTimeout("swapImage()",3000);
}
window.onload=swapImage;
