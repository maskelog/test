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
function sayHello(name){
    let msg = `Hello`;
    if(name) {
        msg = `Hello, ${name}`
    }
    console.log(msg);
}
sayHello()
sayHello('Mike')
sayHello('Tom')
sayHello('Jane')
sayHello('Mike')