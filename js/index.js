"use strict";

const flash_warning_bound = (async () => {
    $(".flash-warning").remove();
    await load_webpage();
});

const random_color_flash = (async (limit, sleep_time) => {
    for (let i = 0; i < limit; i++) {
        if (sleep_time == 0) {
            sleep_time = Math.random() * 150 + 50;
        }
        
        const color = randomcolor().toString(16);
        
        $(".lambda").addClass("red-lambda");
        $(".main-box").css({"background-color": "#" + color});
        await sleep(sleep_time);
        $(".lambda").removeClass("red-lambda");
    }
    
    $(".main-box").css({"background-color": "red"});
});

const random_flash_forever = (async () => {
    console.log('RANDOM_FLASH_FOREVER');
    await random_color_flash(Math.random() * 5 + 3, Math.random() * 125 + 60);
    await sleep(Math.random() * 2000 + 1000);
    random_flash_forever();
});

const random_scale_forever = (async () => {
    console.log('RANDOM_SCALE_FOREVER');

    const random_duration = Math.random() * 2;
    $(".lambda_over").addClass("lambda_scale");
    await sleep(Math.random() * 1000 + 1000);
    $(".lambda_over").removeClass("lambda_scale");

    await sleep(Math.random() * 3000 + 2000);
    
    set_repeating_background();
    random_scale_forever();
})

const load_webpage = (async () => {
    await set_repeating_background();
    await random_color_flash(7, 0);

    $(".main-box-text").removeClass("hidden");

    random_flash_forever();
    random_scale_forever();
});

$(document).ready(() => {
    $(".flash-warning").click(flash_warning_bound);
});