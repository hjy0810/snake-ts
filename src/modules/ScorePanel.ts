class ScorePanel{
  score = 0;
  level = 1;
  maxLevel:number;
  scoreEveryLevel:number;
  private scoreElement:HTMLElement;
  private levelElement:HTMLElement;
  constructor(maxLeval:number = 10,scoreEveryLevel:number = 10){
    this.scoreElement = document.getElementsByClassName('score')[0] as HTMLElement;
    this.levelElement = document.getElementsByClassName('level')[0] as HTMLElement;
    this.maxLevel = maxLeval;
    this.scoreEveryLevel = scoreEveryLevel;
  }

  //增加分数
  addScore():void{
    this.score += 1;
    this.scoreElement.innerHTML = this.score + '';
    if(this.score % this.scoreEveryLevel === 0){
      this.addLevel();
    }
  }

  //提升等级
  addLevel():void{
    if(this.level < this.maxLevel){
      this.level += 1;
      this.levelElement.innerHTML = this.level + '';
    }
  }

}

export default ScorePanel;