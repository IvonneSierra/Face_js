let video = null;
let detector = null;
let detections = [];
let videoVisibility = true;
let detecting = false;

const videoAction = document.getElementById('videoAction');
const detectionAction = document.getElementById('detectionAction');

document.body.style.cursor = 'wait';

function preload() {
  detector = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);

}

function draw() {
  if (!video || !detecting) return;
  image(video, 0, 0);
  for (let i = 0; i < detections.length; i++) {
    drawResult(detections[i]);
  }
   console.log('Cantidad de personas detectadas:', personCount);

  //console.log('Cantidad de objetos detectados:', objectCount);
}

function drawResult(object) {
  boundingBox(object);
  drawLabel(object);
}

function boundingBox(object) {
  stroke('blue');
  strokeWeight(6);
  noFill();
  rect(object.x, object.y, object.width, object.height);
}
function drawLabel(object) {
  noStroke();
  fill('white');
  textSize(34);
  text(object.label, object.x + 15, object.y + 34);
}

function onDetected(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;

  if (detecting) {
    detect();
  }
}

function detect() {
  detector.detect(video, onDetected);
}

function toggleVideo() {
  if (!video) return;
  if (videoVisibility) {
    video.hide();
    videoAction.innerText = 'Activar Video';
  } else {
    video.show();
    videoAction.innerText = 'Desactivar Video';
  }
  videoVisibility = !videoVisibility;
}

function toggleDetecting() {
  if (!video || !detector) return;
  if (!detecting) {
    detect();
    detectionAction.innerText = 'Parar...';
  } else {
    detectionAction.innerText = 'Detectar Objetos';
  }
  detecting = !detecting;
}
let personCount = 0;

function onDetected(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // Reiniciamos el conteo en cada detección
  personCount = 0;

  // Filtramos las detecciones para contar solo las personas
  results.forEach(result => {
    if (result.label === 'person') {
      personCount++;
    }
  });

  // Filtramos las detecciones para mostrar solo las personas
  detections = results.filter(result => result.label === 'person');

  if (detecting) {
    detect();
  }
}


/*
let objectCount = 0;

function onDetected(error, results) {
  if (error) {
    console.error(error);
  }

  // Reiniciamos el conteo en cada detección
  objectCount = 0;

  // Contamos todos los objetos detectados
  objectCount = results.length;

  detections = results;

  if (detecting) {
    detect();
  }
}



let personCount = 0;

function onDetected(error, results) {
  if (error) {
    console.error(error);
  }

  // Reiniciamos el conteo en cada detección
  personCount = 0;

  // Filtramos las detecciones para contar solo las personas
  results.forEach(result => {
    if (result.label === 'person') {
      personCount++;
    }
  });

  detections = results;

  if (detecting) {
    detect();
  }
}
}*/
