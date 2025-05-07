export abstract class View {
    abstract getUnreadedMessage(): any;
    abstract sendMessage(message: string, chatId: number): any;
}