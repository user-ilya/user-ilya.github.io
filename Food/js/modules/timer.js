function timer () {
    const deadline = '2022-09-27';

    function getTimeRemaining(lasttime) {
        const t = Date.parse(lasttime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60)
        return {
            t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function setTimer(selector, lasttime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            isTimer = setInterval(updateTimer, 1000)

        updateTimer()

        function updateTimer() {
            const total = getTimeRemaining(lasttime)


            days.innerHTML = zeroTimer(total.days);
            hours.innerHTML = zeroTimer(total.hours);
            minutes.innerHTML = zeroTimer(total.minutes);
            seconds.innerHTML = zeroTimer(total.seconds);

            if (total.t <= 0) {
                clearInterval(isTimer)
                zeroTimer()
            }
        }
    }

    function zeroTimer(num) {
        if (num < 10) {
            return `0${num}`
        }
        return num
    }
    setTimer('.timer', deadline)
}
module.exports = timer;