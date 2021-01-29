class Snake{
  element:HTMLElement;
  bodies:HTMLCollection;
  head:HTMLElement;
  constructor(){
    this.element = document.getElementsByClassName('snake')[0] as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');
    this.head = this.bodies[0] as HTMLElement;
  }
  //获取蛇头X坐标
  get X():number{
    return this.head.offsetLeft;
  }

  //获取蛇头Y坐标
  get Y():number{
    return this.head.offsetTop;
  }  

  //蛇身体增加一段
  addBody():void{
    let divElement = document.createElement('div')
    this.element.appendChild(divElement)
  }

  //设置蛇头X坐标
  set X(value){
    // 如果新值和旧值相同，则直接返回不再修改
    if (this.X === value) {
      return;
    }
    //边界检测
    if(value < 0 || value > 290){
      throw new Error('撞墙了～～！')
    }
    //有身体时，左右移动时，向左走时不能掉头向右
    if(this.bodies[1] && value === (this.bodies[1] as HTMLElement).offsetLeft){
      if(value < this.X){
        //向右运动时，按左键，此时不能向左运动，强制向右
        value = this.X + 10;
      }else{
        value = this.X - 10;
      }
    }
    //因为蛇整体从后往前移动，先移动身体，再移动蛇头位置
    this.moveBodies();
    this.head.style.left = value + 'px';
    //蛇头是否碰到身体
    this.checkHeadBodies()
  }

  //设置蛇头Y坐标
  set Y(value){
    // 如果新值和旧值相同，则直接返回不再修改
    if (this.Y === value) {
      return;
    }

    //边界检测
    if(value < 0 || value > 290){
      throw new Error('撞墙了～～！')
    }
    //有身体时，上下移动时，向上走时不能掉头向下
    if(this.bodies[1] && value === (this.bodies[1] as HTMLElement).offsetTop){
      if(value < this.Y){
        //向下运动时，按上键，此时不能向上运动，强制向下
        value = this.Y + 10;
      }else{
        value = this.Y - 10;
      }
    }    

    //先移动身体，再移动蛇头位置
    this.moveBodies();
    this.head.style.top = value + 'px';

    //蛇头是否碰到身体
    this.checkHeadBodies()
  }  

  //移动身体
  moveBodies():void{
    //蛇整体从后往前移动
    for (let i = this.bodies.length - 1; i > 0 ; i--) {
      //获取前一段身体的坐标
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }  
  //蛇头是否碰到身体
  checkHeadBodies(){
    for (let i = 1; i < this.bodies.length; i++) {
      let item = this.bodies[i] as HTMLElement;
      if(item.offsetLeft === this.X && item.offsetTop === this.Y){
        throw new Error('碰到身体了～～！');
      }      
    }
  }
}

export default Snake;