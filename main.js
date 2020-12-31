const section_0 = document.getElementById("section-0");
const section_1 = document.getElementById("section-1");
const section_2 = document.getElementById("section-2");
const section_3 = document.getElementById("section-3");
const section_4 = document.getElementById("section-4");
const section_5 = document.getElementById("section-5");
const sections = document.querySelectorAll("section");

const section_2_image_1 = document.getElementById("section-2-image-1");
const section_3_image = document.getElementsByClassName("section-3-image");

const imageViewer = document.getElementById("image-viewer");
const imageViewerContent = document.getElementById("image-viewer-content");
const carousel_1 = document.getElementById("carousel-1");
const carousel_2 = document.getElementById("carousel-2");
const verifyScreenSize = document.getElementById("verify-screen-size");

const carouselCell_1 = document.getElementsByClassName("carousel-1-cell");
const carouselCell_2 = document.getElementsByClassName("carousel-2-cell");
const carousel2range = document.getElementById("carousel-2-range");

const root = document.documentElement;

const navbarCheckbox = document.getElementById("navbar-checkbox");
const navbar = document.getElementById("navbar");
const navbarLabel = document.getElementById("label-button");
const navbar_icon = document.getElementById("navbar-icon");
const navbar_link = document.querySelectorAll(".navbar-link");

const verifyWidth = document.getElementById("verify-screen-size-width");
const verifyHeight = document.getElementById("verify-screen-size-height");

function detectMobile() {
    return ( ( window.innerWidth <= 1024 ) );
}

console.log(detectMobile())

var transalteZval=0;
var transalteZWidth=0;
var carouselCellNum_1=0;
var carouselDeg_1=0;
var mouseX=0;
var mouseY=0;
var smoothSroll = true;


const defineTransalteVal = () => {
    transalteZWidth_1 = getComputedStyle(carouselCell_1[0]).width.slice(0,-2);
    transalteZWidth_2 = getComputedStyle(carouselCell_2[0]).width.slice(0,-2);
    
    transalteZval_1 = Math.round( (transalteZWidth_1/2) / Math.tan( Math.PI / 9)) * 1.1;
    transalteZval_2 = Math.round( (transalteZWidth_2/2) / Math.tan( Math.PI / 9)) * 1.2;

    root.style.setProperty('--taille-carousel-1', transalteZval_1 + "px");
    root.style.setProperty('--taille-carousel-2', transalteZval_2 + "px");
    console.log('resizing')
}
window.addEventListener('resize',defineTransalteVal)




const checkNavbar = () => {
    if (navbarCheckbox.checked==true) {
        navbar.classList.add('deployed');
        navbarLabel.classList.add('deployed');
        smoothSroll = false;
    } else {
        navbar.classList.remove('deployed');
        navbarLabel.classList.remove('deployed');
        smoothSroll = true;
    }
}

navbarCheckbox.addEventListener('click', checkNavbar)



navbarLabel.addEventListener('mouseover', () => {
    navbar.classList.add('hovered');
})
navbarLabel.addEventListener('mouseleave', () => {
    navbar.classList.remove('hovered');
})



const closeNavbar = () => {
    navbar.classList.remove('deployed');
    navbarLabel.classList.remove('deployed');
    navbarCheckbox.checked=false;
}



document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        defineTransalteVal()
        section_0.classList.add("remove");
        section_1.classList.add("onload");
    }
};


navbar_link.forEach((link,index) => {
    link.addEventListener('mouseover', () => {
        animateIcon(index,true)
    })
    link.addEventListener('mouseleave', () => {
        animateIcon(index,false)  
    })
    link.addEventListener('click', () => {
        closeNavbar();
    })
})


const animateIcon = (index,state) => {
    if (state) {
        for (let i=0;i<5;i++) {
            navbar_icon.classList.remove(`animation-${i}`);
        }
        navbar_icon.classList.add(`animation-${index}`);
        navbar_icon.classList.add("animate-display");
        navbar_icon.classList.remove("animate-hide");
    }
    else {
        navbar_icon.classList.remove("animate-display");
        navbar_icon.classList.add("animate-hide");
    }
}


observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            entry.target.classList.remove('onload')
        }
        else {
            entry.target.classList.add('onload')
        }
    })
}, {
    threshold: 0.2
});

sections.forEach((section,index) => {
    if (index!=0) {
        observer.observe(section)
    }
})

if (detectMobile() == false) {
    section_2_image_1.addEventListener('mousemove', () => {
        hover3d(section_2_image_1,true,8);
    })
    section_2_image_1.addEventListener('mouseleave', () => {
        hover3d(section_2_image_1,false,8);
    })
}

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

const hover3d = (div,state,strength) => {
    const box = div.getBoundingClientRect();
    
    var elemWidth= box.width;
    var elemHeight = box.height;
    
    var mouseXinDiv = mouseX-box.x;
    var mouseYinDiv = mouseY-box.y;

    degY = 1-mouseXinDiv/(elemWidth/2);
    degX = 1-mouseYinDiv/(elemHeight/2);

    
    if (state==true) {
        div.style.transition = "0s";
        div.style.transform = "perspective(40vw) rotateX("+strength*-degX+"deg) rotateY("+strength*degY+"deg)";
    }
    else {
        div.style.transition = "all .5s ease";
        div.style.transform = "";
    }
}

const showImage = (img,state) => {
    if (state) {
        imageViewer.classList.add("deploy");
        imageViewerContent.style.backgroundImage = "url('images/full-format/"+img+".webp')";
    } 
    else {
        imageViewer.classList.remove("deploy");
    }
}

const turnCarousel_1 = (sens) => {
    if (sens=='left') {
        carouselDeg_1 = carouselDeg_1 + 40;
        carousel_1.style.transform = "translateZ(calc(var(--taille-carousel-1)*-1)) rotateY("+carouselDeg_1+"deg)";
        carouselCellNum_1 -= 1;
    }
    else if (sens=='right') {
        carouselDeg_1 = carouselDeg_1 - 40;
        carousel_1.style.transform = "translateZ(calc(var(--taille-carousel-1)*-1)) rotateY("+carouselDeg_1+"deg)";
        carouselCellNum_1 += 1;
    }
    if (carouselCellNum_1<0) {
        carouselCellNum_1 = 9 + carouselCellNum_1;
    }
    if (carouselCellNum_1==9 || carouselCellNum_1==-9) {
        carouselCellNum_1 = 0;
    }
    for (let i=0;i<carouselCell_1.length;i++) {
        if (i!=carouselCellNum_1) {
            carouselCell_1[i].style.opacity = 0.5;
        }
        else {
            carouselCell_1[i].style.opacity = 1;
        }
    }
}

carousel2range.addEventListener('input', () => {
    console.log(`carousel value : ${carousel2range.value}`)
    console.log(`video ${carousel2range.value} displayed`)

    if (carousel2range.value==1) {
        carouselCell_2[0].style.transform = "rotateY("+320+"deg) translateZ(var(--taille-carousel-2))";
        carouselCell_2[1].style.transform = "rotateY("+40+"deg) translateZ(var(--taille-carousel-2))";
        carouselCell_2[2].style.transform = "rotateY("+0+"deg) translateZ(var(--taille-carousel-2))";
        carouselCellNum_2=2;
    }
    else if (carousel2range.value==2) {
        carouselCell_2[0].style.transform = "rotateY("+40+"deg) translateZ(var(--taille-carousel-2))";
        carouselCell_2[1].style.transform = "rotateY("+0+"deg) translateZ(var(--taille-carousel-2))";
        carouselCellNum_2=1;
        carouselCell_2[2].style.transform = "rotateY("+-40+"deg) translateZ(var(--taille-carousel-2))";
    }
    else if (carousel2range.value==3) {
        carouselCell_2[0].style.transform = "rotateY("+0+"deg) translateZ(var(--taille-carousel-2))";
        carouselCellNum_2=0;
        carouselCell_2[1].style.transform = "rotateY("+-40+"deg) translateZ(var(--taille-carousel-2))";
        carouselCell_2[2].style.transform = "rotateY("+-320+"deg) translateZ(var(--taille-carousel-2))";
    }
    for (let i=0;i<carouselCell_2.length;i++) {
        if (i!=carouselCellNum_2) {
            carouselCell_2[i].style.opacity = 0.5;
        }
        else {
            carouselCell_2[i].style.opacity = 1;
        }
    }
})

