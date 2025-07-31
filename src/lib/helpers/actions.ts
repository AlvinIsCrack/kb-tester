import type { Action } from "svelte/action";

export const clickOutside: Action<HTMLDivElement, { callbackFunction: (() => any) | undefined }> = (element, parameter) => {
    let callbackFunction = parameter?.callbackFunction;
    let timeoutId: ReturnType<typeof setTimeout>; // Para almacenar el ID del timeout

    function onClick(event: MouseEvent) {
        if (!element.contains(event.target as any) && callbackFunction)
            callbackFunction();
    }

    // Añade el listener con un retraso de 200ms
    timeoutId = setTimeout(() => {
        document.body.addEventListener('click', onClick);
    }, 200);

    return {
        update(newParameter: { callbackFunction: (() => any) | undefined }) {
            callbackFunction = newParameter?.callbackFunction;
        },
        destroy() {
            clearTimeout(timeoutId); // Limpia el timeout si el componente se destruye antes de que se active
            document.body.removeEventListener('click', onClick);
        }
    }
}