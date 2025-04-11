"use strict";
///<reference path="../app.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleHandler = void 0;
const BaseHandler_1 = require("./BaseHandler");
const app_1 = require("../app");
class RoleHandler extends BaseHandler_1.BaseHandler {
    //return true if no further parsing needs to be done on message (in this case, if the message is deleted)
    ingest(messageArray, message) {
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
        if (cmd === `${this.tradPrefix}setColor`) {
            this.SetColor(args, message);
            return true;
        }
        if (cmd === `${this.tradPrefix}setUpColorRoles`) {
            this.SetUpColorRoles(message);
            return true;
        }
    }
    SetColor(args, message) {
        if (args.length > 1) {
            message.channel.send("I'm sorry old sport, I didn't understand that.");
            return;
        }
        if (args.length < 1
            || message.guild.roles.cache.find(role => role.name == `jeeves_${args[0]}`) == undefined) {
            message.channel.send(`Please say which color you want to be from the following (mind your caps) - ${app_1.roleColorList.toString()}`);
            return;
        }
        message.member.roles.remove(message.member.roles.cache.each(r => r.name.includes('jeeves_')))
            .then(member => member.roles.add(message.guild.roles.cache.find(role => role.name == `jeeves_${args[0]}`))).catch(_ => null);
    }
    SetUpColorRoles(message) {
        //Default all the other roles
        message.guild.roles.cache.forEach(role => {
            if (!role.name.includes('jeeves_')) {
                role.setColor('Default').catch(_ => null);
            }
        });
        (0, app_1.createColorRolesIfNotExist)(message.guild);
    }
}
exports.RoleHandler = RoleHandler;
//# sourceMappingURL=RoleHandler.js.map