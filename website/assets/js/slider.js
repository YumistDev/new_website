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

function swapImage()
{
  document.slide.src = path[i];
  if(i < path.length - 1) i++;
  else i = 0;
  setTimeout("swapImage()",3000);
}
window.onload=swapImage;
