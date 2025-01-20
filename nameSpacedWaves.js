class Wave {
  constructor(x, y, w, h, ctx) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = this.ctx.color(0, 0, 0)
    this.lineWidth = 10
    this.amplitude = 1
    this.waveNumber = 2
    this.pulse = this.ctx.TWO_PI * 0.0 // 2 * PI * nombre de pulsation par seconde
    this.phase = (3 * this.ctx.PI) / 2
    this.lastUpdate = this.getTime()
    this.fill = true
    this.fillH = 0
  }

  getTime() {
    let d = new Date()
    return d.getTime()
  }

  getAngle(x) {
    return this.ctx.map(x, 0, this.w, this.phase, this.ctx.TWO_PI * this.waveNumber + this.phase)
  }

  getWaveValue(angle) {
    return this.amplitude * this.ctx.sin(angle)
  }

  getYValue(waveValue) {
    return this.ctx.map(waveValue, -1, 1, 0, this.h)
  }

  update() {
    let now = this.getTime()
    let elapsed = now - this.lastUpdate
    this.lastUpdate = now
    this.phase += this.pulse * (elapsed / 1000)
    this.phase %= this.ctx.TWO_PI
  }

  display() {
    this.update()
    this.ctx.push()
    this.ctx.translate(this.x, this.y)

    if (!this.fill) {
      this.ctx.noFill()
      this.ctx.stroke(this.color)
      this.ctx.strokeWeight(this.lineWidth)
    } else {
      this.ctx.noStroke()
      this.ctx.fill(this.color)
    }
    this.ctx.beginShape()
    for (let x = 0; x < this.w; x++) {
      this.ctx.vertex(x, this.getYValue(this.getWaveValue(this.getAngle(x))))
    }
    if (this.fill) {
      this.ctx.vertex(this.w, this.fillH)
      this.ctx.vertex(0, this.fillH)
      this.ctx.endShape(this.ctx.CLOSE)
    } else {
      this.ctx.endShape()
    }
    this.ctx.noFill()
    this.ctx.pop()
  }
}

//======================================================================

class SineWave extends Wave {
  constructor(x, y, w, h, ctx) {
    super(x, y, w, h, ctx)
  }

  getWaveValue(angle) {
    return this.amplitude * this.ctx.sin(angle)
  }
}

//======================================================================

class SquareWave extends Wave {
  constructor(x, y, w, h, ctx) {
    super(x, y, w, h, ctx)
    this.phase = -0.005
  }

  getWaveValue(angle) {
    let newAngle = angle % this.ctx.TWO_PI
    if (newAngle > this.ctx.PI || (newAngle < 0 && newAngle > -this.ctx.PI)) {
      return -1 * this.amplitude
    } else {
      return 1 * this.amplitude
    }
  }
}

//======================================================================

class TriangleWave extends Wave {
  constructor(x, y, w, h, ctx) {
    super(x, y, w, h, ctx)
    this.phase = this.ctx.PI / 2 - 0.01
  }

  getWaveValue(angle) {
    //LA FONCTION DE L'ONDE QUI VA DEFINIR onde, PRENDS UN ANGLE EN PARAMETRE ET RETOURNE UNE VALEURE ENTRE -1 ET 1
    return ((2 * this.amplitude) / this.ctx.PI) * this.ctx.asin(this.ctx.sin(angle))
  }
}

//======================================================================

class SawtoothWave extends Wave {
  constructor(x, y, w, h, ctx) {
    super(x, y, w, h, ctx)
    this.phase = -0.01
  }

  getWaveValue(angle) {
    return ((2 * this.amplitude) / this.ctx.PI) * this.ctx.atan(1 / this.ctx.tan(angle / 2))
  }
}

//======================================================================
