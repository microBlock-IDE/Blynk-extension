Blockly.Python['blynk_setup'] = function(block) {
  var value_ssid = Blockly.Python.valueToCode(block, 'ssid', Blockly.Python.ORDER_ATOMIC) || '""';
  var value_pass = Blockly.Python.valueToCode(block, 'pass', Blockly.Python.ORDER_ATOMIC) || 'None';
  var value_auth = Blockly.Python.valueToCode(block, 'auth', Blockly.Python.ORDER_ATOMIC) || '""';
  var dropdown_debug = block.getFieldValue('debug');

  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_blynklib'] = 'import BlynkLib';
  Blockly.Python.definitions_['import_network'] = 'import network';

  var functionName = Blockly.Python.provideFunction_(
    'blynkSetup',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(wifi_ssid, wifi_pass, auth, debug):',
    '  global blynk',
    '  print("Connecting to WiFi...")',
    '  wifi = network.WLAN(network.STA_IF)',
    '  wifi.active(True)',
    '  wifi.connect(wifi_ssid, wifi_pass)',
    '  while not wifi.isconnected():',
    '    pass',
    '  print("IP:", wifi.ifconfig()[0])',
    '  print("Connecting to Blynk...")',
    '  blynk = BlynkLib.Blynk(auth, log=debug)']);

  var code = `${functionName}(${value_ssid}, ${value_pass}, ${value_auth}, ${dropdown_debug})\n`;
  return code;
};

Blockly.Python['blynk_on_vw'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var statements_callback = Blockly.Python.statementToCode(block, 'callback');

  var globals = [];
  var varName;
  var workspace = block.workspace;
  var variables = Blockly.Variables.allUsedVarModels(workspace) || [];
  for (var i = 0, variable; variable = variables[i]; i++) {
    varName = variable.name;
    if (block.getVars().indexOf(varName) == -1) {
      globals.push(Blockly.Python.variableDB_.getName(varName,
          Blockly.VARIABLE_CATEGORY_NAME));
    }
  }
  // Add developer variables.
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    globals.push(Blockly.Python.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  globals = globals.length ?
      Blockly.Python.INDENT + 'global ' + globals.join(', ') + '\n' : '';
  
  var functionName = Blockly.Python.provideFunction_(
    dropdown_pin + '_write_handler',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(value):',
    globals,
    statements_callback]);

  var code = `blynk.callbacks["${dropdown_pin}"] = ${functionName}\n`;
  return code;
};

Blockly.Python['blynk_on_vr'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var statements_callback = Blockly.Python.statementToCode(block, 'callback');

  var globals = [];
  var varName;
  var workspace = block.workspace;
  var variables = Blockly.Variables.allUsedVarModels(workspace) || [];
  for (var i = 0, variable; variable = variables[i]; i++) {
    varName = variable.name;
    if (block.getVars().indexOf(varName) == -1) {
      globals.push(Blockly.Python.variableDB_.getName(varName,
          Blockly.VARIABLE_CATEGORY_NAME));
    }
  }
  // Add developer variables.
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    globals.push(Blockly.Python.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }
  
  var functionName = Blockly.Python.provideFunction_(
    dropdown_pin + '_read_handler',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
    globals,
    statements_callback]);

  var code = `blynk.callbacks["read${dropdown_pin}"] = ${functionName}\n`;
  return code;
};

Blockly.Python['blynk_write'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC) || "";
  var dropdown_pin = block.getFieldValue('pin');
  var code = `blynk.virtual_write(${+dropdown_pin.replace("V", "")}, ${value_value})\n`;
  return code;
};

Blockly.Python['blynk_get_value_number'] = function(block) {
  var code = 'int(value[0])';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['blynk_get_value_string'] = function(block) {
  var code = 'value[0]';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['blynk_loop'] = function(block) {
  var functionName = Blockly.Python.provideFunction_(
    'blynkLoop',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
    '  while True:',
    '    blynk.run()',
    '    machine.idle()']);

  var code = `${functionName}()\n`;
  return code;
};
