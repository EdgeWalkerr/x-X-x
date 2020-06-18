class lazyMan {
  private taskList: (() => void)[] = [];
  constructor(public name: string) {
    console.log(`Hi, I am ${this.name}`);
    setTimeout(this.next.bind(this), 0);
  }
  eat(meal: string) {
    const context = this;
    const fn = function () {
      console.log(`I am eating ${meal}`);
      context.next();
    };
    this.taskList.push(fn);
    return this;
  }
  sleepFirst(time: number) {
    const context = this;
    const fn = function () {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        context.next();
      }, time * 1000);
    };
    this.taskList.unshift(fn);
    return this;
  }
  sleep(time: number) {
    const context = this;
    const fn = function () {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        context.next();
      });
    };
    this.taskList.push(fn);
    return this;
  }
  private next() {
    const fn = this.taskList.shift();
    fn && fn();
  }
}

const man = new lazyMan('lazyMan');
man.eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
