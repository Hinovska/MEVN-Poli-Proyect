const {Board, Led} = require('johnny-five');

function ModelEngine(){
  let self = this;
  self.myBoard;
  self.myLedFront;
  self.myLedBackward;
  self.myLedLeft;
  self.myLedRight;
  self.currentDir;
  self.direcctions = ['backward', 'front', 'right', 'left'];
  self.myBoard = new Board();
  self.myBoard.on('ready', () =>{
    self.myLedFront = new Led(9);
    self.myLedBackward = new Led(12);
    self.myLedLeft = new Led(11);
    self.myLedRight = new Led(10);
    if (self.fnInit()){
      self.myBoard.repl.inject({
        move: self.fnChangeDirection,
        stop: self.fnStop
      });
    }
  });

  self.myBoard.on('error', (err) => {
    console.log(err);
  });

  self.fnStop = () => {
    let result = {status:'OK',message:'Stoped'};
    self.myLedFront.off();
    self.myLedBackward.off();
    self.myLedLeft.off();
    self.myLedRight.off();
    return result;
  };

  self.fnChangeDirection = (toDirection) => {
    toDirection = toDirection.toLowerCase();
    let result = {status:'OK',message:'Moving to ' + toDirection };
    switch (toDirection) {
      case 'front':
        self.fnStop();
        self.myLedFront.on();
        break;
      case 'backward':
        self.fnStop();
        self.myLedBackward.on();
        break;
      case 'left':
        self.fnStop();
        self.myLedLeft.on();
        break;
      case 'right':
        self.fnStop();
        self.myLedRight.on();
        break;
      case 'stop':
        result =  self.fnStop();
        break;
      default:
        result.status = 'Fail';
        result.message = 'Invalid direcction value';
      break;
    }
    return result;
  };
  self.fnTestMoves = () => {
    console.log('Start Test Engine');
    self.direcctions.map((dir)=>{
      console.log(self.fnChangeDirection(dir));
    });
    console.log(self.fnStop());
    console.log('Finish Test Engine');
    return true;
  };
  self.fnInit = () => {return self.fnTestMoves();};
};

module.exports = new ModelEngine();
