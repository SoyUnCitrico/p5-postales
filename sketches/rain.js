let cnv;
const widthCanvas = 1024;
const heightCanvas = 768;
const timeChange = 7500;
let amazonas, america;
let inputText = "¿ C ó m o   t e   i m a g i n a s   e l   f u t u r o ?"
var fontSizeMax = 80;
var fontSizeNoise = Math.random() * 1000000;
var noiseStep = 10000;
let fontS  = 40;
var spacing = fontS; // line height
var kerning = 3; // between letters
var fontSizeStatic = false;
var static = false;
let imageOpacity = 0;
let n, fontComputer, fontPixel;
let imageOpacityLimit = 80;
let imageOpacityStep = 1;
let startedAnimation = false;
let pixels = [];
let timeFlag;
let teclado;
let colorSobre = '#ecd9c9';
let bell, typed1, returnSound, rainSound;
let aguaColores;
let jsonData = {
    respuestas: [
      "Me imaginaria un mundo donde no exista la deslealtad,\n un mundo donde la gran mayoría de su\n existencia se base en\n la creatividad misma...",
      "SIENDO AUTÉNTICO",
      "Prioridad en los valores, en las personas y en el entorno",
      "Conservando lo bueno del pasado, mejorando para el futuro.",
      "Limpio, verde y sin violencia",
      "Un futuro con salud y paz",
      "Antisistémico",
      "QUIERO UN MUNDO MEJOR DONDE PODAMOS VER EL CIELO Y\n PODAMOS VER LAS ESTRELLAS SIN TENER QUE\n ESPERAR O ROGAR QUE EL CIELO\n ESTÉ DESPEJADO",
      "CON RESISTENCIA",
      "UN MÉXICO EN EL QUE LAS INFANCIAS Y ADOLESCENCIAS NO\n SEAN RECLUTADAS POR EL NARCO",
      "que la policía no me extorsione",
      "Paz, conocimientos libres y libertad",
      "Centralismo dentro de una sociedad cambiante.\n Inversión de roles y la vez la urgencia\n de la conservación",
      "Me gustaría vivir en paz, en tranquilidad\n con los demás y ser perteneciente a todo y,\n a su vez, a nada.",
      "Un futuro donde todos nos podemos expresar\n sin ser reprimidos",
      "ME GUSTARIA PODER EMPEZAR DE NUEVO MÁS QUE LA\n OPCIÓN DE PENSAR EN EL FUTURO",
      "les gusta la calma sin tener que forzarse a los\n ritmos del modelo económico actual.",
      "UN FUTURO CON MÁS CONOCIMIENTO Y LIBERTAD DE APRENDER Y ENSEÑAR",
      "SIN GRINGOS",
      "Me imagino un mundo donde no haya necesidad de\n preocuparnos por cosas básicas\n como los alimentos.",
      "CON MÁS INNOVACIÓN Y TECNOLOGÍA",
      "Un futuro sin miedo a vivir, con ganas de libertad\n en todos los rincones de la\n existencia",
      "EL ARTE ES LO MÁS ACCESIBLE DEL MUNDO Y YO SOY FELIZ",
      "UNA MENTE COLMENA",
      "UN FUTURO SIN TRUMP",
      "ELEGIR LO QUE SE COMPARTE Y COMUNICA POR MEDIOS DIGITALES,\n TENER CUIDADO CON FOTOGRAFÍAS\n ÍNTIMAS",
      "armonía entre los pueblos. amor y comprensión entre las tribus.\n Amor familiar y sanas infancias",
      "solidario, libre, sin miedo y con linux",
      "LIMPIO, ACOGEDOR, PACIENTE, BONDADOSO.",
      "Creo que tenemos que pensar nuevas formas de intercambio.\n La acumulación de dinero\n ya no da para mucho más",
      "IMAGINO UN FUTURO CON CUIDADO DEL MEDIOAMBIENTE Y PAZ ENTRE TODOS",
      "Implementar leyes que favorezcan la privacidad del usuario",
      "UN FUTURO PLURICULTURAL Y SIN DISCRIMINACIÓN",
      "PLURICULTURAL, DEMOCRÁTICO Y LIBRE. SIN OPRESIÓN NI\n LIMITANTES, DISCRIMINACIONES NI\n IMPOSICIONES",
      "MOSTRANDO RESISTENCIA, AUTOSUFICIENCIA Y COMUNIDAD. APOYO, CARIÑO Y CUIDADO",
      "QUE LOS INTERESES DEL CAPITAL SE QUEDEN Y DESPOJEN SU\n PROPIA TIERRA SI ES QUE NECESITAN\n EXPLOTAR MÁS RECURSOS",
      "LIBRE DE RENCORES Y AMOR PARA TODOS",
      "ANARQUISTA",
      "SUSTENTABLE, PACIFICO Y UNO DONDE PODAMOS SUPERAR LOS\n FANATISMOS RELIGIOSOS Y EL\n CONSERVADURISMO.",
      "ME IMAGINO UN FUTURO DONDE TODOS SUS HABITANTES CONVIVAN\n DE MANERA SANA CON LA NATURALEZA\n ATT QUIQUE",
      "EL REGRESO DE JACOBO GRINBERG",
      "ASÍ COMO EL AGUA",
      "CON TACOS GRATIS",
      "Mi familia y yo estando seguros ",
      "MENOS DELINCUENCIA",
      "REBELDÍA",
      "HERMOSO, INCLUSIVO, REVOLUCIONARIO, EMPÁTICO",
      "EL FUTURO DEL ARTE NO ES LA AI",
      "TRABAJAR EN REDES DE APOYO LOCALES",
      "Llamar a tu abuelita por el teléfono análogo, desde casa",
      "UN FUTURO EN DONDE NO DEBÍA DE TEMER POR MI VIDA POR\n EL HECHO DE SER MUJER",
      "Un futuro verde, con respeto a todas las expresiones\n de vida y una vinculación con lo natural\n en la que el humano\n no es el centro de todo.",
      "Con salud mental",
      "UNA CIUDAD DONDE NO TENGAS QUE RENTAR",
      "Un mundo más limpio y libre de violencia",
      "Usando menos redes sociales y estar bien informado",
      "Saber controlar el tiempo que pasas en el mundo digital",
      "Me imagino un futuro en el que pueda pasar paz con mi\n familia y amigos simplemente disfrutando\n el momento",
      "Sin políticos",
      "Cuestionando todo lo que nos rodea, lo que consumimos, todo lo que vemos",
      "TOMANDO CERVEZA",
      "CON AGUA, SIN HIPERVIGILANCIA",
      "intentando aislar lo cotidiano de lo artificial.",
      "gente conviviendo en comunidad, donde todos se respetan unos a los otros.",
      "El cuerpo de la  mujer no es tuyo",
      "Expresar, a nuestra manera, nuestro sentir y nuestra visión de la realidad.",
      "Gente conviviendo en comunidad, donde todos se respetan unos a los otros.",
      "Yo creo que se necesita tener empatía por todos los capibaras del mundo.",
      "Libre, soberano y alerta",
      "UN MUNDO SIN MACHISMO",
      "Fuera el capitalismo",
      "creo que más allá de buscar terminar los espacios digitales,\n como formas restrictivas, me gustaría\n que hubiera más regulaciones para poder habitarlos de forma amigable y respetuosa",
      "primero tiene que haber un futuro",
      "SIN CONTAMINACIÓN AMBIENTAL",
      "INFORMÁNDONOS SIN BANDERAS O IDEOLOGÍAS, BUSCANDO LA NEUTRALIDAD",
      "CON MUCHA VEGETACIÓN",
      "SOLO VIVIR EL MOMENTO Y DISFRUTA",
      "UN LUGAR EN EL QUE TODOS PUEDAN ESCUCHAR MUSICA",
      "CON AMOR",
      "CULTIVANDO TIERRA Y PASANDOLA CHILL",
      "ME GUSTARÍA QUE EN EL FUTURO TODOS BEBIERAN BUEN CAFÉ ",
      "SIENDO CONSCIENTES DE NUESTROS PENSAMIENTOS\n Y CONDUCTAS, PARA PODER ELEGIR Y NO DEJARTE LLEVAR\n POR LO QUE TE MUESTRAN CONSTANTEMENTE",
      "CON AGUA",
      "FELIZ EN EL MAR",
      "SINTIENDO LA MÚSICA",
      "CARIÑOSO",
      "HORIZONTAL",
      "Con más agua, sin guerras, sin discriminacion laboral",
      "Simple, levantando la voz y ocultando la cara de los opresores",
      "Una VPN",
      "YO ME IMAGINO UN FUTURO EN EL QUE LAS PERSONAS NO VEAN DE MAS POR SUS PROPIOS BIENES",
      "AMABLE, NATURAL, TRANQUILO",
      "ESTUDIANDO, APRENDIENDO Y COMPARTIENDO. ENTENDIÉNDONOS DESDE EL AMOR Y DESDE EL CONTEXTO QUE\n VIVIMOS, NO DESDE EL INDIVIDUALISMO",
      "Las enfermedades pueden curarse y los niños pasan hambre",
      "HAY QUE ABOLIR EL CAPITALISMO",
      "un lugar libre de violencia",
      "UN LUGAR DONDE LAS IDEAS DEJEN DE SER UN A REALIDAD\n LEJANA Y SEA UN DIA A DÍA EN UNA SOCIEDAD\n DONDE LA LOCURA ES LA NUEVA NORMALIDAD",
      "quisiera que mi mundo fuera libre, un lugar donde vivir feliz y sin miedos",
      "Conectando más con la naturaleza y con lo que nos rodea.",
      "Un futuro donde los pobres no tengan que arriesgar\n su vida por un pedazo de pan,\n donde los ricos\n no existan y el pueblo sea uno solo.",
      "fuertes y sanos",
      "SIn preocupaciones",
      "EL FUTURO ES UN TERRITORIO EN DISPUTA QUE SE CUIDA\n DESDE EL PRESENTE",
      "ANONIMATO",
      "ME GUSTARÍA NO ESTAR LLENA DE INSEGURIDADES GENERADAS\n POR LA SOCIEDAD EN LA QUE VIVO",
      "AVISOS DE PRIVACIDAD QUE PROTEJAN LA INFORMACIÓN DE CUALQUIER INCONVENIENTE.",
      "Hay que respetar los pueblos y cuerpos que anteceden nuestra llegada.",
      "pura conciencia de clase y conciencia social",
      "Sin cárceles ni jaulas",
      "ECOCUIDADOS",
      "CUIDAR Y RITUALIZAR LOS PROCESOS DE VIDA-MUERTE-VIDA\n COLECTIVAMENTE. SENTIDOS DE VIDA",
      "VIVIR LIBRE PARA NO SEGUIR LO QUE DICTA LA SOCIEDAD",
      "VIVIR MAS SIN TECNOLOGÍA AYUDA A QUE LA SOCIEDAD SE\n CONOZCA DE MEJOR MANERA Y SIN DISTANCIAS",
      "permacultura, solarpunk, socialista, utopías",
      "sistemas alimentarios soberanos y locales",
      "UN LUGAR SIN LIMITACIONES ECONÓMICAS O SOCIALES",
      "un mundo donde Palestina sea libre",
      "Un mundo donde las personas puedan reconstruirse de\n tal manera que todos podamos\n expresarnos sin ser juzgados",
      "NO ME LO IMAGINO, LO ESTOY VIVIENDO :)",
      "Uno donde la paz sea la ley.",
      "con las emociones bien trabajadas y cuestionando los\n pensamientos. Cultivando\n herramientas para poder controlar nuestras emociones",
      "UN MUNDO DONDE NO EXISTA EL CAPITALISMO",
      "QUISIERA SER POETA",
      "Sin hambruna, espacios incluyentes para animales,\n difusión del arte",
      "EL SABIO DE LA COLONIA GUIA A LOS PUEBLERINOS PARA\n QUE SE COSECHE EL MAÍZ Y SIGA\n PROSPERANDO LA VIDA DE LA COLONIA",
      "MENOS INDUSTRIAS, MÁS NATURALEZA",
      "CON SALUD GRATIS PARA TODOS!!!",
      "un mundo sin que la tecnología nos robe la felicidad",
      "Cuando era muy pequeño, ninguno de los futuros que\n imaginaba era tan perfecto como\n el presente en el que vivo",
      "CAMBIANDO LA HEGEMONÍA QUE SE ESTABLECIÓ BAJO ESTOS\n SISTEMAS OPRESIVOS Y LUCHANDO\n EN COLECTIVIDAD.",
      "humanizando mi existencia",
      "GENERANDO ESPACIOS DIGITALES INFORMADOS Y SEGUROS",
      "desactivando las cookies",
      "manteniendo tu esencia",
      "A MI ME GUSTARÍA QUE EL FUTURO ESTÉ LLENO DE EDUCACION,\n CULTURA Y CONCIENCIA.",
      "DEJANDO A UN LADO LOS CELULARES Y SALIENDO A ANDAR\n EN BICICLETA CON MUSICA FULL",
      "UN FUTURO SIN HOMOFOBIA ",
      "SER LIBRES Y TENER FELICIDAD PLENA PERO DE FORMA\n COLECTIVA",
      "ME IMAGINO UN FUTURO CON INTERNET EN MANOS DEL USUARIO \nY NO DE LAS GRANDES COMPAÑÍAS",
      "Plena automatización y fin del despojo",
      "A través de mecanismos autónomos, independientes\n y prácticas alternativas\n que promuevan la colectividad presencial"
    ]
  }

  let imagePaths = [
    "../assets/lluvia/ComfyUI_(1).png",
    "../assets/lluvia/ComfyUI_(2).png",
    "../assets/lluvia/ComfyUI_(3).png",
    "../assets/lluvia/ComfyUI_(4).png",
    "../assets/lluvia/ComfyUI_(5).png",
    "../assets/lluvia/ComfyUI_(6).png",
    "../assets/lluvia/ComfyUI_(7).png",
    "../assets/lluvia/ComfyUI_(8).png",
    "../assets/lluvia/ComfyUI_(9).png",
    "../assets/lluvia/ComfyUI_(10).png",
    "../assets/lluvia/ComfyUI_(11).png",
    "../assets/lluvia/ComfyUI_(12).png",
    "../assets/lluvia/ComfyUI_(13).png",
    "../assets/lluvia/ComfyUI_(14).png",
    "../assets/lluvia/ComfyUI_(15).png",
    "../assets/lluvia/ComfyUI_(16).png"
];

// #dfe7f3
// #c1d2db
// #d4f7fa
// #bcf8f8
// #86a2bb
// #a1c1e6

function preload() {
    fontComputer = loadFont("https://soyuncitrico.github.io/p5-postales/assets/fonts/pixel-7.ttf")
    typed1 = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/typing.mp3');
    bell = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/bell.mp3');
    returnSound = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/return.mp3');
    rainSound = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/rain.mp3');
    // rainSound = loadSound('../assets/sounds/rain.mp3');
    aguaColores = [
        "#dfe7f3",
        "#c1d2db",
        "#d4f7fa",
        "#bcf8f8",
        "#86a2bb",
        "#a1c1e6",
    ]
    backgroundManager = new BackgroundManager(imagePaths);
}


function setup() {
    cnv = createCanvas(widthCanvas, heightCanvas);
    cnv.parent("canvasContainer");
    imageMode(CENTER);
    textStyle(BOLD);
    textFont("Courier New");
    
    teclado = new Teclado();
    teclado.setSound(typed1, bell);
    // textFont(fontPixel);
    textAlign(LEFT, CENTER);    
    background(0);    
    timeFlag = millis();
    rainSound.loop();   
    cluster = new ClusterPixel(jsonData, aguaColores);
    // inputText = addLetterSpacing(inputText,1)
}

function draw() {    
    // if(!startedAnimation)   {background(0);}
    background(colorSobre);
    backgroundManager.update();
    backgroundManager.drawBackground();
    drawMargin(35, '#071e5c', '#000')
    // background('#09090988');
    push();
    textSize(38);
    stroke(30);
    fill(30);
    // textLeading(10);
    // textFont('Courier New');
    textFont(fontComputer);

    textAlign(CENTER);
    textWrap(WORD)
    
    text(inputText, widthCanvas * 0.1, heightCanvas * 0.15, widthCanvas * 0.8, heightCanvas* 0.1);
    // noFill();
    // rect(widthCanvas * 0.1, heightCanvas * 0.1, widthCanvas * 0.8, heightCanvas * 0.1)
    pop();
    cluster.update();
}


function keyPressed() {
    teclado.selectKey(keyCode, key, 8);
    timeFlag = millis();                                 
}

function addLetterSpacing(input, amount, spacer) {
    // 'spacer' character to use
    // (can be passed in as an optional argument, or it
    // will use the unicode 'hair space' one by default)
    spacerCharacter = '\u200A' || spacer;
    // split the string into a list of characters
    let characters = input.split('');
    // create a series of spacers using the
    // repeat() function
    spacerCharacter = spacerCharacter.repeat(amount);
    // use join() to combine characters with the spacer
    // and send back as a string
    return characters.join(spacerCharacter);
}

const drawMargin = (ancho, color1 = "#000", color2 = "#fff") => {
    push();
    strokeWeight(ancho * 0.75);
    strokeCap(SQUARE)
    stroke(color1)
    let mitadStk = ancho * 0.25;
    line(0,mitadStk, width, mitadStk);
    line(0,height - mitadStk, width, height - mitadStk);
    line(mitadStk, 0, mitadStk, height);
    line(width - mitadStk, 0, width - mitadStk, height);
    
    fill(color2);
    noStroke();
    //   ellipse(ancho, 0, ancho, ancho);
    //   ellipse(ancho * 3, 0, ancho, ancho);
    let limiteAncho = width / (ancho * 2);
    for(let i = 0; i < limiteAncho; i++ ) {   
        ellipse(ancho * (2 * i + 1) - ancho, 0, ancho, ancho);
        ellipse(ancho * (2 * i + 1) - ancho, height, ancho, ancho);
    }
    let limiteAlto = height / (ancho * 2);
    for(let i = 0; i < limiteAlto; i++ ) {   
        ellipse(0, (ancho * (2 * i + 1)) + (ancho), ancho, ancho);
        ellipse(width, (ancho * (2 * i + 1)) + (ancho), ancho, ancho);
    }
    pop();

}