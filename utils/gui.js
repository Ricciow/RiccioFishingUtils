import { playerData } from "../data/data";

export var moveGui = new Gui();

let Moving = '';
let relX = 0;
let relY = 0;

register("scrolled", (x, y, updown) => {
  if (moveGui.isOpen()) {
    Object.keys(playerData.GUI).forEach(element => {
      if(x-playerData.GUI[element][3] < playerData.GUI[element][0] && x > playerData.GUI[element][0]){
        if(y-playerData.GUI[element][4] < playerData.GUI[element][1] && y > playerData.GUI[element][1]){
          if(playerData.GUI[element][2] > 0.15 || updown > 0) {
            playerData.GUI[element][2] = playerData.GUI[element][2] + Math.round(0.1*updown*10)/10;
          }
        }
      }
    });
  }
})

register("guimouseclick", (x, y, button, gui, event) => {
  if (moveGui.isOpen()) {
    Object.keys(playerData.GUI).forEach(element => {
      if(x-playerData.GUI[element][3] < playerData.GUI[element][0] && x > playerData.GUI[element][0]){
        if(y-playerData.GUI[element][4] < playerData.GUI[element][1] && y > playerData.GUI[element][1]){
          Moving = element;
          relX = x-playerData.GUI[element][0];
          relY = y-playerData.GUI[element][1];
          return;
        }
      }
    });
  }
});

register("guimousedrag", (x, y, button, gui, event) => {
    if (moveGui.isOpen()) {
      if (Moving != ''){
        playerData.GUI[Moving][0] = x-relX;
        playerData.GUI[Moving][1] = y-relY;
      }
    }
});

register("guimouserelease", (x, y, button, gui, event) => {
  if (moveGui.isOpen()) {
    if (Moving != ''){
      Moving = '';
      playerData.save();
    }
  }
});

let backgroundCreated = false;
let backgroundKey = '';
export function createText(text, key, defaultX, defaultY, rightOriented = false, BlankText = 'Blank') {
  if (playerData.GUI[key] == undefined){
    playerData.GUI[key] = [defaultX, defaultY, 1];
    playerData.save();
  }
  if (playerData.GUI[key][2] == undefined) {
    playerData.GUI[key][2] = 1;
    playerData.save();
  }
  if (playerData.GUI[key][3] == undefined || playerData.GUI[key][4] == undefined) {
    playerData.GUI[key][3] = 8;
    playerData.GUI[key][4] = 8;
    playerData.save();
  }
  if (moveGui.isOpen()){
    if (!backgroundCreated){
      backgroundCreated = true;
      backgroundKey = key;
    }
    if(backgroundKey == key){
      Renderer.drawRect(Renderer.color(0, 0, 0, 150), 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
      BgText = new Text(`Scroll up or down to resize stuff`, Renderer.screen.getWidth()/2, -50).setShadow(true);
      BgText.draw();
      BgText = new Text(`Scroll up or down to resize stuff`, (Renderer.screen.getWidth()/2)-(BgText.getWidth()/2), Renderer.screen.getHeight()/2).setShadow(true);
      BgText.draw();
    }
    Renderer.drawRect(Renderer.color(255, 255, 255, 50), playerData.GUI[key][0], playerData.GUI[key][1], playerData.GUI[key][3], playerData.GUI[key][4]);
  }
  if (Moving == key){
    new Text(`x:${playerData.GUI[key][0]} y:${playerData.GUI[key][1]}`, playerData.GUI[key][0], playerData.GUI[key][1]-12).setShadow(true).draw();
  }
  if(!rightOriented){
    if(text != ''){
      drawedText = new Text(`${text}`, playerData.GUI[key][0], playerData.GUI[key][1]).setShadow(true).setScale(playerData.GUI[key][2]);
      drawedText.draw();
      playerData.GUI[key][3] = drawedText.getWidth();
      playerData.GUI[key][4] = drawedText.getHeight();
    }
    else if (moveGui.isOpen()) {
      drawedText = new Text(`${BlankText}`, playerData.GUI[key][0], playerData.GUI[key][1]).setShadow(true).setScale(playerData.GUI[key][2]);
      drawedText.draw();
      playerData.GUI[key][3] = drawedText.getWidth();
      playerData.GUI[key][4] = drawedText.getHeight();
    }
  }
  else{
    if(text != ''){
      drawedText = new Text(`${text}`, playerData.GUI[key][0], playerData.GUI[key][1]).setShadow(true).setScale(playerData.GUI[key][2]);
      drawedText.draw();
      playerData.GUI[key][3] = drawedText.getWidth();
      playerData.GUI[key][4] = drawedText.getHeight();
    }
    else if (moveGui.isOpen()) {
      drawedText = new Text(`${BlankText}`, playerData.GUI[key][0], playerData.GUI[key][1]).setShadow(true).setScale(playerData.GUI[key][2]);
      drawedText.draw();
      playerData.GUI[key][3] = drawedText.getWidth();
      playerData.GUI[key][4] = drawedText.getHeight();
    }
  }
}

function createBossBarKeyless(text, hp, maxhp, X, Y, textXOffset, textYoffset, displayHP, displayHpXOffset, displayHpYOffset, length, colorOutline, colorBg, colorHealth, thickness, scale = 1){
  textXOffset = textXOffset*scale;
  displayHpXOffset = displayHpXOffset*scale;
  length = length*scale;
  thickness = thickness*scale;
  barName = new Text(`${text}`, X, Y).setShadow(true).setScale(scale);
  barName.draw();
  barNameWidth = barName.getWidth();
  barHp = new Text(`${displayHP}`, X+textXOffset+displayHpXOffset+length, Y+textYoffset+displayHpYOffset).setShadow(true).setScale(scale);
  barHp.draw()
  barHpWidth = barHp.getWidth();
  Renderer.drawLine(colorOutline, X+textXOffset, Y+textYoffset+thickness/2, X+length+textXOffset, Y+textYoffset+thickness/2, thickness);
  Renderer.drawCircle(colorOutline, X+textXOffset, Y+textYoffset+thickness/2, thickness/2, 18);
  Renderer.drawCircle(colorOutline, X+textXOffset+length, Y+textYoffset+thickness/2, thickness/2, 18);
  thickness2 = thickness - thickness/4;
  Renderer.drawLine(colorBg, X+textXOffset, Y+textYoffset+thickness/2, X+length+textXOffset, Y+textYoffset+thickness/2, thickness2);
  Renderer.drawCircle(colorBg, X+textXOffset, Y+textYoffset+thickness/2, thickness2/2, 18);
  Renderer.drawCircle(colorBg, X+textXOffset+length, Y+textYoffset+thickness/2, thickness2/2, 18);
  lengthHp = Math.ceil(length * hp/maxhp);
  Renderer.drawLine(colorHealth, X+textXOffset, Y+textYoffset+thickness/2, X+lengthHp+textXOffset, Y+textYoffset+thickness/2, thickness2);
  Renderer.drawCircle(colorHealth, X+textXOffset, Y+textYoffset+thickness/2, thickness2/2, 18);
  Renderer.drawCircle(colorHealth, X+textXOffset+lengthHp, Y+textYoffset+thickness/2, thickness2/2, 18);
  return barNameWidth + barHpWidth + length + displayHpXOffset;
}
//           0   1    2       3           4           5             6                 7             8            9           10        11    12  13  14
// Bars = [[text,hp,maxhp,textXOffset,textYOffset,displayHP, displayHpXOffset, displayHpYOffset, colorOutline, colorBg, colorHealth, length, x , y,  z], ...]
let barTotalWidth = 8;
let yPos = 8
export function createBossBars(bars, key, defaultX, defaultY, thickness , length ,division=10){
  if (playerData.GUI[key] == undefined){
    playerData.GUI[key] = [defaultX, defaultY, 1];
    playerData.save()
  }
  if (playerData.GUI[key][2] == undefined) {
    playerData.GUI[key][2] = 1;
    playerData.save();
  }
  if (playerData.GUI[key][3] == undefined || playerData.GUI[key][4] == undefined) {
    playerData.GUI[key][3] = 8;
    playerData.GUI[key][4] = 8;
    playerData.save();
  }
  if (moveGui.isOpen()){
    if (!backgroundCreated){
      backgroundCreated = true;
      backgroundKey = key;
    }
    if(backgroundKey == key){
      Renderer.drawRect(Renderer.color(0, 0, 0, 150), 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
    }
    Renderer.drawRect(Renderer.color(255, 255, 255, 50), playerData.GUI[key][0], playerData.GUI[key][1], playerData.GUI[key][3], playerData.GUI[key][4]);
    if(bars.length == 0){ 
      division = division*playerData.GUI[key][2];
      yPos = 0;
      barTotalWidth = createBossBarKeyless("&c&lPlhlegblast", 500, 500, playerData.GUI[key][0],playerData.GUI[key][1]+yPos, 70, 1, "&c&l500M/500M❤", 5, -1, length-23, Renderer.color(0,0,0,255), Renderer.color(115,33,33,255), Renderer.color(219,0,0,255), thickness, playerData.GUI[key][2]);
      yPos += division;
      createBossBarKeyless("&c&lPlhlegblast", 500, 500, playerData.GUI[key][0],playerData.GUI[key][1]+yPos, 70, 1, "&c&l500M/500M❤", 5, -1, length-23, Renderer.color(0,0,0,255), Renderer.color(115,33,33,255), Renderer.color(219,0,0,255), thickness, playerData.GUI[key][2]);
      yPos += division;
      createBossBarKeyless("&c&lJawbus", 100, 100, playerData.GUI[key][0],playerData.GUI[key][1]+yPos, 47, 1, "&c&l100M/100M❤", 5, -1, length, Renderer.color(0,0,0,255), Renderer.color(115,33,33,255), Renderer.color(219,0,0,255), thickness, playerData.GUI[key][2]);
      yPos += division;
      createBossBarKeyless("&c&lJawbus", 100, 100, playerData.GUI[key][0],playerData.GUI[key][1]+yPos, 47, 1, "&c&l100M/100M❤", 5, -1, length, Renderer.color(0,0,0,255), Renderer.color(115,33,33,255), Renderer.color(219,0,0,255), thickness, playerData.GUI[key][2]);
      yPos += division;
      createBossBarKeyless("&b&lThunder", 35, 35, playerData.GUI[key][0],playerData.GUI[key][1]+yPos, 55, 1, "&b&l35M/35M❤", 5, -1, length+6, Renderer.color(0,0,0,255), Renderer.color(17, 91, 92,255), Renderer.color(32, 229, 232,255), thickness, playerData.GUI[key][2]);
      yPos += division;
      createBossBarKeyless("&b&lThunder", 35, 35, playerData.GUI[key][0],playerData.GUI[key][1]+yPos, 55, 1, "&b&l35M/35M❤", 5, -1, length+6, Renderer.color(0,0,0,255), Renderer.color(17, 91, 92,255), Renderer.color(32, 229, 232,255), thickness, playerData.GUI[key][2]);
      yPos += division;
    }
  }
  if (bars.length > 0){
    yPos = 0;
    bars.forEach(bar => {
      barTotalWidth = createBossBarKeyless(bar[0],bar[1],bar[2],playerData.GUI[key][0],playerData.GUI[key][1]+yPos, bar[3], bar[4], bar[5], bar[6], bar[7], bar[11], bar[8], bar[9], bar[10], thickness, playerData.GUI[key][2]);
      yPos += division*playerData.GUI[key][2];
    });
  }
  playerData.GUI[key][3] = barTotalWidth;
  playerData.GUI[key][4] = yPos;

  if (Moving == key){
    new Text(`x:${playerData.GUI[key][0]} y:${playerData.GUI[key][1]}`, playerData.GUI[key][0], playerData.GUI[key][1]-12).setShadow(true).draw();
  }
}

export function createBossBar(text, hp, maxhp, key, defaultX, defaultY, textXOffset, textYoffset, displayHP, displayHpXOffset, displayHpYOffset, length, colorOutline, colorBg, colorHealth, thickness){
  if (playerData.GUI[key] == undefined){
    playerData.GUI[key] = [defaultX, defaultY];
    playerData.save()
  }
  if (moveGui.isOpen()){
    if (!backgroundCreated){
      backgroundCreated = true;
      backgroundKey = key;
    }
    if(backgroundKey == key){
      Renderer.drawRect(Renderer.color(0, 0, 0, 150), 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
    }
    Renderer.drawRect(Renderer.color(127, 127, 127, 255), playerData.GUI[key][0], playerData.GUI[key][1], 8, 8);
  }
  new Text(`${text}`, playerData.GUI[key][0], playerData.GUI[key][1]).setShadow(true).draw();
  new Text(`${displayHP}`, playerData.GUI[key][0]+textXOffset+displayHpXOffset+length, playerData.GUI[key][1]+textYoffset+displayHpYOffset).setShadow(true).draw();
  Renderer.drawLine(colorOutline, playerData.GUI[key][0]+textXOffset, playerData.GUI[key][1]+textYoffset+thickness/2, playerData.GUI[key][0]+length+textXOffset, playerData.GUI[key][1]+textYoffset+thickness/2, thickness);
  Renderer.drawCircle(colorOutline, playerData.GUI[key][0]+textXOffset, playerData.GUI[key][1]+textYoffset+thickness/2, thickness/2, 18);
  Renderer.drawCircle(colorOutline, playerData.GUI[key][0]+textXOffset+length, playerData.GUI[key][1]+textYoffset+thickness/2, thickness/2, 18);
  thickness2 = thickness - thickness/4;
  Renderer.drawLine(colorBg, playerData.GUI[key][0]+textXOffset, playerData.GUI[key][1]+textYoffset+thickness/2, playerData.GUI[key][0]+length+textXOffset, playerData.GUI[key][1]+textYoffset+thickness/2, thickness2);
  Renderer.drawCircle(colorBg, playerData.GUI[key][0]+textXOffset, playerData.GUI[key][1]+textYoffset+thickness/2, thickness2/2, 18);
  Renderer.drawCircle(colorBg, playerData.GUI[key][0]+textXOffset+length, playerData.GUI[key][1]+textYoffset+thickness/2, thickness2/2, 18);
  lengthHp = Math.ceil(length * hp/maxhp);
  Renderer.drawLine(colorHealth, playerData.GUI[key][0]+textXOffset, playerData.GUI[key][1]+textYoffset+thickness/2, playerData.GUI[key][0]+lengthHp+textXOffset, playerData.GUI[key][1]+textYoffset+thickness/2, thickness2);
  Renderer.drawCircle(colorHealth, playerData.GUI[key][0]+textXOffset, playerData.GUI[key][1]+textYoffset+thickness/2, thickness2/2, 18);
  Renderer.drawCircle(colorHealth, playerData.GUI[key][0]+textXOffset+lengthHp, playerData.GUI[key][1]+textYoffset+thickness/2, thickness2/2, 18);
  if (Moving == key){
    new Text(`x:${playerData.GUI[key][0]} y:${playerData.GUI[key][1]}`, playerData.GUI[key][0], playerData.GUI[key][1]-12).setShadow(true).draw();
  }
}

export function forceBg() {
  Renderer.drawRect(Renderer.color(0, 0, 0, 150), 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
}

register("command", () => {
  moveGui.open();
}).setName("rfumove").setAliases("moverfu");

register("command", () => {
  uiKeys = Object.keys(playerData.GUI);
  y = 0;
  uiKeys.forEach(key => {
    playerData.GUI[key] = [0, y];
    y += 10;
  });
}).setName("rfuuimovetopleft");

register("command", () => {
  uiKeys = Object.keys(playerData.GUI);
  uiKeys.forEach(key => {
    playerData.GUI[key][2] = 1;
  });
}).setName("rfuuiresetsize");

register("renderoverlay", () => {
  if(!playerData.GUI["Toggle"] && moveGui.isOpen()){
    GuiOffText = new Text(`You have your GUI toggled &4OFF`, Renderer.screen.getWidth()/2, -50).setShadow(true);
    GuiOffText.draw();
    GuiOffText = new Text(`You have your GUI toggled &4OFF`, (Renderer.screen.getWidth()/2)-(GuiOffText.getWidth()/2), Renderer.screen.getHeight()/2+10).setShadow(true);
    GuiOffText.draw();
  }
})