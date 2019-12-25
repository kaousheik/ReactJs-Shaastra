class Person {
    constructor (name = 'Anonymous', age = '0'){
        this.name = name;
        this.age = age;

    }
    diplay(){
        return `I am ${this.name} of age ${this.age}`;
    }
}
class Traveller extends Person{
    constructor(name, age, location){
        super(name, age);
        this.location = location;
    }
    Greeting(){
        let greet = super.diplay();
        if(this.location){
            greet += `I am from ${this.location}`;
        }
        return greet;
    }
}
const me = new Traveller ('kaousheik', 18, 'Pondicherry');
console.log(me.Greeting());
const me2 = new Traveller();
console.log(me2.Greeting());