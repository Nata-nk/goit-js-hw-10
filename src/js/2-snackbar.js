import iziToast from "izitoast";

const form = document.querySelector('.form');
const input = document.querySelector('.input-delay');
let delay = 0;

const onChange = event => {
    delay = event.target.value;    

}

const onFormSubmit = event => {
         event.preventDefault();
    const selected = document.querySelector('input[name="state"]:checked');
    
const makeGreeting = event => {
	return new Promise((resolve, reject) => {
        setTimeout(() => {
            const selected = document.querySelector('input[name="state"]:checked');
            let ful = selected.value;
				if(ful === 'fulfilled') {
                    resolve(delay);
				} else {
                    reject(delay);
				}
			}, delay);
    });
};

    makeGreeting()
        .finally(fin =>
            form.reset()
        )
        .then(greeting => iziToast.show({
            title: 'OK',
            message: `Fulfilled promise in ${delay}ms`,
            color: '#59a10d',
            theme: 'dark',
            position: 'topRight',
        }))
        .catch(error => iziToast.show({
            title: 'Error',
            message: `Rejected promise in ${delay}ms`,
            color: '#ef4040',
            theme: 'dark',
            position: 'topRight',
        }));

};


input.addEventListener('input', onChange);
form.addEventListener('submit', onFormSubmit)