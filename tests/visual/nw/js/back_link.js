(() => {
    /**
     * @param parent {HTMLElement}
     * @param toInsert {HTMLElement}
     */
    function insertToFirst(parent, toInsert) {
        if (!(parent instanceof HTMLElement) || !(toInsert instanceof HTMLElement)) {
            return;
        }

        const child = parent.children[0];
        if (child) {
            parent.insertBefore(toInsert, child);
        } else {
            parent.appendChild(toInsert);
        }
    }

    const back = document.createElement("a");
    back.textContent = "< Back";
    back.href = "javascript:;";
    back.addEventListener("click", () => {
        history.back();
    });

    insertToFirst(document.body, back);
})();
