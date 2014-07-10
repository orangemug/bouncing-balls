var balls = [];
var speed = 5;
var size = {
  w: window.innerWidth,
  h: window.innerHeight
};

window.addEventListener("resize", function() {
  size = {
    w: window.innerWidth,
    h: window.innerHeight
  };
})

function getBounds() {
  return size;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function randPos(r) {
  var b = getBounds();
  return [
    (b.w-r*2)*Math.random(),
    (b.h-r*2)*Math.random()
  ];
}

function randHeading() {
  return [Math.random(), Math.random()];
}

function genBalls(num) {
  for(var i=balls.length; i<num; i++) {
    var el = document.createElement("div");
    el.classList.add("ball");
    el.style.backgroundColor = getRandomColor();
    document.body.appendChild(el);
    balls.push({
      r: 30,
      el: el,
      heading: randHeading(),
      pos: randPos(30)
    });
  }
}

function loop() {
  window.requestAnimationFrame(loop);

  var wb = getBounds();

  balls.forEach(function(b) {
    var changed = false;
    var x = b.pos[0] + b.heading[0]*speed;
    var y = b.pos[1] + b.heading[1]*speed;

    if(x < 0 && b.heading[0] < 0) {
      changed = true;
      b.heading[0] *= -1;
    }
    if(x > wb.w-b.r && b.heading[0] > 0) {
      changed = true;
      b.heading[0] *= -1;
    }
    if(y < 0 && b.heading[1] < 0) {
      changed = true;
      b.heading[1] *= -1;
    }
    if(y > wb.h-b.r && b.heading[1] > 0) {
      changed = true;
      b.heading[1] *= -1;
    }

    if(changed) {
      x = b.pos[0] + b.heading[0]*speed;
      y = b.pos[1] + b.heading[1]*speed;
    }

    b.pos[0] = x;
    b.pos[1] = y;

    b.el.style.webkitTransform = "translate3d("+x+"px,"+y+"px,0px)"
  });
}

window.requestAnimationFrame(loop);

function destroy(v) {
  var amt = balls.length-v;

  while(amt > 0) {
    var b = balls.pop();
    b.el.parentNode.removeChild(b.el);
    amt--;
  }
}

var amtEl   = document.querySelector("#amt");
var speedEl = document.querySelector("#speed");

amtEl.addEventListener("change", function(e) {
  destroy(amtEl.value);
  genBalls(amtEl.value);
}, false);

speedEl.addEventListener("change", function(e) {
  speed = speedEl.value;
}, false);

genBalls(amtEl.value);
