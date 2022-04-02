export function createApp(component) {
    const vm = {};
    vm.mount = mount;
    return vm;
}

function mount(el) {}