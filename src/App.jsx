import './styles/App.css'
import { useRef, useState, useEffect} from 'react'


function App() {
const [togglePower,setTogglePower] = useState(false);
const [clickedBtn, setClickedBtn] = useState(null)
const [volume , setVolume] = useState(50);
const displayScreen = useRef(null)
const audioRefs = useRef([]);

const possibleKeys = [{"Q": "Heater 1"},
  {"W": "Heater 2"},
  {"E": "Heater 3"},
  {"A": "Heater 4"},
  {"S": "Clap"},
  {"D": "Open-HH"},
  {"Z": "Kick-n'-Hat"},
  {"X": "Kick"},
  {"C": "Closed-HH"}]

const changeShadow = (id) =>{
  setClickedBtn(id)
  setTimeout(() => setClickedBtn(null) ,200)

}

const togglePowerFun = () => {
  setTimeout(() => setTogglePower(!togglePower) ,160)
  if(!togglePower){
    displayScreen.current.innerHTML = ""
  }
}

const handleVolume = (e) => {
  const newVolume = e.target.value;
  setVolume(newVolume);
  audioRefs.current.forEach(audio => {
    if(audio){
      audio.volume = newVolume / 100;
    }
  });
  displayScreen.current.innerHTML = `Volume: ${newVolume}`
};


const playAudio = (id) =>  {
    const audio = audioRefs.current.find((ref => ref.id === id));
    changeShadow(id)

  if (audio){
    if(!togglePower){
    audio.play();
    const findId = possibleKeys.find(k => Object.keys(k)[0] === id);
    let idValue = findId[id];
    displayScreen.current.innerHTML = idValue;
    }
    
  };
};

const keyDownFun = (e) => {
  const key = e.key.toUpperCase();
  const findKey = possibleKeys.find(k => Object.keys(k)[0].toUpperCase() === key);


  if (findKey){
    if(!togglePower){
    const value = findKey[key];
    playAudio(key);
    displayScreen.current.innerHTML = value
}};
}

useEffect(()=>{
  window.addEventListener("keydown", keyDownFun);
  return () => window.removeEventListener("keydown", keyDownFun)
})

  return (
    <main id="main">
      <div className="d-flex flex-column flex-md-row" id="drum-machine">
      <div className="col-12 col-md-6 justify-content-between" id="pads">

        <div className="row justify-content-around">
          <button className={`drum-pad col-3 btn btn-light ${clickedBtn==="Q" ? "no-shadow-box":"shadow-box"}`} id="Heater-1" 
          onClick={() => playAudio("Q")}>Q
            <audio className="clip" ref={(ref) => audioRefs.current[0] = ref} src="./public/sounds/Heater-1.mp3" id="Q"></audio>
          </button>
          <button className={`drum-pad col-3 btn btn-light ${clickedBtn==="W" ? "no-shadow-box":"shadow-box"}`} id="Heater-2" 
          onClick={() => playAudio("W")}>W
            <audio className="clip" ref={(ref) => audioRefs.current[1] = ref} src="./public/sounds/Heater-2.mp3" id="W"></audio>
          </button>
          <button className={`drum-pad col-3 btn btn-light ${clickedBtn==="E" ? "no-shadow-box":"shadow-box"}`} id="Heater-3" 
          onClick={() => playAudio("E")}>E
            <audio className="clip" ref={(ref) => audioRefs.current[2] = ref} src="./public/sounds/Heater-3.mp3" id="E"></audio>
          </button>
        </div>

        <div className="row justify-content-around">
          <button className={`drum-pad col-3 btn btn-light ${clickedBtn==="A" ? "no-shadow-box":"shadow-box"}`} id="Heater-4" 
          onClick={() => playAudio("A")}>A
            <audio className="clip" ref={(ref) => audioRefs.current[3] = ref} src="./public/sounds/Heater-4.mp3" id="A"></audio> 
          </button>
          <button className={`drum-pad col-3 btn btn-light ${clickedBtn==="S" ? "no-shadow-box":"shadow-box"}`} id="Clap" 
          onClick={() => playAudio("S")}>S
            <audio className="clip" ref={(ref) => audioRefs.current[4] = ref} src="./public/sounds/Clap.mp3" id="S"></audio>
          </button>
          <button className={`drum-pad col-3 btn btn-light ${clickedBtn==="D" ? "no-shadow-box":"shadow-box"}`} id="Open-HH" 
          onClick={() => playAudio("D")}>D
            <audio className="clip" ref={(ref) => audioRefs.current[5] = ref} src="./public/sounds/Open-HH.mp3" id="D"></audio>
          </button>
        </div>

        <div className="row justify-content-around">
          <button className={`drum-pad col-3 btn btn-light ${clickedBtn==="Z" ? "no-shadow-box":"shadow-box"}`} id="Kick-n-Hat" 
          onClick={() => playAudio("Z")}>Z
            <audio className="clip" ref={(ref) => audioRefs.current[6] = ref} src="./public/sounds/Kick_n_Hat.mp3" id="Z"></audio>
          </button>
          <button className={`drum-pad col-3 btn btn-light ${clickedBtn==="X" ? "no-shadow-box":"shadow-box"}`} id="Kick" 
          onClick={() => playAudio("X")}>X
            <audio className="clip" ref={(ref) => audioRefs.current[7] = ref} src="./public/sounds/Kick.mp3" id="X"></audio>
          </button>
          <button className={`drum-pad col-3 btn btn-light ${clickedBtn==="C" ? "no-shadow-box":"shadow-box"}`} id="Closed-HH" 
          onClick={() => playAudio("C")}>C
            <audio className="clip" ref={(ref) => audioRefs.current[8] = ref} src="./public/sounds/Closed-HH.mp3" id="C"></audio>
          </button>
        </div>

      </div>
      <div className="col-12 col-md-6 row" id="options">
        <div id="display-box"><p ref={displayScreen} id="display"></p></div>
        <input className="col-12" type="range" id="volume" min="0" max="100" value={volume} onChange={handleVolume}></input>
        <button className={`btn ${!togglePower ? "btn-success":"btn btn-danger"} ${clickedBtn==="power" ? "no-shadow-box":"shadow-box"}`} id="power" 
        onClick={() => {togglePowerFun(), changeShadow("power")}}><i className="bi bi-power"></i></button>
      </div>
    </div>
    </main>
  )
}

export default App
