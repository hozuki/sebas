(() => {
    const controller = new KeyframesController();

    const ul = $("#items").get(0);

    $("#btn-add").on("click", function () {
        const li = document.createElement("li");
        li.textContent = "Item #" + (ul.children.length + 1);
        ul.append(li);
        controller.addAnimation(li);
    });

    $("#btn-play-all").on("click", () => {
        controller.playAll();
    });

    $("#btn-resume-all").on("click", () => {
        controller.resumeAll();
    });

    $("#btn-pause-all").on("click", () => {
        controller.pauseAll();
    });

    $("#btn-reset-all").on("click", () => {
        controller.resetAll();
    });
})();