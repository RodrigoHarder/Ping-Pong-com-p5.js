//Sons do jogo
let raquetada;
let somPonto;
let trilha;

function preload(){
  raquetada = loadSound("raquetada.mp3");
  somPonto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//variáveis da bolinha:
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

function mostraBolinha(){
   circle (xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;

}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

function verificaBordas(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
    
  if (yBolinha + raio> height || yBolinha - raio < 0){ 
  velocidadeYBolinha *= -1;
 }
}

//Variáveis da minha raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90

//Variáveis raquete do oponente
let xOponente = 585;
let yOponente = 150;
let velocidadeYOponente = 6;

let colidiu = false;

function mostraRaquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaRaquete(){
  if( keyIsDown(87)){
    yRaquete -= 10
  }
  
  if( keyIsDown(83)){
    yRaquete += 10
  }
}

function movimentaOponente(){
  //velocidadeYOponente = yBolinha - yOponente - comprimentoRaquete/2 - 40;
  //yOponente += velocidadeYOponente;
  if( keyIsDown(UP_ARROW)){
    yOponente -= 10
  }
  
  if( keyIsDown(DOWN_ARROW)){
    yOponente += 10
  }
}

let chanceDeErrar = 0;

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yOponente - comprimentoRaquete / 2 - 30;
  yOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

function colisaoBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

function incluiPlacar(){
  textSize(16);
  textAlign(CENTER)
  fill(color(128,0,128));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos,170, 26);
  fill(color(128,0,128));
  rect(450,10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos +=1;
    somPonto.play();
  }
  if(xBolinha <10){
    pontosOponente +=1;
    somPonto.play();
  }
}

function draw() {
  
  background(0);
  
  mostraBolinha();
  movimentaBolinha();
  verificaBordas();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xOponente, yOponente);
  movimentaRaquete();
  //movimentaOponente();
  //verificaColisaoRaquete();
  colisaoBiblioteca(xRaquete, yRaquete);
  colisaoBiblioteca (xOponente, yOponente)
  incluiPlacar();
  marcaPonto();
  movimentaRaqueteOponente();
  bolinhaNaoFicaPresa();
}
