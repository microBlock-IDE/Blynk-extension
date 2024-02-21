({
    name: "Blynk-IoT", // Name
    description: "Blynk IoT platform: for businesses and developers",
    author: "microBlock",
    category: "Communication",
    version: "1.3.0",
    icon: "/static/icon.png", // Category icon
    color: "#1ABC9C", // Category color (recommend some blocks color)
    blocks: [ // Blocks in Category
        {
            xml: `
                <block type="blynk_setup">
                    <value name="ssid">
                        <shadow type="text">
                            <field name="TEXT">--wifi-name--</field>
                        </shadow>
                    </value>
                    <value name="server">
                        <shadow type="text">
                            <field name="TEXT">blynk.cloud</field>
                        </shadow>
                    </value>
                    <value name="auth">
                        <shadow type="text">
                            <field name="TEXT">--auth--</field>
                        </shadow>
                    </value>
                    <value name="template_id">
                        <shadow type="text">
                            <field name="TEXT">--template-id--</field>
                        </shadow>
                    </value>
                    <value name="template_name">
                        <shadow type="text">
                            <field name="TEXT">--template-name--</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        "blynk_on_vw",
        "blynk_get_value_number",
        "blynk_get_value_string",
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
        "blynk_run",
        {
            xml: `
                <block type="text">
                    <field name="TEXT">--wifi-pass--</field>
                </block>
            `
        }
    ],
    chip: [
        "ESP32", // Chip support
        "RP2-WiFi",
        "Uno-R4-WiFi"
    ], 
    supportArduinoPlatform: true,
    depends: [ // Arduino library
        "Blynk@1.3.2",
        "BlynkNcpDriver@0.6.3"
    ]
});
