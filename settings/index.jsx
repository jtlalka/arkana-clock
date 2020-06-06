const options = [
    {
        title: 'Active screen color',
        key: 'foregroundColor',
        values: [
            {color: "dodgerblue"},
            {color: "deepskyblue"},
            {color: "cyan"},
            {color: "aquamarine"},
            {color: "springgreen"},
            {color: "lime"},
            {color: "limegreen"},
            {color: "greenyellow"},
            {color: "yellow"},
            {color: "gold"},
            {color: "orange"},
            {color: "darkorange"},
            {color: "coral"},
            {color: "orangered"},
            {color: "red"},
            {color: "deeppink"},
            {color: "fuchsia"},
            {color: "orchid"},
            {color: "plum"},
            {color: "lightpink"},
            {color: "palevioletred"},
            {color: "khaki"},
            {color: "bisque"},
            {color: "lemonchiffon"},
            {color: "floralwhite"},
            {color: "lavender"},
            {color: "lightgrey"},
            {color: "white"}
        ]
    },
    {
        title: 'Inactive screen color',
        key: 'backgroundColor',
        values: [
            {color: "midnightblue"},
            {color: "darkslateblue"},
            {color: "slateblue"},
            {color: "steelblue"},
            {color: "cadetblue"},
            {color: "teal"},
            {color: "darkslategray"},
            {color: "darkgreen"},
            {color: "green"},
            {color: "darkolivegreen"},
            {color: "saddlebrown"},
            {color: "indianred"},
            {color: "brown"},
            {color: "maroon"},
            {color: "purple"},
            {color: "blueviolet"},
            {color: "rosybrown"},
            {color: "dimgrey"},
            {color: "#303030"},
            {color: "black"}
        ]
    }
];

function clockSettings(props) {
    return (
        <Page>
            {options.map(item =>
                <Section title={item.title}>
                    <ColorSelect settingsKey={item.key} colors={item.values}/>
                </Section>
            )}
        </Page>
    );
}

// noinspection JSUnresolvedFunction
registerSettingsPage(clockSettings);
