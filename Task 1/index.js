// Задание 1.
// Вам дана заготовка и результат, который вы должны получить. 
// Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

const parser = new DOMParser();
const input = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const xmlDOM = parser.parseFromString(input, "text/xml");
const students = xmlDOM.querySelector('list').children
const result = { list: [] };

for (const student of students) {
  const nameNode = student.querySelector('name');
  const lang = nameNode.getAttribute('lang');
  const firstName = nameNode.querySelector('first').textContent;
  const secondName = nameNode.querySelector('second').textContent;
  const age = +student.querySelector('age').textContent;
  const prof = student.querySelector('prof').textContent;
  
 result.list.push({
    lang,
    name: `${firstName} ${secondName}`,
    age,
    prof
  });
}

console.log(result);
