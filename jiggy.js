var jiggy = jiggy || {};

jiggy.GeneratePuzzle = (ctx, pieceSize) =>{

  for(let y = pieceSize; y < ctx.canvas.height; y += pieceSize){
    jiggy.CreateLine([0, y], [ctx.canvas.width, y], pieceSize, ctx);
  }
  for(let x = pieceSize; x< ctx.canvas.width; x += pieceSize){
    jiggy.CreateLine([x, 0], [x, ctx.canvas.height], pieceSize, ctx);
  }
  ctx.beginPath();
  ctx.rect(0,0, ctx.canvas.width, ctx.canvas.height);
  ctx.stroke();

}

Math.randPosNeg = () => {return Math.random() < 0.5 ? -1 : 1}
Math.randRange = (top, bottom) => {return Math.random() * (top - bottom) + bottom; }

jiggy.CreateLine = ([fx,fy], [tx,ty], cellSize, ctx) =>{
  let isHorizontal = fy == ty;
  ctx.beginPath();
  ctx.moveTo(fx, fy);
  
  while(fx < tx || fy < ty){
    let bumpSize = cellSize * Math.randRange(.2, .11);
    let lineLength = cellSize/2 - bumpSize/2;
    fx += lineLength * isHorizontal;
    fy += lineLength * !isHorizontal;

    
    let [mx, my] = [
      -1 * (cellSize/4),
      -1 * (cellSize * Math.randRange(.15, 0) * Math.randPosNeg())
    ];
    if(!isHorizontal)
        [mx, my] = [my, mx];
      
    ctx.quadraticCurveTo(
      fx + mx, //put in middle
      fy + my, //how far away from line
      fx, fy  //end point
    );

    fx += bumpSize/2 * isHorizontal;
    fy += bumpSize/2 * !isHorizontal;

    const posNeg = Math.randPosNeg();
    //both point modifiers  to the left and right of the 
    let [px1, py1, px2, py2] = [
      -1 * bumpSize * 1.5,
      bumpSize * 1.8 * posNeg,
      bumpSize * 1.5,
      bumpSize * 1.8 * posNeg,
    ];

    if(!isHorizontal)
      [px1, py1, px2, py2] = [py1, px1, py2, px2];


    ctx.bezierCurveTo(
        fx + px1, fy + py1, 
        fx + px2, fy + py2,
        fx + (bumpSize/2 * isHorizontal), fy + (bumpSize/2 * !isHorizontal)
    );

    fx += (lineLength + bumpSize/2) * isHorizontal;
    fy += (lineLength + bumpSize/2) * !isHorizontal;


    [mx, my] = [
      -1 * (cellSize/4),
      -1 * (cellSize * Math.randRange(.15, 0) * Math.randPosNeg())
    ];
    if(!isHorizontal)
        [mx, my] = [my, mx];

    ctx.quadraticCurveTo(
      fx + mx, //put in middle
      fy + my, //how far away from line
      fx, fy  //end point
    );
    
    
  }
  ctx.stroke();
  
}