const fast_arctan = ((x) => {
    const a = [
        +0.99476675670819900,
        -0.28543851807526100,
        +0.07606299247645105
    ];

    const xx = x * x;
    return ((a[2] * xx + a[1]) * xx + a[0]) * x;
});

let speed_add = 1.0;

const clamp_width_to_speed = ((width) => {
    if (Math.floor(Math.random() * 3) == 0 && speed_add === 1.0) {
        speed_add += 0.75;
    }

    return 4 * (fast_arctan(width / 1920) / (0.5 * Math.PI)) * speed_add;
});

const texts_to_choose = [
    "INFATUATION; WHO ARE YOU, DOWN THERE?",
    "BEFORE THE SUN.",
    "DZIRS FASHISTI MTAVROBA; SOLIDAROBA QUEAREBS!",
    "SAY NO TO THE RUSSIAN LAW!",
];

let time = 0;
let animation_frame_id;

const draw_text = (ctx, possible_texts) => {
    const index = Math.floor(Math.random() * possible_texts.length);
    const text = possible_texts[index] + "  ";

    const speed = clamp_width_to_speed(window.innerWidth) - 0.1;

    const fontsize = "5.5vh";
    const fontheight = 4.5 * window.innerHeight / 100;
    
    ctx.font = fontsize + " Bebas Neue ";
    ctx.fillStyle = `rgba(255, 0, 255, 0.75)`;
    ctx.textBaseline = "top";

    return async function animate_text(canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (document.hidden) {
            animation_frame_id = requestAnimationFrame(() => animate_text(canvas));
            return;
        }
        
        const text_width = ctx.measureText(text).width;
        const text_height = fontheight;

        let offset = (time * speed) % text_width;

        for (let y = 0; y < canvas.height; y += text_height) {
            const direction = (Math.round((y / text_height)) % 4) < 2 ? 1 : -1;
            const ad_offset = offset * direction;

            let i = 0;

            for (let x = -text_width; x < canvas.width + text_width * 15; x += text_width) {
                if (i % 2 == 0) {
                    ctx.fillText(text, x + ad_offset, y);
                    i = 1;
                }

                i += 1;
            }
        }

        time++;
        animation_frame_id = requestAnimationFrame(() => animate_text(canvas));
    };
};

const set_repeating_background = (() => {
    console.log("REPEATING TEXT BACKGROUND");

    const canvases = document.querySelectorAll("canvas");
    const canvas_exists = canvases.length !== 0;

    let canvas;
    if (!canvas_exists) {
        canvas = document.createElement('canvas');
        document.getElementsByClassName("canvas_div")[0].appendChild(canvas);
    } else {
        canvas = canvases[0];
    }

    const ctx = canvas.getContext('2d');

    const resize_canvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if (animation_frame_id) {
            cancelAnimationFrame(animation_frame_id);
        }

        const animation = draw_text(ctx, texts_to_choose);
        animation(canvas);
    };

    document.onresize = resize_canvas;

    resize_canvas();

    return () => {};
})();