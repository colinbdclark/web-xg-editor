/*global Uint8Array*/

"use strict";

fluid.defaults("flock.midi.sysexDevice", {
    gradeNames: "fluid.modelComponent",

    manufacturerID: 0x43,
    modelID: 0x4c,
    deviceNumber: 0x10,

    invokers: {
        assembleSysexMessage: {
            funcName: "flock.midi.sysexDevice.assembleSysexMessage",
            args: ["{arguments}.0", "{that}"]
        }
    },

    components: {
        connection: {
            type: "fluid.mustBeOverriden"
        }
    }
});

flock.midi.sysexDevice.assembleSysexMessage = function (data, that) {
    if (!data || data.length < 1) {
        return;
    }

    // Two bytes for framing, three for device IDs.
    var len = data.length + 5,
        toSend = new Uint8Array(len);

    toSend[0] = 0xF0;
    toSend[1] = that.options.manufacturerID;
    toSend[2] = that.options.deviceNumber;
    toSend[3] = that.options.modelID;
    toSend.set(data, 4);
    toSend[len - 1] = 0xF7;

    return {
        type: "sysex",
        data: toSend
    };
};
