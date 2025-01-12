import flatpickr from "flatpickr";
import iziToast from "izitoast";
const input = document.querySelector('#datetime-picker');
const button = document.querySelector('.button');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      timer.deadline = selectedDates[0];
      console.log(timer.deadline);
      
      if (timer.deadline.getTime() < Date.now()) {
          button.classList.remove("normal-button");
          return iziToast.show({
    title: 'Please choose a date in the future',
    position: 'topCenter',
    color: 'red',
});    
      };
      button.classList.add("normal-button");
      button.addEventListener('click', () => {
          timer.start();
      });
      this.enableTime = false;
  },
};

flatpickr("#datetime-picker", options)




const timer = {
  deadline: null,
  intervalId: null,
  elements: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },

  start() {
    this.intervalId = setInterval(() => {
      const ms = this.deadline - Date.now();

      if (ms <= 0) {
        this.stop();

        return;
      }

      const timeComponents = this.getConvertMs(ms);

      this.elements.days.textContent = this.addLeadingZero(timeComponents.days);
      this.elements.hours.textContent = this.addLeadingZero(timeComponents.hours);
      this.elements.minutes.textContent = this.addLeadingZero(timeComponents.minutes);
      this.elements.seconds.textContent = this.addLeadingZero(timeComponents.seconds);
    }, 1000);
      button.classList.remove("normal-button"); 
       button.addEventListener('click', () => {
          timer.start();
      });
      input.disabled = true;
    },

  stop() {
      clearInterval(this.intervalId);
      input.disabled = false;
  },

  getConvertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
},

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },
};




    // button.removeEventListener('click', start());
