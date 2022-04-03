import { vProps } from "./propsType";
const { vIf, vShow } = vProps;

export function render(vm, propsPool) {
    const $data = vm.$data;
    for (let [node, info] of propsPool) {
        // 完成vshow和vif的功能
        switch (info.type) {
            // 如果 vif 的值是 false
            case vIf:
                // 注释节点
                info.comment = info.comment || document.createComment(vIf);
                !$data[info.prop] && node.parentNode.replaceChild(info.comment, node);
                break;
                // 如果 vshow 的值是 false
            case vShow:
                !$data[info.prop] && (node.style.display = 'none');
                break;
            default:
        }
    }
}

export function updated(vm, key, propsPool) {
    const $data = vm.$data;
    for (let [node, info] of propsPool) {
        // 完成vshow和vif的功能
        if (info.prop === key) {
            switch (info.type) {
                // 如果 vif 的值是 false
                case vIf:
                    // 注释节点
                    !$data[key] ? node.parentNode.replaceChild(info.comment, node) :
                        info.comment.parentNode.replaceChild(node, info.comment);
                    break;
                    // 如果 vshow 的值是 false
                case vShow:
                    !$data[key] ? (node.style.display = 'none') :
                        (node.style.display = '');
                    break;
                default:
            }
        }
    }
}