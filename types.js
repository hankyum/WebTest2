"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStatus = exports.PlayerPosition = void 0;
var PlayerPosition;
(function (PlayerPosition) {
    PlayerPosition["PG"] = "\u63A7\u7403\u540E\u536B";
    PlayerPosition["SG"] = "\u5F97\u5206\u540E\u536B";
    PlayerPosition["SF"] = "\u5C0F\u524D\u950B";
    PlayerPosition["PF"] = "\u5927\u524D\u950B";
    PlayerPosition["C"] = "\u4E2D\u950B";
})(PlayerPosition || (exports.PlayerPosition = PlayerPosition = {}));
var GameStatus;
(function (GameStatus) {
    GameStatus["UPCOMING"] = "\u5373\u5C06\u5F00\u59CB";
    GameStatus["LIVE"] = "\u8FDB\u884C\u4E2D";
    GameStatus["COMPLETED"] = "\u5DF2\u7ED3\u675F";
})(GameStatus || (exports.GameStatus = GameStatus = {}));
