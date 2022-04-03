export default function(vm, eventPool) {
    for (var [node, info] of eventPool) {
        // info type hander
        vm[info.handler.name] = info.handler;
        node.addEventListener(info.type, vm[info.handler.name].bind(vm), false);
    }
}