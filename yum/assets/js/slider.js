var i = 0; var path = new Array();
// LIST OF IMAGES
path[0] = "assets/images/1.png";
path[2] = "assets/images/3.png";
path[3] = "assets/images/4.png";
path[4] = "assets/images/5.png";

function swapImage()
{
  document.slide.src = path[i];
  if(i < path.length - 1) i++;
  else i = 0;
  setTimeout("swapImage()",3000);
}
window.onload=swapImage;
