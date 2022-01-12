# Google Meet Bot For Online Class
As soon as you launch the bot, it will start listening for your messages on Whatsapp. Once the meeting link has been shared in the group, it will open the link in Firefox and join the class after disabling the mic and video. It will leave the class as soon as the number of students drops below the given count.

## Features
- Can join 2 meetings at once if the link is sent in the group while the previous meeting is going on
- In case of an unsuccessful first attempt, it tries to join the meeting again.
- Works with whatsapp without need of login agian and again

## Limitations 
- It will not work for schedule meetings
- Wont work if the pc is in sleep mode
- You may face issue if your internet is super slow

## How to use this?
There are few things you need to do before you even use the code. Below are the required stuff -:
- Must join whatsapp multi-device beta, you can learn about it from here: [How to join or leave the multi-device beta](https://faq.whatsapp.com/web/download-and-installation/how-to-join-or-leave-the-multi-device-beta/?lang=en)
- Download firefox browser from here : [Firefox Browser](https://www.mozilla.org/en-US/firefox/new/)
- Login with account from which you want to take classes in firefox browser
- Download node.js and install it: [Node](https://nodejs.org/en/)
- (optional) disable sleep on charging mode

### Installation
- Download the code or clone it (depends on you duh!)
- Go to settings.js file and fill all the details.
- Then open terminal and use `npm i` to install all the required packages
- Use command `npm run start`
- First time it will ask you to scan QR code

## Note
Its not like i created this bot because i dont want to join online classes, thats not the real reason. i created it to make my work easier, i dont need to check if link is sent to group or not, it will open class for me and i dont even need to open whatsapp xD
