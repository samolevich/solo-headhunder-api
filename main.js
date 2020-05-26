async function name() {
  let arr = [];
  let iteration;
  await fetch('https://api.hh.ru/vacancies/?per_page=100')
    .then(response => response.json())
    .then(data => iteration = data.pages)
  for (let i = 0; i < iteration; i += 1) {
    await fetch(`https://api.hh.ru/vacancies/?per_page=100&page=${i}`)
      .then(response => response.json())
      .then(data => arr.push(...data.items))
  }
  let newArr = []
  arr.forEach(element => {
    if (element.area.id == 1) newArr.push(element); // отобрали по Москве
  })
  newArr.sort((a, b) => a.published_at < b.published_at ? 1 : -1);
  for (let i = 0; i < newArr.length; i += 1) {
    const element = newArr[i];
    
    let vacancyName = `<h3><a href="${element.alternate_url}" target="_blank">${element.name}</a></h3>`;
    let companyName = `<p><a href="${element.employer.alternate_url}" target="_blank"><strong>${element.employer.name}</strong></a></p>`
    let responsibility = (element.snippet.responsibility === null) ? `` : `<p class="description"><strong>Ответственность:</strong><br>${element.snippet.responsibility}</p>`;
    let requirement = (element.snippet.requirement === null) ? `` : `<p class="description"><strong>Требования:</strong><br>${element.snippet.requirement}</p>`;
    let publicationDate = `Опубликовано: ${element.published_at.slice(0, 4)}.${element.published_at.slice(5, 7)}.${element.published_at.slice(8, 10)} в ${element.published_at.slice(11, 16)}`;
    let vacancyLink = `<p><a class="res" href="${element.apply_alternate_url}" target="_blank"><strong>Откликнуться</strong></a></p>`;
    let contacts = (element.contacts === null || element.contacts.email === null) ? `` : `<p class="contacts">${element.contacts.name} <a href="mailto:${element.contacts.email}">${element.contacts.email}</a></p>`;
    let address = (element.address === null || element.address.raw === null) ? `` : `<p class="address">${element.address.raw}</p>`

    let newDiv = document.createElement('div');
    newDiv.className = 'vacancy';
    newDiv.innerHTML = `
      ${vacancyName}
      ${companyName}
      ${publicationDate}
      ${vacancyLink}
      ${requirement}
      ${responsibility}
      ${contacts}
      ${address}
    `;
    document.getElementById('show').appendChild(newDiv)
  }
}

name()
// console.log(newArr)
// console.log(newArr.length);
    // if (element.employer.url == null) element.employer.url = 'не опубликован';
    // if (element.address.raw == null) element.address.raw = 'не опубликован';
    // if (element.contacts.name == null) element.contacts.name = 'не опубликован';
    // <p>Контакт: ${element.contacts.name}</p>
    // <p>Контакт: ${element.contacts.name} E-mail: </p>
    // <p>Адрес: ${element.address.raw}</p>
