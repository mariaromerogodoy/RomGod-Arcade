
function closeAll(btns) {
    btns.forEach(btn => {
      btn.classList.remove('active');
      btn.textContent = btn.dataset.label;
      const target = btn.dataset.target;
      const box = document.getElementById('WrongHidden' + target);
      if (box) box.classList.remove('show'), box.style.display = 'none';
    });
  }

  const buttons = Array.from(document.querySelectorAll('.toggle-btn'));

  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const isActive = btn.classList.contains('active');
      const target = btn.dataset.target;
      const box = document.getElementById('WrongHidden' + target);

      if (!box) return;

      if (isActive) {
        
        btn.classList.remove('active');
        btn.textContent = btn.dataset.label;
        box.classList.remove('show');
        box.style.display = 'none';
      } else {
       
        closeAll(buttons);
        btn.classList.add('active');
        btn.textContent = 'XXX';
        box.style.display = 'block';
       
        requestAnimationFrame(() => box.classList.add('show'));
      }
    });
  });

 
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll(buttons);
  });

 
  document.addEventListener('click', e => {
    const isBtn = e.target.classList && e.target.classList.contains('toggle-btn');
    const isModal = e.target.closest('.hidden');
    if (!isBtn && !isModal) closeAll(buttons);
  });

  var topZ = 10; 

function dragElement(elmnt, container) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  const header = elmnt.querySelector(".fotoheader");
  const handle = header || elmnt;

  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    elmnt.style.zIndex = ++topZ;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // proposed new position
    let newTop  = elmnt.offsetTop  - pos2;
    let newLeft = elmnt.offsetLeft - pos1;

    // clamp inside container
    const maxLeft = container.clientWidth  - elmnt.offsetWidth;
    const maxTop  = container.clientHeight - elmnt.offsetHeight;

    newLeft = Math.max(0, Math.min(maxLeft, newLeft));
    newTop  = Math.max(0, Math.min(maxTop,  newTop));

    elmnt.style.top  = newTop  + "px";
    elmnt.style.left = newLeft + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


$(function () {
    const YG = document.querySelector(".YG"); 
    const hero = document.querySelector(".hero");
  
   
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            YG.classList.add("is-visible");   
          } else {
            YG.classList.remove("is-visible"); 
          }
        });
      },
      { threshold: 0.2 } 
    );
  
    io.observe(hero);
  });
  

$(function () {
  const feature = document.getElementById("feature");

 
  const hero = document.querySelector(".hero");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          feature.classList.add("is-visible");
        } else {
          feature.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0.2 } 
  );
  io.observe(hero);

 
  function randomizePositions() {
    const fw = feature.clientWidth;
    const fh = feature.clientHeight;

    $(".randompos").each(function () {
      const $el = $(this);
      const w = $el.outerWidth();
      const h = $el.outerHeight();
      const maxLeft = Math.max(0, fw - w);
      const maxTop  = Math.max(0, fh - h);
      $el.css({
        left: Math.floor(Math.random() * maxLeft) + "px",
        top:  Math.floor(Math.random() * maxTop)  + "px",
      });
    });
  }

 
  $(".fotopopup").each(function () {
    dragElement(this, feature);
  });

  
  $(window).on("load", function () {
    randomizePositions();
  });

 
  $(window).on("resize", function () {
    randomizePositions();
  });
});


const toggleImages = [
  { primary: "../imagess/tc2.png",  secondary: "../imagess/tc3.png"  },
  { primary: "../imagess/tc4.png",  secondary: "../imagess/tc5.png"  },
  { primary: "../imagess/tc6.png",  secondary: "../imagess/tc7.png"  },
  { primary: "../imagess/tc8.png",  secondary: "../imagess/tc9.png"  },
  { primary: "../imagess/tc10.png", secondary: "../imagess/tc11.png" },
  { primary: "../imagess/tc12.png", secondary: "../imagess/tc13.png" },
  { primary: "../imagess/tc14.png", secondary: "../imagess/tc15.png" },
  { primary: "../imagess/tc16.png", secondary: "../imagess/tc17.png" },
  { primary: "../imagess/tc18.png", secondary: "../imagess/tc19.png" },
  { primary: "../imagess/tc20.png", secondary: "../imagess/tc21.png" },
  { primary: "../imagess/tc22.png", secondary: "../imagess/tc23.png" },
  { primary: "../imagess/tc24.png", secondary: "../imagess/tc25.png" },
  { primary: "../imagess/tc26.png", secondary: "../imagess/tc27.png" },
  { primary: "../imagesss/tc28.png", secondary: "../imagess/tc29.png" },
  { primary: "../imagess/tc30.png", secondary: "../imagess/tc31.png" },
];


window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fotopopup img").forEach((img, index) => {
    const pair = toggleImages[index];
    if (!pair) return;
    let toggled = false;
    img.addEventListener("click", () => {
      toggled = !toggled;
      img.src = toggled ? pair.secondary : pair.primary;
    });
  });
});
