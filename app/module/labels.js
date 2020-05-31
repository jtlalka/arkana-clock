import * as cache from "../../common/cache";
import * as colors from "../../common/colors";

export function render(key, labels) {
    cache.runOnUpdate(key, colors.foregroundColor, function () {
        updateLabelColor(labels);
    });
}

function updateLabelColor(labels) {
    for (let i = 0; i < labels.length; i++) {
        labels[i].style.fill = colors.foregroundColor;
    }
}
