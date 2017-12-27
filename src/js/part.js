"use strict";

fluid.defaults("flock.midi.device.part", {
    gradeNames: "fluid.modelComponent",

    partNumber: 0,
    sysexBaseAddress: 0x08,

    model: {
        voice: {
            bankGroup: 0,
            bank: 0,
            program: 0,
        },

        receiveChannel: "{that}.options.partNumber"
    },

    channelMessageMap: {
        bankGroup: {
            template: {
                type: "control",
                number: 0
            },
            valuePath: "value"
        },

        bank: {
            template: {
                type: "control",
                number: 32
            },
            valuePath: "value"
        },

        program: {
            template: {
                type: "program"
            },
            valuePath: "program"
        }
    },

    sysexMessageMap: {
        receiveChannel: {
            address: 0x04,
            length: 1
        }
    },

    modelListeners: {
        "voice.*": {
            funcName: "flock.midi.device.part.sendChannelMessage",
            args: ["{change}.path.1", "{change}.value", "{that}"]
        },

        receiveChannel: {
            funcName: "flock.midi.device.part.sendSysexMessage",
            args: ["{change}.path.0", "{change}.value", "{that}", "{sysexDevice}"]
        }
    },

    events: {
        onMIDIMessage: null
    }
});

flock.midi.device.part.sendChannelMessage = function (path, value, that) {
    var messageMap = that.options.channelMessageMap[path];
    if (!messageMap) {
        return;
    }

    var message = fluid.copy(messageMap.template);
    fluid.set(message, messageMap.valuePath, value);
    message.channel = that.model.receiveChannel;
    that.events.onMIDIMessage.fire(message);
};

// TODO: Reduce duplication with the above.
// TODO: How will we handle transformation or complex
//       sysex message assembly?
flock.midi.device.part.sendSysexMessage = function (path, value, that, sysexDevice) {
    var messageMap = that.options.sysexMessageMap[path]
    if (!messageMap) {
        return;
    }

    var data = new Uint8Array(messageMap.length + 3);
    data[0] = that.options.sysexBaseAddress;
    data[1] = that.options.partNumber;
    data[2] = messageMap.address;
    data[3] = value;

    var message = sysexDevice.assembleSysexMessage(data);
    that.events.onMIDIMessage.fire(message);
};
