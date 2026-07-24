new p5((p) => {
  const dots = [];
  const palette = ['#19b8ff', '#ff3ca6', '#b8e61d', '#ffb51f'];

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('p5-bg');
    canvas.style('display', 'block');
    p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
    for (let i = 0; i < 52; i++) {
      dots.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-0.25, 0.25),
        vy: p.random(-0.25, 0.25),
        r: p.random(2, 5),
        c: p.random(palette)
      });
    }
  };

  p.draw = () => {
    p.clear();
    const pointerX = p.mouseX || p.width / 2;
    const pointerY = p.mouseY || p.height / 2;

    dots.forEach((d, i) => {
      const dx = pointerX - d.x;
      const dy = pointerY - d.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 180 && distance > 1) {
        d.vx -= (dx / distance) * 0.006;
        d.vy -= (dy / distance) * 0.006;
      }

      d.x += d.vx;
      d.y += d.vy;
      d.vx *= 0.995;
      d.vy *= 0.995;

      if (d.x < -10) d.x = p.width + 10;
      if (d.x > p.width + 10) d.x = -10;
      if (d.y < -10) d.y = p.height + 10;
      if (d.y > p.height + 10) d.y = -10;

      p.noStroke();
      p.fill(d.c + '88');
      p.circle(d.x, d.y, d.r);

      for (let j = i + 1; j < dots.length; j++) {
        const other = dots[j];
        const gap = p.dist(d.x, d.y, other.x, other.y);
        if (gap < 105) {
          p.stroke(25, 184, 255, p.map(gap, 0, 105, 35, 0));
          p.strokeWeight(0.7);
          p.line(d.x, d.y, other.x, other.y);
        }
      }
    });
  };

  p.touchMoved = () => false;

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
