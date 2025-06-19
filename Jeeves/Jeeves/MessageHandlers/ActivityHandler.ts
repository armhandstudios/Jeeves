import { Activity, DMChannel, Message, TextChannel, time } from "discord.js";
import { BaseHandler } from "./BaseHandler";
import { TimeLike } from "fs";



///
/// The purpose of this class is to manually track things that aren't easily queriable. By recording recent messages, we can
/// Do things like !unedit, !undelete, etc
/// This will also serve as a handler for general activity commands
///
export class ActivityHandler extends BaseHandler {

    static lastHeatedDebate: TimeLike;

    constructor() {
        super();
        if (ActivityHandler.lastHeatedDebate == null) {
            ActivityHandler.lastHeatedDebate = Date.now();
        }
    }

    //return true if no further parsing needs to be done on message (in this case, if the message is deleted)
    ingest(messageArray: string[], message: Message): boolean {
        let ret: boolean = false;

        ret = ret || this.heatedDebate(message);

        return ret;
    }

    heatedDebate(message: Message): boolean {
        let channel: TextChannel = message.channel as TextChannel;

        //Only use this command once a day at most
        var curTime: number = Date.now().valueOf() as number
        if (curTime < (ActivityHandler.lastHeatedDebate.valueOf() as number) + 86400000) {
            console.log(`Skipping Heated debate at ${Date.now()}`);
            return true;
        }

        var lastFiveMessages: Message[] = channel.messages.cache.last(5);
        console.log`Last Five - ${lastFiveMessages}`;

        if (lastFiveMessages.length < 5) {
            return true;
        }

        if ((lastFiveMessages[0].createdAt.valueOf() as number) > (lastFiveMessages[4].createdAt.valueOf() as number) - 60000) {

            switch (Math.floor(Math.random() * 5)) {
                case 0:
                    channel.send("Mom, Dad, stop fighting");
                    break
                case 1:
                    channel.send(`I agree with ${lastFiveMessages[4].author.toString()}`);
                    break
                case 2:
                    channel.send("I am also here");
                    break
                case 3:
                    channel.send("What are we even talking about anymore?");
                    break
                case 4:
                    channel.send("Make sure you're running a load of laundry");
                    break
            }
            ActivityHandler.lastHeatedDebate = Date.now();
        }

        return true;
    }
}