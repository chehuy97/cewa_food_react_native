"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var drawer_1 = require("@react-navigation/drawer");
var react_1 = require("react");
var react_native_1 = require("react-native");
var drawerContent = function (props) {
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(drawer_1.DrawerContentScrollView, __assign({}, props),
            react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(react_native_1.Text, null, "Main content")))));
};
exports["default"] = drawerContent;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    }
});
