"use strict";

const gebcn = ((str) => {return document.getElementsByClassName(str);});

const flash_warning_bound = (async () => {
    gebcn("flash-warning")[0].remove();
    await load_webpage();
});

const random_color_flash = (async (limit, sleep_time) => {
    const main_box = gebcn("main-box")[0];
    const lambda = gebcn("lambda")[0];
    
    for (let i = 0; i < limit; i++) {
        if (sleep_time == 0)
            sleep_time = Math.random() * 150 + 50;
        
        const color = randomcolor().toString(16);
        
        lambda.classList.add("red-lambda");
        main_box.style.backgroundColor = "#" + color;
        await sleep(sleep_time);
        lambda.classList.remove("red-lambda");
    }
    
    main_box.style.backgroundColor = "red";
});

const random_flash_forever = (async () => {
    console.log('RANDOM_FLASH_FOREVER');

    await random_color_flash(Math.random() * 5 + 3, Math.random() * 125 + 60);
    await sleep(Math.random() * 2000 + 1000);
    random_flash_forever();
});

const random_scale_forever = (async () => {
    console.log('RANDOM_SCALE_FOREVER');

    const lambda_over = gebcn("lambda")[0];

    lambda_over.classList.add("lambda_scale");
    await sleep(Math.random() * 1000 + 1000);
    lambda_over.classList.remove("lambda_scale");

    await sleep(Math.random() * 3000 + 2000);
    
    set_repeating_background();
    random_scale_forever();
})

const load_webpage = (async () => {
    await set_repeating_background();
    await random_color_flash(7, 0);

    gebcn("main-box-text")[0].classList.remove("hidden");

    random_flash_forever();
    random_scale_forever();
});

const socials_bound = ((b) => {
    gebcn("name")[0].classList.add("hidden");
    gebcn("projects")[0].classList.add("hidden");
    gebcn("socials")[0].classList.remove("hidden");

    gebcn("socials-button")[0].classList.add("back");
    gebcn("projects-button")[0].classList.remove("back");

    console.log("SOCIALS HIT");
});

const projects_bound = ((b) => {
    gebcn("name")[0].classList.add("hidden");
    gebcn("projects")[0].classList.remove("hidden");
    gebcn("socials")[0].classList.add("hidden");

    gebcn("socials-button")[0].classList.remove("back");
    gebcn("projects-button")[0].classList.add("back");

    console.log("PROJECTS HIT");
});

const back_to_index_bound = ((b) => {
    gebcn("socials")[0].classList.add("hidden");
    gebcn("projects")[0].classList.add("hidden");
    gebcn("name")[0].classList.remove("hidden");

    gebcn("socials-button")[0].classList.remove("back");
    gebcn("projects-button")[0].classList.remove("back");
    gebcn("socials-button")[0].classList.remove("hidden");
    gebcn("projects-button")[0].classList.remove("hidden");
});

const button_click = ((b) => {
    const classes = b.currentTarget.classList;

    console.log(classes);

    const is_back = classes.contains("back")
    if (is_back)
        return back_to_index_bound(b);

    const is_socials = classes.contains("socials-button");

    if (is_socials)
        return socials_bound(b);

    const is_projects = classes.contains("projects-button");

    if (is_projects)
        return projects_bound(b);

    console.log(classes)

    alert('unreachable');
    throw new Error("UNREACHABLE");
});

window.onload = (() => {
    gebcn("flash-warning")[0].onclick = flash_warning_bound;
    
    let _k, button;
    for ([_k, button] of Object.entries(gebcn("button"))) {
        if (button === undefined) continue;

        console.log(button);
        button.onclick = button_click;
    }
});