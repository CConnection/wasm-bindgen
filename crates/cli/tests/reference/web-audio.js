
let wasm;

/**
*/
export function greet() {
    wasm.greet();
}

async function load(module, imports) {

    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
        return { instance, module };

    } else {
        return instance;
    }
}

export async function fetchWasm(input) {
    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    return input;
}

export async function init(fetchedWasm) {

    const imports = {};

    const { instance, module } = await load(fetchedWasm, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

