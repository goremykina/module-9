// Задание 2.
// Вам дана заготовка и результат, который вы должны получить. 
// Ваша задача — написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль.

const jsonStr = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`
const data = JSON.parse(jsonStr);

data.list.forEach(item => {
  item.age = +item.age;
});

console.log(data)