export const scroll = (destination, duration) => {
    const target = document.querySelector(destination);
    console.log(target);
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if(timeElapsed < duration) requestAnimationFrame(animation);
    }

    const ease = (t, b, c, d) => {
        t /= d;
        return -c * t * (t - 2) + b;
    }

    requestAnimationFrame(animation);
};

export const test = () => {
    console.log('Test works');
};



//document.querySelector('.link1').addEventListener('click', scroll('.link2', 1000));
//scroll('.link1', 1000);

//document.querySelector('.link1').addEventListener('click', ()=> {
//    scroll('.link2', 1000);
//});
//
//document.querySelector('.link2').addEventListener('click', ()=> {
//    scroll('.link1', 1000);
//});
