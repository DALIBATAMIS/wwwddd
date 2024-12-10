"use strict";

const sleep = ms => new Promise(r => setTimeout(r, ms));
const randomcolor = () => Math.floor(Math.random() * 0xFFFFFF);

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
    
        $(".main-box").css({"background-color": "#" + color});
        await sleep(sleep_time);
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

const set_repeating_background = (async () => {
    console.log("REPEATING TEXT BACKGROUND");
    
    Object.entries(document.getElementsByTagName("canvas"))
        .map((x) => {return x[1]}).forEach((x) => {x.remove()});

    const canvas = document.createElement('canvas');
    $(".canvas_div")[0].appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const resize_canvas = (() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        draw_text();
    });

    const draw_text = (() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const texts_to_choose = [
            "INFATUATION; WHO ARE YOU, DOWN THERE?",
            "BEFORE THE SUN.",
            "MIRA, MIRA QUE ESTÁ LOCA LA CHIQUITA.",
            "I AM YOUR DRAG MOTHER.",
            "DZIRS FASHISTI MTAVROBA; SOLIDAROBA QUEAREBS!",
            "SAY NO TO THE RUSSIAN LAW!",
            "MY NAME IS LILAC HEAVEN."
        ];
    
        const index = Math.floor(Math.random() * texts_to_choose.length);
        const text = texts_to_choose[index] + "  ";

        const fontsize = 30;
        ctx.font = fontsize + "px Bebas Neue ";

        ctx.fillStyle = `rgba(0, 0, 0, 0.25)`;
        ctx.textBaseline = "top";

        const text_width = ctx.measureText(text).width;
        const text_height = fontsize;

        for (let y = 0; y < canvas.height; y += text_height) {
            for (let x = 0; x < canvas.width; x += text_width) {
                ctx.fillText(text, x, y);
            }
        }
    });

    $(window).on('resize', resize_canvas);
    resize_canvas();
})

const load_webpage = (async () => {
    await set_repeating_background();
    await random_color_flash(7, 0);

    $(".main-box-text").removeClass("hidden");

    random_flash_forever();
    random_scale_forever();
    // $(".main-box").css({"background-color": "cornsilk"});
});

$(document).ready(() => {
    $(".flash-warning").click(flash_warning_bound);
});