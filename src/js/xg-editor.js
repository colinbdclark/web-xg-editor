"use strict";

fluid.defaults("flock.midi.xgEditor", {
    gradeNames: "fluid.viewComponent",

    components: {
        device: {
            createOnEvent: "afterConnectionOpen",
            type: "flock.midi.yamahaXGDevice",
            options: {
                components: {
                    connection: "{connector}.connection"
                }
            }
        },

        connector: {
            type: "flock.ui.midiConnector",
            container: "{xgEditor}.dom.midiPortSelector",
            options: {
                portType: "output",
                components: {
                    connection: {
                        options: {
                            sysex: "true"
                        }
                    }
                },
                events: {
                    afterConnectionOpen: "{xgEditor}.events.afterConnectionOpen"
                }
            }
        }
    },

    events: {
        afterConnectionOpen: null
    },

    selectors: {
        midiPortSelector: ".flock-midiPortSelector"
    }
});
