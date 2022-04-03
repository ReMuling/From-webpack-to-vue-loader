import { vProps, vEvents } from './propsType';
export default function(dom, methods) {
    // 使用两个Map结构来管理
    const propsPool = new Map();
    const eventPool = new Map();
    // 取出所有的dom元素
    const allNodes = dom.getElementsByTagName("*");
    // 标识
    const { vIf, vShow } = vProps;
    const { vClick } = vEvents;

    let node = null;
    for (let i = 0; i < allNodes.length; i++) {
        node = allNodes[i];
        // 去找 v-if v-show @click 这些指令
        const vIfVal = node.getAttribute(vIf);
        const vShowVal = node.getAttribute(vShow);
        const vClickVal = node.getAttribute(`@${vClick}`);

        if (vIfVal) {
            propsPool.set(node, {
                type: vIf,
                prop: vIfVal
            });
            // 渲染后的不能还有vIf
            node.removeAttribute(vIf);
        } else if (vShowVal) {
            propsPool.set(node, {
                type: vShow,
                prop: vShowVal
            });
            node.removeAttribute(vShow);
        }
        if (vClickVal) {
            eventPool.set(node, {
                type: vClick,
                handler: methods[vClickVal]
            });
            node.removeAttribute(`@${vClick}`);
        }
    }
    
    return {
        propsPool,
        eventPool
    }
}