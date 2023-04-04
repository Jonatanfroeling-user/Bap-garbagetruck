import React, { useRef, useEffect,useState } from 'react'


function circle(ctx, x, y, r = 20, stroke = "#111", fill="red") {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  if (stroke) {
      ctx.strokeStyle = stroke
      ctx.stroke()
  }
  if (fill) {
      ctx.fillStyle = fill
      ctx.fill();
  }
  ctx.closePath();
}

function clear(ctx, setColor = null) {
  if(setColor) rect(ctx, 0,0,ctx.canvas.width, ctx.canvas.height, setColor)
  else ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}


function rect(ctx, x1, y1, x2, y2, fill) {
  ctx.beginPath();
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y1)
  ctx.lineTo(x2, y2)
  ctx.lineTo(x1, y2)
  ctx.lineTo(x1, y1)
  ctx.fillStyle = fill
  ctx.fill();
  ctx.closePath();
}


const Canvas = ({location}) => {
  const canvasRef = useRef(null)
  const [ctx, setCtx]=useState(null)

  
  useEffect(() => {
    if(!canvasRef.current) return
    console.info('cnv setup')
    const c= canvasRef.current
    c.width = window.outerWidth
    c.height = window.outerHeight
    setCtx(c.getContext('2d'))
  }, [])

  useEffect(()=>{
    if(!ctx)return console.info('no ctx')
    clear(ctx,"#fff1")
    circle(ctx, ...location)
  })
  
  return (
    <canvas ref={canvasRef}/>
  )
}

export default Canvas