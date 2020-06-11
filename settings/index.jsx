const dateFormatPicker = [
    {name: 'MM-DD'},
    {name: 'DD-MM'}
];

const foregroundColorPalette = [
    {color: 'dodgerblue'},
    {color: 'deepskyblue'},
    {color: 'cyan'},
    {color: 'aquamarine'},
    {color: 'springgreen'},
    {color: 'lime'},
    {color: 'limegreen'},
    {color: 'greenyellow'},
    {color: 'yellow'},
    {color: 'gold'},
    {color: 'orange'},
    {color: 'darkorange'},
    {color: 'coral'},
    {color: 'orangered'},
    {color: 'red'},
    {color: 'deeppink'},
    {color: 'fuchsia'},
    {color: 'orchid'},
    {color: 'plum'},
    {color: 'lightpink'},
    {color: 'palevioletred'},
    {color: 'khaki'},
    {color: 'bisque'},
    {color: 'lemonchiffon'},
    {color: 'floralwhite'},
    {color: 'lavender'},
    {color: 'lightgrey'},
    {color: 'white'}
];

const backgroundColorPalette = [
    {color: 'midnightblue'},
    {color: 'darkslateblue'},
    {color: 'slateblue'},
    {color: 'steelblue'},
    {color: 'cadetblue'},
    {color: 'teal'},
    {color: 'darkslategray'},
    {color: 'darkgreen'},
    {color: 'green'},
    {color: 'darkolivegreen'},
    {color: 'saddlebrown'},
    {color: 'indianred'},
    {color: 'brown'},
    {color: 'maroon'},
    {color: 'mediumvioletred'},
    {color: 'purple'},
    {color: 'blueviolet'},
    {color: 'dimgrey'},
    {color: '#303030'},
    {color: 'black'}
];

function clockSettings() {
    return (
        <Page>
            <Section title="User preferences">
                <Select settingsKey="dateFormat" label="Select date format" options={dateFormatPicker} />
            </Section>
            <Section title="Active screen color">
                <ColorSelect settingsKey="foregroundColor" colors={foregroundColorPalette} />
            </Section>
            <Section title="Inactive screen color">
                <ColorSelect settingsKey="backgroundColor" colors={backgroundColorPalette} />
            </Section>
        </Page>
    );
}

// noinspection JSUnresolvedFunction
registerSettingsPage(clockSettings);
