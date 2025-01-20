let gui

let bgSine
let bgSquare
let bgTriangle
let bgSawtooth
let bgWaveHeight
let waveDistance
let floatDelta = 0.5
let colorchange = 255
let p5Caneva
let btnSaveMyFirstAvatar
let btnSaveAnotherAvatar
let userName
let mySound = new Audio("ondes.mp4")

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

const resgitreNewAvatar = (username, avatarParams) => {
  ref.child(`waves/${username}`).once("value", snapshot => {
    if (snapshot.exists()) {
      alert(`please choose another username`)
    } else {
      database.ref(`db/waves/${username}`).set(avatarParams)
      alert(`You avatar is saved`)
    }
  })
}

const addNewAvatar = (username, avatarParams) => {
  ref.child(`waves/${username}`).once("value", snapshot => {
    if (snapshot.exists()) {
      ref.child(`waves/${username}/avatars`).push(avatarParams)
      alert(`You avatar is saved`)
    } else {
      alert(`This username "${username}"  doesn't exist`)
    }
  })
}

const FirebaseDatabaseService = {
  resgitreNewAvatar,
  addNewAvatar
}

const PARAMS = {
  "Saddy<, >Happy": 0.84,
  "Full Life": true,
  "Introvert<,>Extravert": 1.2,
  Energy: 0.0,
  "This Creature Is High": 1,
  Aura: "#FFFFFF",
  Vibe1: "#FFD4A1",
  "Full Vibe1": true,
  Vibe2: "#A6FF7C",
  "Full Vibe2": true,
  Vibe3: "#94B2FF",
  "Full Vibe3": true,
  Vibe4: "#FFBBF0",
  "Full Vibe4": true
}

//======================================================================
function setup() {
  mySound.loop = true
  userName = document.querySelector("#username")

  function saveAnotherAvatar() {
    if (userName.value) {
      FirebaseDatabaseService.addNewAvatar(userName.value, PARAMS)
    }
  }

  async function saveMyFirstAvatar() {
    if (userName.value) {
      FirebaseDatabaseService.resgitreNewAvatar(userName.value, { avatars: [PARAMS] })
    }
  }

  p5Caneva = createCanvas((3 / 5) * windowHeight, (3 / 5) * windowHeight)

  setupGui()

  btnSaveMyFirstAvatar = createButton("Save My First Avatar")
  btnSaveMyFirstAvatar.addClass("btn")
  btnSaveMyFirstAvatar.addClass("btn-vib")
  btnSaveMyFirstAvatar.addClass("btn-save")
  btnSaveMyFirstAvatar.addClass("mr-2")
  btnSaveMyFirstAvatar.addClass("btn-color-3")
  btnSaveMyFirstAvatar.parent("btn-validate-group")
  btnSaveMyFirstAvatar.mousePressed(saveMyFirstAvatar)

  btnSaveAnotherAvatar = createButton("Save Another Avatar")
  btnSaveAnotherAvatar.addClass("btn")
  btnSaveAnotherAvatar.addClass("btn-vib")
  btnSaveAnotherAvatar.addClass("btn-save")
  btnSaveAnotherAvatar.addClass("btn-color-4")
  btnSaveAnotherAvatar.addClass("mr-2")
  btnSaveAnotherAvatar.parent("btn-validate-group")
  btnSaveAnotherAvatar.mousePressed(saveAnotherAvatar)

  setupBGWaves()
  colorMode(RGB, 255)

  //=====================================================================
  sketch = document.querySelector("#GUI")
  let guidome = document.querySelector("#gui")
  sketch.appendChild(guidome)
  p5Caneva.id("canvas0")
  p5Caneva.parent("sketch-container")

  let btnclosesblash = document.querySelector("#splash-close")
  btnclosesblash.addEventListener("click", () => {
    let splash = document.querySelector("#splash-screen")
    splash.style.display = "none"
    mySound.play()
  })
}

function draw() {

  background(PARAMS.Aura)

  updateBGWaves()
  checkParams()

  displayBGWaves()
  changeColor()

  loop()
}

function setupGui() {
  gui = new dat.GUI({ closeOnTop: true, width: 294 })

  gui.closed = true
  gui.domElement.id = "gui"

  gui.addColor(PARAMS, "Aura").onChange(update)

  gui.add(PARAMS, "Full Vibe1").onChange(function (value) {
    bgSine.fill = value
  })
  gui.addColor(PARAMS, "Vibe1").onChange(update)

  gui.add(PARAMS, "Full Vibe2").onChange(function (value) {
    bgSquare.fill = value
  })
  gui.addColor(PARAMS, "Vibe2").onChange(update)

  gui.add(PARAMS, "Full Vibe3").onChange(function (value) {
    bgTriangle.fill = value
  })
  gui.addColor(PARAMS, "Vibe3").onChange(update)

  gui.add(PARAMS, "Full Vibe4").onChange(function (value) {
    bgSawtooth.fill = value
  })
  gui.addColor(PARAMS, "Vibe4").onChange(update)

  gui.add(PARAMS, "Saddy<, >Happy").min(0).max(1)
  gui.add(PARAMS, "Introvert<,>Extravert").min(0).max(10)
  gui.add(PARAMS, "Energy").min(-5).max(5)
  gui.add(PARAMS, "This Creature Is High").min(0).max(1.5)
}

var update = function () {
  console.log(PARAMS.Aura)
  background(3)
}

function setupBGWaves() {
  bgWaveHeight = (-1 / 3) * height
  waveDistance = (1 / 6) * height
  console.log(height)
  console.log(width)
  bgSine = new SineWave(0, (1 / 3) * height, width, bgWaveHeight)
  bgSine.fillH = height - (1 / 3) * height
  bgSquare = new SquareWave(0, (1 / 3) * height + waveDistance, width, bgWaveHeight)
  bgSquare.fillH = height - (1 / 3) * height
  bgTriangle = new TriangleWave(0, (1 / 3) * height + waveDistance * 2, width, bgWaveHeight)
  bgTriangle.fillH = height - (1 / 3) * height
  bgSawtooth = new SawtoothWave(0, (1 / 3) * height + waveDistance * 3, width, bgWaveHeight)
  bgSawtooth.fillH = height - (1 / 3) * height
}

function checkParams() {
  if (abs(PARAMS.Energy) <= floatDelta) {
    PARAMS.Energy = 0
  }
}
function setWaveParams(wave) {
  wave.amplitude = PARAMS["Saddy<, >Happy"]
  wave.waveNumber = PARAMS["Introvert<,>Extravert"]
  wave.pulse = TWO_PI * PARAMS.Energy
}

function setBGWaveParams(wave) {
  wave.amplitude = PARAMS["Saddy<, >Happy"]
  wave.waveNumber = PARAMS["Introvert<,>Extravert"]
  wave.pulse = TWO_PI * PARAMS.Energy
}

function setBGWaveDist() {
  bgSquare.y = (1 / 3) * height + waveDistance * PARAMS["This Creature Is High"]
  bgTriangle.y = (1 / 3) * height + 2 * waveDistance * PARAMS["This Creature Is High"]
  bgSawtooth.y = (1 / 3) * height + 3 * waveDistance * PARAMS["This Creature Is High"]
}

function updateBGWaves() {
  setBGWaveParams(bgSine)
  setBGWaveParams(bgSquare)
  setBGWaveParams(bgTriangle)
  setBGWaveParams(bgSawtooth)
  setBGWaveDist()
}

function displayBGWaves() {
  bgSine.display()
  bgSquare.display()
  bgTriangle.display()
  bgSawtooth.display()
}
function changeColor() {
  bgSine.color = color(PARAMS.Vibe1)
  bgSquare.color = color(PARAMS.Vibe2)
  bgTriangle.color = color(PARAMS.Vibe3)
  bgSawtooth.color = color(PARAMS.Vibe4)
}
