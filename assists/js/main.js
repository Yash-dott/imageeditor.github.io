let choose_type_btn = document.getElementById("btnfilechoose")
let choose_type_input = document.getElementById("inputfilechoose")
let preview_img = document.getElementById("preview_image")
let rotate = 0;
let horizontal = 1,vartical = 1;
let brightness = 100,saturation = 100,Blur = 0,grayscale = 0;

apply_filter = () => {
    preview_img.style.transform = `rotate(${rotate}deg) scale(${horizontal},${vartical}) `
    preview_img.style.filter = `brightness(${brightness}%) saturate(${saturation}%) blur(${Blur}px) grayscale(${grayscale}%)`
}
// handle_choose_button
choose_type_btn.addEventListener("click", () => {
    choose_type_input.click()
});

// create URL AND CHANGE IMAGE
choose_type_input.addEventListener("change", () => {
    let fake_url = choose_type_input.files[0]
    let create_url = URL.createObjectURL(fake_url)
    preview_img.setAttribute("src", create_url)
})

// change_filter_name and handle progressbar and percentage
let filter_button = document.querySelectorAll(".filterbutton")
let filter_name = document.querySelector(".filter_name")

filter_button.forEach((filter_buttons) => {
    filter_buttons.addEventListener("click", () => {

        filter_name.innerHTML = `${filter_buttons.value}`
        
        if (filter_name.innerHTML === "Brightness") {
            input_progress.value = brightness
            percentage.innerHTML = `${brightness}%`
        } else if (filter_name.innerHTML === "Saturation") {
            input_progress.value = saturation
            percentage.innerHTML = `${saturation}%`
        } else if (filter_name.innerHTML === "Blur") {
            input_progress.value = Blur
            percentage.innerHTML = `${Blur}%`
        } else {
            input_progress.value = grayscale
            percentage.innerHTML = `${grayscale}%`
        }

    })
})




// handle progressbar value and filters value
let input_progress = document.getElementById("progress")
let percentage = document.querySelector(".percentage")

handlefilter = () => {
    percentage.innerHTML = `${input_progress.value}%`
    input_progress.attributes[4].value = `${"200"}`

    if (filter_name.innerHTML === "Brightness") {
        brightness = input_progress.value

    } else if (filter_name.innerHTML === "Saturation") {
        saturation = input_progress.value

    } else if (filter_name.innerHTML === "Blur") {
        input_progress.attributes[4].value = `${"10"}`
        Blur = input_progress.value
    } else {
        input_progress.attributes[4].value = `${"100"}`
        grayscale = input_progress.value
    }
    apply_filter()
}

// input_progress.oninput = () => {
//     handlefilter()
// }
input_progress.addEventListener("input",()=>{
    handlefilter()
    console.log("ok")
})

// additional btns
let adj_btn = document.querySelectorAll(".adj_btn")
adj_btn.forEach((element) => {
    element.addEventListener("click", () => {
        if (element.id === "rotate_anti") {
            rotate -= 90
        } else if (element.id === "rotate_clock") {
            rotate += 90
        } else if (element.id === "flip_x") {
            horizontal = horizontal === 1 ? -1 : 1
        } else {
            vartical = vartical === 1 ? -1 : 1
        }
        apply_filter();
    })
})


// reset_filters
let reset_filters = document.getElementById("reset")

reset_filters.addEventListener("click", () => {
    rotate = 0;
    horizontal = 1,vartical = 1;
    brightness = 100,saturation = 100,Blur = 0,grayscale = 0;
    apply_filter();
})


// download image
let download_image = document.getElementById("download_image")
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

download_image.addEventListener("click",()=>{
    canvas.width = canvas.offsetWidth
    canvas.Height = canvas.offsetHeight
    ctx.drawImage(preview_img, 0,0)

    let anchor = document.createElement("a")
    anchor.setAttribute("download","text.jpg")
    anchor.href = `${canvas.toDataURL()}`
    anchor.click()
})