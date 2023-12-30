'use stricts'

const arrowBtn = document.getElementsByClassName('arrow-icon')[0]

const inputDate = document.querySelectorAll('.date')
const inputLabel = document.querySelectorAll('label')
const inputDay = document.getElementsByClassName('birth-day')[0]
const inputMonth = document.getElementsByClassName('birth-month')[0]
const inputYear = document.getElementsByClassName('birth-year')[0]

const ageNumber = document.querySelectorAll('.number')
const ageYear = document.getElementsByClassName('exact-year')[0]
const ageMonth = document.getElementsByClassName('exact-month')[0]
const ageDay = document.getElementsByClassName('exact-day')[0]

const invalidLetter = document.querySelectorAll('p')
const currentDay = new Date().getDate()
const currentMonth = new Date().getMonth() + 1
const currentYear = new Date().getFullYear()

const test = () => {
    for (let i = 0; i < ageNumber.length; i++) {
        ageNumber[i].innerHTML = '--'
    }
}

const invalid = (error) => {
    invalidLetter[error].classList.remove('hidden')
    inputDate[error].style.border = '1px solid hsl(0, 100%, 67%)'
    inputLabel[error].style.color = 'hsl(0, 100%, 67%)'
}

const valid = (v) => {
    invalidLetter[v].classList.add('hidden')
    inputDate[v].style.border = '1px solid hsl(0, 1%, 44%)'
    inputLabel[v].style.color = 'hsl(0, 1%, 44%)'
}
function handler() {
    checkDay(inputDay)
    checkMonth(inputMonth)
    checkYear(inputYear)
}
const checkYear = (year) => {
    year = parseInt(year.value)

    if (year > currentYear) {
        test()
        invalid(2)
        invalidLetter[2].textContent = 'Must be in the past'
    } else if (!year) {
        test()
        invalid(2)
        invalidLetter[2].textContent = 'This field is required'
    } else {
        birthYear = currentYear - year
        ageYear.innerHTML = birthYear
        valid(2)
    }
}
const checkMonth = (month) => {
    month = parseInt(month.value)
    if (month > 12 || month < 0) {
        test()
        invalid(1)
        invalidLetter[1].textContent = 'Must be a valid month'
    } else if (!month) {
        test()
        invalid(1)
        invalidLetter[1].textContent = 'This field is required'
    } else {
        birthMonth = currentMonth - month
        ageMonth.innerHTML = birthMonth
        valid(1)
    }
}

const checkDay = (day) => {
    day = parseInt(day.value)
    let bYear = Number(inputYear.value)
    let bMonth = Number(inputMonth.value)
    let lastDaysInBirthMonth = new Date(bYear, bMonth, 0).getDate()
    if (day < 0 || day > lastDaysInBirthMonth) {
        test()
        invalid(0)
        invalidLetter[0].textContent = 'Must be a valid date'
    } else if (!day) {
        test()
        invalid(0)
        invalidLetter[0].textContent = 'This field is required'
    } else {
        birthDay = currentDay - day
        ageDay.innerHTML = birthDay
        valid(0)
        if (Number(birthDay) < 0) {
            let daysInLastMonth = new Date(
                currentYear,
                currentMonth - 2,
                0
            ).getDate()
            birthDay = daysInLastMonth - day + currentDay
            let month = Number(ageMonth.innerHTML)
            console.log(daysInLastMonth, currentMonth - 2)
            ageDay.innerHTML = birthDay
            month--
            ageMonth.innerHTML = month
            valid(0)
        }
    }
}

arrowBtn.addEventListener('click', handler)