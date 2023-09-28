const user = {
  name : 'Mike',
  age : 33,
}

const result = Object.values(user)
const user2 = Object.assign({},user)
user2.name = "hana"

console.log(result)
console.log(user)
console.log(user2)

let arr = [
  ['mon', '월'],
  ['tue', '화']
]

const result2 = Object.fromEntries(arr);

console.log(result2);