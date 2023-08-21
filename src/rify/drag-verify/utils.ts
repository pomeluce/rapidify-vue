import { RifyDragVerifyOptions } from './interface';

/**
 * 绘制图片
 * @param puzzle 拼图 canvas
 * @param bgCvs 背景 canvas
 */
const drawImage = (puzzle: HTMLCanvasElement, bgCvs: HTMLCanvasElement, options: RifyDragVerifyOptions) => {
  // 结构 options 数据
  const { startX, startY, length, radius, width, height, src } = options;

  const img: HTMLImageElement = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = src;

  // 恢复 canvas 尺寸
  puzzle.width = width;

  // 获取 canvas context
  const ctx = bgCvs.getContext('2d') as CanvasRenderingContext2D;
  const puzzleCtx = puzzle.getContext('2d') as CanvasRenderingContext2D;

  img.onload = () => {
    ctx.drawImage(img, 0, 0, width, height);
    puzzleCtx.drawImage(img, 0, 0, width, height);

    const len = length + radius * 2 + 2;
    // 获取拼图图片数据
    const imageData = puzzleCtx.getImageData(startX - 1, startY - radius * 2 - 1, len, len);
    puzzle.width = len;
    puzzleCtx.putImageData(imageData, 0, startY - radius * 2 - 1);
  };
};

/**
 * 绘制路径
 * @param ctx canvas context
 * @param options 绘制路径的参数
 * @param isClip 是否裁剪
 */
const drawPath = (ctx: CanvasRenderingContext2D, options: RifyDragVerifyOptions, isClip: boolean = false) => {
  const { startX, startY, length, radius } = options;
  // 圆形便宜比例
  const offset = length / 6.4;
  // 开始绘制
  ctx.beginPath();
  // 绘制起点
  ctx.moveTo(startX, startY);
  ctx.arc(startX + length / 2, startY - offset, radius, 0.72 * Math.PI, 2.26 * Math.PI);
  ctx.lineTo(startX + length, startY);
  ctx.arc(startX + length + offset, startY + length / 2, radius, 1.2 * Math.PI, 2.78 * Math.PI);
  ctx.lineTo(startX + length, startY + length);
  ctx.lineTo(startX, startY + length);
  ctx.arc(startX + offset, startY + length / 2, radius, 2.78 * Math.PI, 1.2 * Math.PI, true);
  // 绘制结束
  ctx.closePath();
  // 设置路径宽度
  ctx.lineWidth = 1;
  // 填充颜色
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  // 设置路径颜色
  ctx.strokeStyle = '#fff';
  // 描边
  ctx.stroke();
  // 叠在原图上方
  ctx.globalCompositeOperation = 'destination-over';
  // 填充或是裁剪
  isClip ? ctx.clip() : ctx.fill();
};

export { drawImage, drawPath };
