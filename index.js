const { Client } = require('whatsapp-web.js');
const settings = require("./settings.js")

const MeetClass = require("./tools/meet")
const Meet = new MeetClass({
    path: settings.browser_path
})

const client = new Client({ clientId: 'example' });

client.on('qr', (qr) => {
    console.log('[ERROR]: Please scan the QR code.');
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED: Logged into whatsapp');
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('Connected to whatsapp as', client.info.pushname);
});

client.on('message', async msg => {
    const chat = await msg.getChat()
    if (chat.name !== settings.group_name) return;
    
    const message = msg.data;

    if (message.links?.length && message.links[0]?.link.includes("meet.google")) {
        await Meet.sleep(1000 * 60 * settings.join_meeting_after)
        
        await Meet.openClass(message.links[0].link, message.notifyName).catch(async err => {
        Meet.log(`(${message.notifyName}) Something went wrong while joining meeting: ${err}`)

        Meet.log(`(${message.notifyName}) Trying again to join meeting`)
        await Meet.openClass(message.links[0].link, message.notifyName).catch(err => {
            Meet.log(`(${message.notifyName}) I am unable to join this meeting.`)
        })
    })
}

});

client.on('change_state', state => {
    console.log('CHANGE STATE', state);
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

client.initialize();

setInterval(async function () {
    if (!Meet.meetings?.length) return;
    Meet.meetings.forEach(async (meeting) => {
        const members = await Meet.getMemberList(meeting)
        if (members.length <= settings.member_count) {
            Meet.log(`Leaved the meeting by ${meeting.teacher}`)
            await Meet.exitClass(meeting)
        }
    })
}, 1000 * 60 * settings.interval_check)
