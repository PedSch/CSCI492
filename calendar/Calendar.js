const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const selectYear = document.getElementById("year");
const  selectMonth = document.getElementById("months");

const renderCalendar = () =>
 {
  date.setDate(1);

  const monthDays = document.querySelector(".days");
  
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();
 
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

 // var nextDays = null;
  const nextDays = 7 - lastDayIndex - 1;
  //const nextMonth

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today">${i}</div>`;
      console.log("found current date: " + i );
    } else {
      console.log("adding day: " + i);
      days += `<div>${i}</div>`;
    }
    monthDays.innerHTML = days;
  }

  if(nextDays >= 1)
    {
        for(let j = 1; j <= nextDays; j++){
            days += `<div class="next-date" onclick="selected()">${j}</div>`;
            monthDays.innerHTML=days;
        }
    }
    else
    {
        for(let k = 0; k <= nextDays; k++){
            days += `<div class="invisible"></div>`;
            monthDays.innerHTML=days;
        }
    }
};

document.querySelector(".prev").addEventListener("click", () =>
 {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () =>
 {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();

});
renderCalendar();

const event = new CustomEvent('build', 
{
   detail: elem.dataset.time 
});

function eventHandler(e) 
{
  console.log('The time is: ' + e.detail);
};
