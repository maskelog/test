// switch(평가){
//     case A :
//     case B :
// }

// if(평가 == A){

// }
// else if(평가 == B){

// }

// swith

// let fruit = prompt('무슨 과일을 사고 싶나요?')

// switch(fruit){
// case '사과' :
//     console.log('100원입니다');
//     break
// case '바나나' :
//     console.log('200원입니다');
//     break
// case '키위' :
//     console.log('300원입니다');
//     break

// case '멜론' :
// case '수박' :
//     console.log('500원입니다');
//     break
// // else
// default :
// console.log('그런 과일은 없습니다')
// }

// 함수(function)

// function showError(){
// alert('에러가 발생했습니다. 다시 시도해주세요.')
// }
    
// showError();
    
// 매개변수가 있는 함수
// let msg = `Hello`;
// function sayHello(name){
//     let msg = `Hello`;
//     if(name) {
//         msg = `Hello, ${name}`
//     }
//     console.log(msg);
// }

// sayHello()
// sayHello('Mike')
// sayHello('Tom')
// sayHello('Jane')
// sayHello('Mike')

// 함수 선언문 vs 함수 표현식
// function sayHello(){
//     console.log('Hello')
// }

// function sayHello

// Object -  단축 프로퍼티
const superman = {
    nmae : 'clark',
    age : 30
}

// function makeObject(name, age){
//     return{
//         name,
//         age,
//         hobby : 'football'
//     }
// }

// const Mike = makeObject('Mike', 30)
// console.log(Mike)

function isAdult(user) {
    if(user.age < 20){
        return false;
    } else {
        return true
    }
}

// 생성자 함수 : 상품 객체를 생성해보자

function Item(title, price){
    this.title = title;
    this.price = price;
    this.showPrice = function(){
        console.log(`가격은 ${price}원 입니다.`)
    }

}

const item1 = new Item('인형', 3000);
const item2 = new Item('치킨', 9000);
const item3 = new Item('가방', 10000);

console.log(item1, item2, item3)

item3.showPrice();