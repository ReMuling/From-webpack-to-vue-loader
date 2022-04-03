import reactive from "./reactive";
import pools from './pools';
import event from "./event";
import { render } from './render';
export function createApp(component) {
    const vm = {};
    // 取出对应的模块
    const $data = component.data();
    const $template = component.template;
    const $methods = component.methods;
    vm.DOM = createDOM($template);
    const { propsPool, eventPool } = pools(vm.DOM, $methods);

    vm.mount = mount;

    const init = () => {
        reactive(vm, $data, propsPool);
        event(vm, eventPool);
        render(vm, propsPool);
    }
    init();

    return vm;
}

// 创建节点
function createDOM(template) {
    const _c = document.createElement('div');
    // 插入我们处理好的 template
    _c.innerHTML = template;
    // 拿到子节点
    return getFirstElementChild(_c);
}

// 删除最近的一个子节点
function getFirstElementChild(node) {
    const childNodes = node.childNodes;
    let childNode;
    for (let i = 0; i < childNodes.length; i++) {
        childNode = childNodes[i];
        // 判断第一个元素节点
        if (childNode.nodeType === 1) {
            return childNode;
        }

    }
}

function mount(el) {
    document.querySelector(el).appendChild(this.DOM);
}