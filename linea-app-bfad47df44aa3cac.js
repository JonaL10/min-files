import { activity_vcalendar } from './snippets/linea-elements-1c624b792f2910af/src/v-calendar.js';
import { renderMap as renderMap2, searchSetup as searchSetup2, setPrecisionPin as setPrecisionPin2, initializePrecisionPin, getPlaceInfoFromCoordinates as getPlaceInfoFromCoordinates2 } from './snippets/linea-map-52071b54828ff404/src/google-maps-favorites.js';
import { renderMap, getRouteDistanceAndTime, getRouteTravelTimeWithCallback, getPlaceInfoFromCoordinates, searchSetup, updateRoute, updatePassengerMarkerPosition, updateDriverMarkerPosition, setPrecisionPin, setMapBounds, showPickupPointCircle, setPinPointMarker, setPickupPointMarker, setDestinationPointMarker } from './snippets/linea-map-52071b54828ff404/src/google-maps.js';
import { serUrl, getStaticMapImageUrlWithRoute, getStaticMapImageUrlWithMarker } from './snippets/linea-map-52071b54828ff404/src/static-map.js';
import { initCropper, expectFileFromImage, convertImgBase64toBytes, getPhotoBytes, verifyPermissionCamera, startVideoCameraPC, getBase64ImgString } from './snippets/linea-storage-fb8deae9e56aaa47/src/imageCropper.js';
import { getUtcDateWithTime, selectPhoneField, getPhoneNumberValidation, appCheckTokenReq, sendEventoToGa, requestPermissionAndCall, getNetworkStatus } from './snippets/linea-utils-2a5fdc802d978ef8/src/functions.js';
import * as __wbg_star0 from './snippets/linea-map-52071b54828ff404/src/google-maps-favorites.js';
import * as __wbg_star1 from './snippets/linea-map-52071b54828ff404/src/google-maps.js';
import * as __wbg_star2 from './snippets/linea-storage-fb8deae9e56aaa47/src/imageCropper.js';
import * as __wbg_star3 from './snippets/linea-utils-2a5fdc802d978ef8/src/functions.js';

let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_30(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures__invoke0_mut__h7877816f5aa98733(arg0, arg1);
}

function makeClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        try {
            return f(state.a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
                state.a = 0;

            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_33(arg0, arg1, arg2) {
    const ptr0 = passStringToWasm0(arg2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.wasm_bindgen__convert__closures__invoke1__hadea319c177507a9(arg0, arg1, ptr0, len0);
}

function __wbg_adapter_36(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures__invoke1__h085cdcd362ca3fc2(arg0, arg1, addHeapObject(arg2));
}

let stack_pointer = 128;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
function __wbg_adapter_39(arg0, arg1, arg2) {
    try {
        wasm.wasm_bindgen__convert__closures__invoke1_mut_ref__h80be70aa6f237c45(arg0, arg1, addBorrowedObject(arg2));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

function __wbg_adapter_42(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures__invoke1_mut__h05f56556ee1d0105(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_47(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures__invoke1__he83bd88c7e93c6c3(arg0, arg1, arg2);
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64Memory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
function __wbg_adapter_50(arg0, arg1, arg2) {
    const ptr0 = passArrayF64ToWasm0(arg2, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.wasm_bindgen__convert__closures__invoke1__h9065908d6f9a451b(arg0, arg1, ptr0, len0);
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
function __wbg_adapter_53(arg0, arg1, arg2) {
    const ptr0 = passArrayJsValueToWasm0(arg2, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.wasm_bindgen__convert__closures__invoke1__h21aacb05c20d895d(arg0, arg1, ptr0, len0);
}

function __wbg_adapter_56(arg0, arg1) {
    wasm._dyn_core__ops__function__Fn_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h2b089d4aca4f0e96(arg0, arg1);
}

function __wbg_adapter_69(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures__invoke1__h65299b05eda2f8d9(arg0, arg1, arg2);
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
function __wbg_adapter_74(arg0, arg1, arg2) {
    const ptr0 = passArray8ToWasm0(arg2, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.wasm_bindgen__convert__closures__invoke1__h97709e3c6089cf17(arg0, arg1, ptr0, len0);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getUint32Memory0();
    const slice = mem.subarray(ptr / 4, ptr / 4 + len);
    const result = [];
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_serUrl_f24c3aa5387aaa87 = function(arg0) {
        serUrl(getObject(arg0));
    };
    imports.wbg.__wbg_location_56243dba507f472d = function(arg0) {
        const ret = getObject(arg0).location;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_pathname_c8fd5c498079312d = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg1).pathname;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    }, arguments) };
    imports.wbg.__wbg_search_6c3c472e076ee010 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg1).search;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    }, arguments) };
    imports.wbg.__wbg_setid_1984ee27e5075311 = function(arg0, arg1, arg2) {
        getObject(arg0).id = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_getNetworkStatus_ebbfd58dcdc66c99 = function(arg0) {
        const ret = getNetworkStatus();
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_code_81fd1a177cf1dd10 = function(arg0) {
        const ret = getObject(arg0).code;
        return ret;
    };
    imports.wbg.__wbg_coords_5e181bbbf524cdf0 = function(arg0) {
        const ret = getObject(arg0).coords;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_latitude_f2f3b5813477e26d = function(arg0) {
        const ret = getObject(arg0).latitude;
        return ret;
    };
    imports.wbg.__wbg_longitude_44d163082f1abc59 = function(arg0) {
        const ret = getObject(arg0).longitude;
        return ret;
    };
    imports.wbg.__wbg_accuracy_66e9a971279ef83c = function(arg0) {
        const ret = getObject(arg0).accuracy;
        return ret;
    };
    imports.wbg.__wbg_heading_8c5a21c9bf472a43 = function(arg0, arg1) {
        const ret = getObject(arg1).heading;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbg_navigator_7c9103698acde322 = function(arg0) {
        const ret = getObject(arg0).navigator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_clearWatch_bdccaef1f2dce6ef = function(arg0, arg1) {
        getObject(arg0).clearWatch(arg1);
    };
    imports.wbg.__wbg_new_b51585de1b234aff = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_status_ac85a3142a84caa2 = function(arg0) {
        const ret = getObject(arg0).status;
        return ret;
    };
    imports.wbg.__wbg_headers_b70de86b8e989bc0 = function(arg0) {
        const ret = getObject(arg0).headers;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_8125e318e6245eed = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_72e2208bbc0efc61 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_appCheckTokenReq_a2516a84fe352076 = function(arg0, arg1) {
        appCheckTokenReq(getObject(arg0), getObject(arg1));
    };
    imports.wbg.__wbg_head_c810037a6c5e0066 = function(arg0) {
        const ret = getObject(arg0).head;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_getCurrentPosition_01fff76d8a886005 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).getCurrentPosition(getObject(arg1), getObject(arg2), getObject(arg3));
    }, arguments) };
    imports.wbg.__wbg_watchPosition_770c1eba16931ecf = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg0).watchPosition(getObject(arg1), getObject(arg2), getObject(arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getRootNode_a048b91714805811 = function(arg0) {
        const ret = getObject(arg0).getRootNode();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_error_788ae33f81d3b84b = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__wbg_body_674aec4c1c0910cd = function(arg0) {
        const ret = getObject(arg0).body;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_lastChild_0cee692010bac6c2 = function(arg0) {
        const ret = getObject(arg0).lastChild;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_cd59bfc8881f487b = function(arg0) {
        const ret = new Date(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getTimezoneOffset_8aee3445f323973e = function(arg0) {
        const ret = getObject(arg0).getTimezoneOffset();
        return ret;
    };
    imports.wbg.__wbg_new0_c0be7df4b6bd481f = function() {
        const ret = new Date();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getTime_5e2054f832d82ec9 = function(arg0) {
        const ret = getObject(arg0).getTime();
        return ret;
    };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_crypto_c48a774b022d20ac = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_process_298734cf255a885d = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_e2e78e134e3e5d01 = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_1cd7a5d853dbea79 = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbg_require_8f08ceecec0f4fee = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_01734de55d61e11d = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_msCrypto_bcb970640f50a1e8 = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithlength_e5d69174d6984cd7 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_readyState_c641deed994cf1e5 = function(arg0) {
        const ret = getObject(arg0).readyState;
        return ret;
    };
    imports.wbg.__wbg_abort_479df999ce394e9f = function(arg0) {
        getObject(arg0).abort();
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_39ac22089b74fddb = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof ArrayBuffer;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Error_ab19e20608ea43c7 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Error;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_name_8f734cbbd6194153 = function(arg0) {
        const ret = getObject(arg0).name;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_message_48bacc5ea57d74ee = function(arg0) {
        const ret = getObject(arg0).message;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_toString_1c056108b87ba68b = function(arg0) {
        const ret = getObject(arg0).toString();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_localStorage_dbac11bd189e9fa0 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).localStorage;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_clearTimeout_76877dbc010e786d = function(arg0) {
        const ret = clearTimeout(takeObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_clearInterval_bd072ecb096d9775 = function(arg0) {
        const ret = clearInterval(takeObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setTimeout_75cb9b6991a4031d = function() { return handleError(function (arg0, arg1) {
        const ret = setTimeout(getObject(arg0), arg1);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setInterval_edede8e2124cbb00 = function() { return handleError(function (arg0, arg1) {
        const ret = setInterval(getObject(arg0), arg1);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbg_call_cb65541d95d71282 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_next_ddb3312ca1c4e32a = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_done_5c1f01fb660d73b5 = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_1695675138684bd5 = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_97f0c81209c6c35a = function() {
        const ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_97b561fb56f034b5 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_next_526fc47e980da008 = function(arg0) {
        const ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_self_1ff1d729e9aae938 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_5f4faef6c12b79ec = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_1d39714405582d3c = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_651f05c6a0944d1c = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_newnoargs_581967eacc0e2604 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_is_205d914af04a8faa = function(arg0, arg1) {
        const ret = Object.is(getObject(arg0), getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_set_092e06b0f9d71865 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stringify_e25465938f3f611f = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_085ec1f694018c4f = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_5cf90238115182c3 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_keyCode_dfa86be31f5ef90c = function(arg0) {
        const ret = getObject(arg0).keyCode;
        return ret;
    };
    imports.wbg.__wbg_sendEventoToGa_f7bf930257f9e334 = function(arg0, arg1, arg2) {
        sendEventoToGa(getStringFromWasm0(arg0, arg1), getObject(arg2));
    };
    imports.wbg.__wbg_scrollHeight_507b6dce7e24a56d = function(arg0) {
        const ret = getObject(arg0).scrollHeight;
        return ret;
    };
    imports.wbg.__wbg_scrollHeight_b8deee7a26235364 = function(arg0) {
        const ret = getObject(arg0).scrollHeight;
        return ret;
    };
    imports.wbg.__wbg_scrollTop_5011470bb5e739a2 = function(arg0) {
        const ret = getObject(arg0).scrollTop;
        return ret;
    };
    imports.wbg.__wbg_getStaticMapImageUrlWithRoute_f17fe6c1066a7943 = function(arg0, arg1, arg2) {
        getStaticMapImageUrlWithRoute(getObject(arg0), getObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_getFullYear_216d503364102f80 = function(arg0) {
        const ret = getObject(arg0).getFullYear();
        return ret;
    };
    imports.wbg.__wbg_getMonth_21eebdd0ffd80cec = function(arg0) {
        const ret = getObject(arg0).getMonth();
        return ret;
    };
    imports.wbg.__wbg_getDate_36902c0bd04b2cd0 = function(arg0) {
        const ret = getObject(arg0).getDate();
        return ret;
    };
    imports.wbg.__wbg_setclassName_e7c93281fe6d80d6 = function(arg0, arg1, arg2) {
        getObject(arg0).className = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_updatePassengerMarkerPosition_3cc4d016aeb9d4c3 = function(arg0) {
        updatePassengerMarkerPosition(getObject(arg0));
    };
    imports.wbg.__wbg_showPickupPointCircle_db004672ed25d438 = function(arg0) {
        showPickupPointCircle(getObject(arg0));
    };
    imports.wbg.__wbg_getStaticMapImageUrlWithMarker_09dfc569d374c1d8 = function(arg0, arg1) {
        getStaticMapImageUrlWithMarker(getObject(arg0), getObject(arg1));
    };
    imports.wbg.__wbg_setPrecisionPin_c8c7f3e7349bd252 = function(arg0, arg1, arg2) {
        setPrecisionPin2(getObject(arg0), getObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_initializePrecisionPin_f0dc43364d94ca4f = function(arg0, arg1) {
        initializePrecisionPin(getObject(arg0), getObject(arg1));
    };
    imports.wbg.__wbg_searchSetup_87fc7620a0623180 = function(arg0, arg1, arg2) {
        searchSetup2(takeObject(arg0), takeObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_getPlaceInfoFromCoordinates_3f73983c28e1f743 = function(arg0, arg1) {
        getPlaceInfoFromCoordinates2(getObject(arg0), getObject(arg1));
    };
    imports.wbg.__wbg_clearInterval_080a47b47538d08c = function(arg0, arg1) {
        getObject(arg0).clearInterval(arg1);
    };
    imports.wbg.__wbg_new_898a68150f225f2e = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setInterval_f8e74921a562eee4 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg0).setInterval(getObject(arg1), arg2, ...getObject(arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_now_9c5990bda04c7e53 = function() {
        const ret = Date.now();
        return ret;
    };
    imports.wbg.__wbg_newwithstr_760c6ad916d29b3c = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = new WebSocket(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setonmessage_809f60b68c2a6938 = function(arg0, arg1) {
        getObject(arg0).onmessage = getObject(arg1);
    };
    imports.wbg.__wbg_setonerror_2fa7120354e9ec15 = function(arg0, arg1) {
        getObject(arg0).onerror = getObject(arg1);
    };
    imports.wbg.__wbg_setonclose_4210cf3908b79b31 = function(arg0, arg1) {
        getObject(arg0).onclose = getObject(arg1);
    };
    imports.wbg.__wbg_setonopen_419ca0e52d8f19e8 = function(arg0, arg1) {
        getObject(arg0).onopen = getObject(arg1);
    };
    imports.wbg.__wbg_data_ab99ae4a2e1e8bc9 = function(arg0) {
        const ret = getObject(arg0).data;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Blob_f2144a7f6c0c18a3 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Blob;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_set_502d29070ea18557 = function(arg0, arg1, arg2) {
        getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
    };
    imports.wbg.__wbg_set_841ac57cff3d672b = function(arg0, arg1, arg2) {
        getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
    };
    imports.wbg.__wbg_renderMap_de6ab4c97d994f3a = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg1;
            deferred0_1 = arg2;
            renderMap(getObject(arg0), getStringFromWasm0(arg1, arg2), getObject(arg3), getObject(arg4), getObject(arg5), getObject(arg6));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_getRouteTravelTimeWithCallback_2f7355b956781527 = function(arg0, arg1, arg2) {
        getRouteTravelTimeWithCallback(getObject(arg0), getObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_updateRoute_99f036973cee18ae = function(arg0, arg1, arg2) {
        updateRoute(getObject(arg0), getObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_updateDriverMarkerPosition_3a7d18c9f47216b2 = function(arg0) {
        updateDriverMarkerPosition(getObject(arg0));
    };
    imports.wbg.__wbg_setMapBounds_838550cfe5602546 = function(arg0) {
        setMapBounds(getObject(arg0));
    };
    imports.wbg.__wbg_setPinPointMarker_964e45a8816972b9 = function(arg0, arg1, arg2) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg1;
            deferred0_1 = arg2;
            setPinPointMarker(getObject(arg0), getStringFromWasm0(arg1, arg2));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_setPickupPointMarker_1eaa146351aefc00 = function(arg0, arg1, arg2) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg1;
            deferred0_1 = arg2;
            setPickupPointMarker(getObject(arg0), getStringFromWasm0(arg1, arg2));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_setDestinationPointMarker_c0646807027327eb = function(arg0, arg1, arg2) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg1;
            deferred0_1 = arg2;
            setDestinationPointMarker(getObject(arg0), getStringFromWasm0(arg1, arg2));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_renderMap_0b41707f9385eeae = function(arg0, arg1, arg2) {
        renderMap2(getObject(arg0), getObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_click_9f2ce0ac84b1ce73 = function(arg0) {
        getObject(arg0).click();
    };
    imports.wbg.__wbg_get_44be0491f933a435 = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Response_fc4327dbfcdf5ced = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Response;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_getRouteDistanceAndTime_0dd59322ad9efe75 = function(arg0, arg1, arg2, arg3) {
        getRouteDistanceAndTime(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_setPrecisionPin_8442b2877b405341 = function(arg0, arg1, arg2) {
        setPrecisionPin(getObject(arg0), getObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_getPlaceInfoFromCoordinates_14ebf208fce9305e = function(arg0, arg1) {
        getPlaceInfoFromCoordinates(getObject(arg0), getObject(arg1));
    };
    imports.wbg.__wbg_searchSetup_859f165a848175d5 = function(arg0, arg1, arg2) {
        searchSetup(takeObject(arg0), takeObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_activityvcalendar_a3d0553c9d090eb4 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        let deferred0_0;
        let deferred0_1;
        let deferred1_0;
        let deferred1_1;
        try {
            deferred0_0 = arg1;
            deferred0_1 = arg2;
            deferred1_0 = arg3;
            deferred1_1 = arg4;
            activity_vcalendar(getObject(arg0), getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getObject(arg5));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    };
    imports.wbg.__wbg_verifyPermissionCamera_8e6c3dad64e6c07a = function(arg0) {
        verifyPermissionCamera(getObject(arg0));
    };
    imports.wbg.__wbg_startVideoCameraPC_34a8b5cea9cfdc5a = function(arg0) {
        startVideoCameraPC(getObject(arg0));
    };
    imports.wbg.__wbg_getBase64ImgString_ec9ca740d8735577 = function(arg0) {
        const ret = getBase64ImgString();
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_removeItem_02359267b311cb85 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).removeItem(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlElement_6f4725d4677c7968 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof HTMLElement;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_files_0b91078a034a0f7b = function(arg0) {
        const ret = getObject(arg0).files;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_error_d0c5fd887e0ed0e3 = function(arg0) {
        const ret = getObject(arg0).error;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_name_e1f42ed4f319b110 = function(arg0, arg1) {
        const ret = getObject(arg1).name;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_result_58251a5d230b00f6 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).result;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getPhotoBytes_70829ef7cf00b61d = function(arg0, arg1, arg2) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            getPhotoBytes(getStringFromWasm0(arg0, arg1), getObject(arg2));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_initCropper_9f54c0d0430f80e6 = function(arg0, arg1) {
        initCropper(getObject(arg0), getObject(arg1));
    };
    imports.wbg.__wbg_expectFileFromImage_ad35b4ce234da3a4 = function(arg0, arg1, arg2) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg1;
            deferred0_1 = arg2;
            expectFileFromImage(getObject(arg0), getStringFromWasm0(arg1, arg2));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_name_a46b2d975591a0b3 = function(arg0, arg1) {
        const ret = getObject(arg1).name;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_type_8b3fde044d705ef3 = function(arg0, arg1) {
        const ret = getObject(arg1).type;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_new_9b551002cd49569b = function() { return handleError(function () {
        const ret = new FileReader();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_readAsArrayBuffer_07e155f1a3cd4ac2 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).readAsArrayBuffer(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_convertImgBase64toBytes_be6f444be6ac7d22 = function(arg0, arg1, arg2, arg3, arg4) {
        let deferred0_0;
        let deferred0_1;
        let deferred1_0;
        let deferred1_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            deferred1_0 = arg2;
            deferred1_1 = arg3;
            convertImgBase64toBytes(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getObject(arg4));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    };
    imports.wbg.__wbg_expectFileFromImage_5954c73fa34fa3aa = function(arg0, arg1, arg2) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg1;
            deferred0_1 = arg2;
            expectFileFromImage(getObject(arg0), getStringFromWasm0(arg1, arg2));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_instanceof_Event_d2981cbdc4be33e7 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Event;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlTextAreaElement_348d0e222e16eec4 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof HTMLTextAreaElement;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_getUtcDateWithTime_24ce7ff5cbcc8580 = function(arg0) {
        const ret = getUtcDateWithTime();
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_selectPhoneField_8cb590485a55a789 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            selectPhoneField(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_getPhoneNumberValidation_1cf768796b312999 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            const ret = getPhoneNumberValidation(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_setinnerHTML_b089587252408b67 = function(arg0, arg1, arg2) {
        getObject(arg0).innerHTML = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_requestPermissionAndCall_f9e18efdf0a3741c = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            requestPermissionAndCall(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_6da8e527659b86aa = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_has_c5fcd020291e56b8 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fetch_8eaf01857a5bb21f = function(arg0, arg1) {
        const ret = getObject(arg0).fetch(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_fetch_381efb5e862610fa = function(arg0) {
        const ret = fetch(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_55c9955722952374 = function() { return handleError(function () {
        const ret = new AbortController();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_signal_4bd18fb489af2d4c = function(arg0) {
        const ret = getObject(arg0).signal;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_abort_654b796176d117aa = function(arg0) {
        getObject(arg0).abort();
    };
    imports.wbg.__wbg_randomFillSync_dc1e9a60c158336d = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_subarray_13db269f57aa838d = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getRandomValues_37fa2ca9e4e07fab = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_then_f7e06ee3c11698eb = function(arg0, arg1) {
        const ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_b2267541e2a73865 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_resolve_53698b95aaf7fcf8 = function(arg0) {
        const ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_parse_670c19d4e984792e = function() { return handleError(function (arg0, arg1) {
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_error_23a6cf6a775b48ed = function(arg0, arg1, arg2, arg3, arg4) {
        console.error(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3), getObject(arg4));
    };
    imports.wbg.__wbg_warn_5940cd0e990e043c = function(arg0, arg1, arg2, arg3, arg4) {
        console.warn(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3), getObject(arg4));
    };
    imports.wbg.__wbg_info_68e342836df73054 = function(arg0, arg1, arg2, arg3, arg4) {
        console.info(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3), getObject(arg4));
    };
    imports.wbg.__wbg_log_6cb37e3bd73fd0d3 = function(arg0, arg1, arg2, arg3, arg4) {
        console.log(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3), getObject(arg4));
    };
    imports.wbg.__wbg_debug_4e7c4b11ab7b0d9d = function(arg0, arg1, arg2, arg3, arg4) {
        console.debug(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3), getObject(arg4));
    };
    imports.wbg.__wbg_instanceof_Window_9029196b662bc42a = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Window;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_documentElement_0df873a7503a9af9 = function(arg0) {
        const ret = getObject(arg0).documentElement;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_createElement_4891554b28d3388b = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getElementById_cc0e0d931b0d9a28 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_message_ad3cc15a4d40c34b = function(arg0, arg1) {
        const ret = getObject(arg1).message;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_instanceof_Element_4622f5da1249a3eb = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Element;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_setscrollTop_c048928133b3944a = function(arg0, arg1) {
        getObject(arg0).scrollTop = arg1;
    };
    imports.wbg.__wbg_setAttribute_e7e80b478b7b8b2f = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_target_f171e89c61e2bccf = function(arg0) {
        const ret = getObject(arg0).target;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_addEventListener_a5963e26cd7b176b = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3), getObject(arg4));
    }, arguments) };
    imports.wbg.__wbg_removeEventListener_782040b4432709cb = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3), arg4 !== 0);
    }, arguments) };
    imports.wbg.__wbg_new_1eead62f64ca15ce = function() { return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_append_fda9e3432e3e88da = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_blur_53431c003c82bf53 = function() { return handleError(function (arg0) {
        getObject(arg0).blur();
    }, arguments) };
    imports.wbg.__wbg_focus_dbcbbbb2a04c0e1f = function() { return handleError(function (arg0) {
        getObject(arg0).focus();
    }, arguments) };
    imports.wbg.__wbg_instanceof_HtmlInputElement_31b50e0cf542c524 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof HTMLInputElement;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_setchecked_e5a50baea447b8a8 = function(arg0, arg1) {
        getObject(arg0).checked = arg1 !== 0;
    };
    imports.wbg.__wbg_value_9423da9d988ee8cf = function(arg0, arg1) {
        const ret = getObject(arg1).value;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_setvalue_1f95e61cbc382f7f = function(arg0, arg1, arg2) {
        getObject(arg0).value = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_instanceof_HtmlMediaElement_73551c1db67307d8 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof HTMLMediaElement;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_play_3557bf04f90cf7c5 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).play();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_value_c45528fab757534f = function(arg0, arg1) {
        const ret = getObject(arg1).value;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_value_3c5f08ffc2b7d6f9 = function(arg0, arg1) {
        const ret = getObject(arg1).value;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_setvalue_0dc100d4b9908028 = function(arg0, arg1, arg2) {
        getObject(arg0).value = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_geolocation_20fed424884192d9 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).geolocation;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_nextSibling_304d9aac7c2774ae = function(arg0) {
        const ret = getObject(arg0).nextSibling;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_appendChild_51339d4cde00ee22 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).appendChild(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_insertBefore_ffa01d4b747c95fc = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).insertBefore(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_removeChild_973429f368206138 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).removeChild(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newwithstrandinit_cad5cd6038c7ff5d = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_url_8503de97f69da463 = function(arg0, arg1) {
        const ret = getObject(arg1).url;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_arrayBuffer_288fb3538806e85c = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getItem_ed8e218e51f1efeb = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg1).getItem(getStringFromWasm0(arg2, arg3));
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    }, arguments) };
    imports.wbg.__wbg_setItem_d002ee486462bfff = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).setItem(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_newwithstr_ad74b2c1808b94ca = function() { return handleError(function (arg0, arg1) {
        const ret = new URLSearchParams(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_get_1207388de9966926 = function(arg0, arg1, arg2, arg3) {
        const ret = getObject(arg1).get(getStringFromWasm0(arg2, arg3));
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_close_dfa389d8fddb52fc = function() { return handleError(function (arg0) {
        getObject(arg0).close();
    }, arguments) };
    imports.wbg.__wbg_send_280c8ab5d0df82de = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).send(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_document_f7ace2b956f30a4f = function(arg0) {
        const ret = getObject(arg0).document;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_composedPath_cf1bb5b8bcff496f = function(arg0) {
        const ret = getObject(arg0).composedPath();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_fff51ee6522a1a18 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_cachekey_b61393159c57fd7b = function(arg0, arg1) {
        const ret = getObject(arg1).__yew_subtree_cache_key;
        getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_subtreeid_e348577f7ef777e3 = function(arg0, arg1) {
        const ret = getObject(arg1).__yew_subtree_id;
        getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_bubbles_63572b91f3885ef1 = function(arg0) {
        const ret = getObject(arg0).bubbles;
        return ret;
    };
    imports.wbg.__wbg_setsubtreeid_d32e6327eef1f7fc = function(arg0, arg1) {
        getObject(arg0).__yew_subtree_id = arg1 >>> 0;
    };
    imports.wbg.__wbg_setcachekey_80183b7cfc421143 = function(arg0, arg1) {
        getObject(arg0).__yew_subtree_cache_key = arg1 >>> 0;
    };
    imports.wbg.__wbg_cancelBubble_90d1c3aa2a76cbeb = function(arg0) {
        const ret = getObject(arg0).cancelBubble;
        return ret;
    };
    imports.wbg.__wbg_listenerid_12315eee21527820 = function(arg0, arg1) {
        const ret = getObject(arg1).__yew_listener_id;
        getInt32Memory0()[arg0 / 4 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_parentElement_c75962bc9997ea5f = function(arg0) {
        const ret = getObject(arg0).parentElement;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_parentNode_9e53f8b17eb98c9d = function(arg0) {
        const ret = getObject(arg0).parentNode;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_ShadowRoot_b64337370f59fe2d = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof ShadowRoot;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_host_e1c47c33975060d3 = function(arg0) {
        const ret = getObject(arg0).host;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setnodeValue_d1c8382910b45e04 = function(arg0, arg1, arg2) {
        getObject(arg0).nodeValue = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_namespaceURI_31718ed49b5343a3 = function(arg0, arg1) {
        const ret = getObject(arg1).namespaceURI;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_createElementNS_119acf9e82482041 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = getObject(arg0).createElementNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_createTextNode_2fd22cd7e543f938 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).createTextNode(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_error_71d6845bf00a930f = function(arg0, arg1) {
        var v0 = getArrayJsValueFromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 4);
        console.error(...v0);
    };
    imports.wbg.__wbg_children_27ed308801b57d3f = function(arg0) {
        const ret = getObject(arg0).children;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_from_d7c216d4616bb368 = function(arg0) {
        const ret = Array.from(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setlistenerid_3183aae8fa5840fb = function(arg0, arg1) {
        getObject(arg0).__yew_listener_id = arg1 >>> 0;
    };
    imports.wbg.__wbg_removeAttribute_d8404da431968808 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).removeAttribute(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper421 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 152, __wbg_adapter_30);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper747 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_33);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper1170 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_36);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper3158 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 66, __wbg_adapter_39);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper3170 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 152, __wbg_adapter_42);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper3175 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 152, __wbg_adapter_42);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper4665 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_47);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper5383 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_50);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper5386 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_53);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper5481 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_56);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper5611 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 152, __wbg_adapter_42);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper5672 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 152, __wbg_adapter_42);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper7842 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_47);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper8017 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_50);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper8382 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_53);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper10678 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_69);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper10688 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_33);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper10808 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 66, __wbg_adapter_74);
        return addHeapObject(ret);
    };
    imports['./snippets/linea-map-52071b54828ff404/src/google-maps-favorites.js'] = __wbg_star0;
    imports['./snippets/linea-map-52071b54828ff404/src/google-maps.js'] = __wbg_star1;
    imports['./snippets/linea-storage-fb8deae9e56aaa47/src/imageCropper.js'] = __wbg_star2;
    imports['./snippets/linea-utils-2a5fdc802d978ef8/src/functions.js'] = __wbg_star3;

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedFloat64Memory0 = null;
    cachedInt32Memory0 = null;
    cachedUint32Memory0 = null;
    cachedUint8Memory0 = null;

    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('linea-app-bfad47df44aa3cac_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
