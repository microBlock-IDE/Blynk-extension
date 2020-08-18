({
    name: "Blynk", // Category Name
    icon: "/static/icon.png", // Category icon
    color: "#1ABC9C", // Category color (recommend some blocks color)
    blocks: [ // Blocks in Category
        {
            xml: `
                <block type="blynkSetup">
                    <value name="ssid">
                        <shadow type="text">
                            <field name="TEXT">--wifi-name--</field>
                        </shadow>
                    </value>
                    <value name="auth">
                        <shadow type="text">
                            <field name="TEXT">--auth--</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        "blynk_on_vw",
        "blynk_get_value",
        "blynk_on_vr",
        {
            xml: `
                <block type="blynk_write">
                    <value name="value">
                        <shadow type="math_number">
                            <field name="NUM">5</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        "blynk_loop",
        {
            xml: `
                <block type="text">
                    <field name="TEXT">--wifi-pass--</field>
                </block>
            `
        }
    ]
});
