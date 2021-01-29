class Food {
  private element: HTMLElement;
  constructor(){
    this.element = document.getElementsByClassName('food')[0] as HTMLElement;
  }
  get X():number{
    return this.element.offsetLeft;
  }

  get Y():number{
    return this.element.offsetTop;
  }
  //随机生成食物坐标
  randomFood():void{
    let X = Math.floor(Math.random() * 29) * 10;
    let Y = Math.floor(Math.random() * 29) * 10;
    this.element.style.left = X + 'px';
    this.element.style.top = Y + 'px';
  }
}

export default Food;