import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';
class Controler{
  private food:Food;
  private scorePanel:ScorePanel;
  private snake:Snake;
  direction = '';
  alive = true;
  constructor(){
    this.food = new Food();
    this.scorePanel = new ScorePanel(10,10);//这里可以传参，本别代表最高等级，和每升一级需要吃的食物数量
    this.snake = new Snake()
    //初始化，游戏开始
    this.init();
  }

  //初始化方法
  init():void{
    document.addEventListener('keydown',this.keydownHandler.bind(this),false);
    this.run()
  }  

  keydownHandler(ev:KeyboardEvent):void{
    //运动方向
    this.direction = ev.key;
  }

  run():void{
    //获取蛇当前坐标
    let X = this.snake.X;
    let Y = this.snake.Y;
    /**
     *      key           方向
     *   'ArrowLeft'       左
     *   'ArrowUp'         上
     *   'ArrowRight'      右
     *   'ArrowDown'       下
     */
    switch (this.direction) {
      case 'ArrowLeft':
        X -= 10 ;
        break;
      case 'ArrowUp':
        Y -= 10 ;
        break;
      case 'ArrowRight':
        X += 10 ;
        break;
      case 'ArrowDown':
        Y += 10 ;
        break;
      default:
        break;
    }

    this.checkEat(X,Y);

    //修改蛇头的X和Y值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      // 将isLive设置为false
      this.alive = false;
      alert(e.message + ' GAME OVER!'); // 进入到catch，说明出现了异常，游戏结束，弹出一个提示信息
    }
    this.alive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level - 1)*30);

  }

  //判断蛇是否吃到食物
  checkEat(X:number,Y:number):void{
    let flag = X === this.food.X && Y === this.food.Y;
    if(flag){
      //分数增加1
      this.scorePanel.addScore();
      //重置食物位置
      this.food.randomFood();
      //蛇身体增加一段
      this.snake.addBody()
    }
  }
}
export default Controler;