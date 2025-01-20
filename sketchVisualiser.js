let avatars = []
let sketches = []
let sketchesMap = new Map()
let p5_sk
let SKETCH_SIZE = 114
let GRID_CELL_SIZE = 111
let user_avatars = []
let temp = ""
let patchwork = []
const input_user = document.querySelector("#input-find-my-avatars")
const button_find = document.querySelector("#button-find-my-avatars")
const sketches_container = document.querySelector("#dancing_floor")
const user_span = document.querySelector("#span-user")
let mySound = new Audio("ondes.mp4")
mySound.loop = true
mySound.play()

const config = {
  apiKey: "AIzaSyDfC7SqXVAGR3ekWeNKn5Ja-zxSthMOTzk",
  authDomain: "ecal-cdfcf.firebaseapp.com",
  projectId: "ecal-cdfcf",
  storageBucket: "ecal-cdfcf.appspot.com",
  messagingSenderId: "869616859356",
  appId: "1:869616859356:web:91aa3726d48dd1344cdc19",
  databaseURL: " https://ecal-cdfcf-default-rtdb.europe-west1.firebasedatabase.app"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const database = firebase.database()
const ref = database.ref("db")

let sketch = p => {
  p.bgSine
  p.bgSquare
  p.bgTriangle
  p.bgSawtooth
  p.p5Caneva
  p.design

  p.setup = () => {
    p.p5Caneva = p.createCanvas(GRID_CELL_SIZE, GRID_CELL_SIZE)
    p.p5Caneva.addClass("zoom-in")
    p.p5Caneva.parent("dancing_floor")
  }

  p.draw = () => {
    p.background(p.design.Aura)
    p.bgSine.display()
    p.bgSquare.display()
    p.bgTriangle.display()
    p.bgSawtooth.display()
  }
}

function setWaveParams(wave, design) {
  wave.amplitude = design["Saddy<, >Happy"]
  wave.waveNumber = design["Introvert<,>Extravert"]
  wave.pulse = p5_sk.TWO_PI * design.Energy
}

const displayAllAvatars = () => {
  sketches_container.innerHTML = ""
  avatars = []
  database.ref("db/waves").on(
    "value",
    snapshot => {
      new Map(Object.entries(snapshot.val())).forEach((v, k) => {
        let userSketches = []
        Object.values(v).forEach(param =>
          Object.values(param).forEach(design => {
            //console.log(design)
            avatars.push(design)
            displaySketch(design, userSketches)
          })
        )

        sketchesMap.set(k, userSketches)
      })
      console.log(sketchesMap)
    },
    errorObject => {
      console.log("The read failed: " + errorObject.name)
    }
  )
}

input_user.addEventListener("change", e => {
  if (input_user.value == "") {
    patchwork.forEach(temp => sketchesMap.get(temp).forEach(sk => sk.p5Caneva.removeClass("my-avatars")))
  }
})

input_user.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    button_find.click()
  }
})

button_find.addEventListener("click", e => {
  if (input_user.value == "") {
    alert("please provide a username")
  } else {
    if (sketchesMap.has(input_user.value)) {
      console.log(sketchesMap.get(input_user.value))
      sketchesMap.get(input_user.value).forEach(sk => sk.p5Caneva.addClass("my-avatars"))
      patchwork.push(input_user.value)
    } else {
      alert(`This user doesn't exist`)
    }
  }
})

displayAllAvatars()
user_span.style.display = "none"

function displaySketch(design, userSketches = []) {
  p5_sk = new p5(sketch)

  p5_sk.design = design

  sketches.push(p5_sk)
  userSketches.push(p5_sk)

  let bgWaveHeight = (-1 / 3) * SKETCH_SIZE
  let waveDistance = (1 / 6) * SKETCH_SIZE

  p5_sk.bgSine = new SineWave(0, (1 / 3) * SKETCH_SIZE, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
  p5_sk.bgSine.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
  p5_sk.bgSine.color = p5_sk.color(design.Vibe1)
  p5_sk.bgSine.fill = design["Full Vibe1"]
  p5_sk.bgSquare = new SquareWave(0, (1 / 3) * SKETCH_SIZE + waveDistance, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
  p5_sk.bgSquare.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
  p5_sk.bgSquare.color = p5_sk.color(design.Vibe2)
  p5_sk.bgSquare.fill = design["Full Vibe2"]

  p5_sk.bgSquare.y = (1 / 3) * SKETCH_SIZE + waveDistance * design["This Creature Is High"]

  p5_sk.bgTriangle = new TriangleWave(0, (1 / 3) * SKETCH_SIZE + waveDistance * 2, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
  p5_sk.bgTriangle.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
  p5_sk.bgTriangle.color = p5_sk.color(design.Vibe3)
  p5_sk.bgTriangle.fill = design["Full Vibe3"]

  p5_sk.bgTriangle.y = (1 / 3) * SKETCH_SIZE + 2 * waveDistance * design["This Creature Is High"]

  p5_sk.bgSawtooth = new SawtoothWave(0, (1 / 3) * SKETCH_SIZE + waveDistance * 3, SKETCH_SIZE, bgWaveHeight, sketches[sketches.length - 1])
  p5_sk.bgSawtooth.fillH = SKETCH_SIZE - (1 / 3) * SKETCH_SIZE
  p5_sk.bgSawtooth.color = p5_sk.color(design.Vibe4)
  p5_sk.bgSawtooth.fill = design["Full Vibe4"]

  p5_sk.bgSawtooth.y = (1 / 3) * SKETCH_SIZE + 3 * waveDistance * design["This Creature Is High"]

  setWaveParams(p5_sk.bgSawtooth, design)
  setWaveParams(p5_sk.bgTriangle, design)
  setWaveParams(p5_sk.bgSquare, design)
  setWaveParams(p5_sk.bgSine, design)
}
