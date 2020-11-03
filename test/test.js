class Person {
  constructor(name) {
    this.name = name;
    this.color = ["red", "blue", "green"];
  }
  sayName() {
    console.log(this.name);
  }
}

class Student extends Person {
  constructor(name, score) {
    super(name);
    this.score = score;
  }
  showScore() {
    alert(this.score);
  }
}

let s1 = new Student("s1", 99);
s1.sayName(); // s1
s1.showScore(); // 99
