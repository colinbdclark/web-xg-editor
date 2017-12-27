"use strict";

fluid.defaults("flock.midi.yamahaXGDevice", {
    gradeNames: "flock.midi.sysexDevice",

    manufacturerID: 0x43,
    modelID: 0x4c,
    deviceNumber: 0x10,

    partChannels: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
    ],

    dynamicComponents: {
        part: {
            sources: "{that}.options.partChannels",
            type: "flock.midi.device.part",
            options: {
                partNumber: "{source}",
                listeners: {
                    "onMIDIMessage.sendMessage": {
                        func: "{yamahaXGDevice}.connection.send",
                        args: ["{arguments}.0"]
                    }
                }
            }
        }
    }
});
