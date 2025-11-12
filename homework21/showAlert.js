/**
 * Отображает Bootstrap Alert с заданным текстом, типом (классом) и иконкой.
 * NOTE: Требует наличия элемента <div id="appAlert"> в HTML и SVG-спрайта Bootstrap Icons.
 * * @param {string} message - Текст сообщения.
 * @param {string} type - Класс Bootstrap alert (success, warning, danger, info).
 * @param {string} iconHref - Идентификатор иконки SVG (например, '#check-circle-fill').
 */
export function showAlert(message, type, iconHref) {
    const $alert = $("#appAlert");
    const $alertText = $("#alertText");
    const $alertIcon = $("#alertIcon");

    $alert.removeClass("alert-success alert-warning alert-danger alert-info").addClass(`alert-${type}`);
    
    $alertText.text(message);
    $alertIcon.attr("xlink:href", iconHref);

    $alert.removeClass('d-none').hide().fadeIn(400);

    clearTimeout($alert.data('timer')); 
    const timer = setTimeout(() => {
        $alert.fadeOut(500, function() {
            $(this).addClass('d-none'); 
        });
    }, 3000);
    $alert.data('timer', timer); 
}

