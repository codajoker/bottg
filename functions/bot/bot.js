require("dotenv").config();
const axios = require("axios");
const { Telegraf , Markup } = require('telegraf');
 
axios.defaults.baseURL = 'https://dephelp.herokuapp.com/user';
const resetStore = async(chatID) => {
 await axios.patch(`/chatId/${chatID}`,{
    secondTap : false,
    firstTap : false,
    pid : null,
    offerID : null,
    app: null
  })
}

const bot = new Telegraf("6055809580:AAFah6MeLvKhDvXqd8lqwIYCb-xN7TGjYgc");

const appKeyboard = Markup.keyboard([["NSQ"],["TD"],["TSquad"],["Trident"],["APPIE"],])
bot.start(async(ctx) => {
 
try {
  await  axios.post("/",{
    chatId : ctx.chat.id
  })
} catch (error) {
  throw new Error(error);
}
  //  resetStore(ctx.chat.id)
  await ctx.reply('Здравствуйте, этот бот поможет вам сделать Naming и Deeplink',appKeyboard)});


bot.on('text',async (ctx) => {
  try {
   let store = await axios.get(`/chatId/${ctx.chat.id}`)

    text = ctx.update.message.text;
  
  if (text === "Вернуться на главное меню") {
  
   resetStore(ctx.chat.id);

   return ctx.reply('Выберите меню',appKeyboard)
  }
 
  if (store.data.firstTap && store.data.secondTap && store.data.app) {
    await  axios.patch(`/chatId/${ctx.chat.id}`, {
      offerID : text,
          })
     
  switch (store.data.app) {
  
    case "NSQ":
   await ctx.reply('Naming:',)
   await ctx.reply(`sub1%dep4lab%sub2%SUB2%sub3%SUB3%sub4%${store.data.pid}%sub5%${text} `,)
   await ctx.reply('Deeplink:',)
   await ctx.reply(`app://?sub1=dep4lab&sub2=SUB2&sub3=SUB3&sub4=${store.data.pid}&sub5=${text}`)
   await ctx.reply(`Ваш бот для прошарки: @depplab_apps_bot`)

   await ctx.reply('Хорошего залива вместе с DepLab❤🧪',appKeyboard)

    resetStore(ctx.chat.id)

    
    break;
    case "TD":
      await ctx.reply('Naming:',)
      await ctx.reply(`baumzzx&push=richpigs&sub4=${store.data.pid}&sub5=${text}&sub2=SUB2&sub3=SUB3`,)
      await ctx.reply('Deeplink:',)
      await ctx.reply(`myapp://baumzzx&push=richpigs&sub4=${store.data.pid}&sub5=${text}&sub2=SUB2&sub3=SUB3`)
      await ctx.reply(`Ваш бот для прошарки: @td_appsbot`)

      await ctx.reply('Хорошего залива вместе с DepLab❤🧪',appKeyboard)
      resetStore(ctx.chat.id)
      break;
    case "TSquad":
      await ctx.reply('Naming:',)
      await ctx.reply(`dep_sub2_sub3_${store.data.pid}_${text}_sub6`,)
      await ctx.reply('Deeplink:',)
      await ctx.reply(`myapp://dep_sub2_sub3_${store.data.pid}_${text}_sub6`,appKeyboard)
      await ctx.reply(`Ваш бот для прошарки: @tsquad_apps_bot `)

      await ctx.reply('Хорошего залива вместе с DepLab❤🧪',)
   
      resetStore(ctx.chat.id)
      break;
    case "APPIE":
      await ctx.reply('Naming:',)
      await ctx.reply(`dlab_${store.data.pid}_${text}_sub2_sub3_sub4_sub5`,)
      await ctx.reply('Deeplink:',)
      await ctx.reply(`app://dlab_${store.data.pid}_${text}_sub2_sub3_sub4_sub5`,appKeyboard)
      await ctx.reply(`Ваш бот для прошарки: ​@appie_app_bot`)

      await ctx.reply('Хорошего залива вместе с DepLab❤🧪',)
   
      resetStore(ctx.chat.id)

    break;
    case "Trident":
      await ctx.reply('Naming:',)
      await ctx.reply(`deplab_sub2_sub3_${store.data.pid}_${text}`,)
      await ctx.reply('Deeplink:',)
      await ctx.reply(`myapp://deplab/sub2/sub3/${store.data.pid}/${text}`,appKeyboard)
      await ctx.reply(`Ваш бот для прошарки: @trident_appbot`)

      await ctx.reply('Хорошего залива вместе с DepLab❤🧪',)
   
      resetStore(ctx.chat.id)

    break;


} 

    
  }

  if ( store.data.firstTap && !store.data.secondTap) {
  await  axios.patch(`/chatId/${ctx.chat.id}`, {
pid : text,
secondTap : true,
    })

  ctx.reply("Введите OFFERID например : 7", Markup.keyboard([["Вернуться на главное меню"]]));

  
}



let finalyMessage = false;
if (!store.data.firstTap) {
  switch (text) {
  
    case "NSQ":
    await axios.patch(`/chatId/${ctx.chat.id}`, {
      firstTap : true,
      app : 'NSQ',
    })  
      finalyMessage = true;
    break;
    case "TD":
    await axios.patch(`/chatId/${ctx.chat.id}`, {
      firstTap : true,
      app : 'TD',
    })  

    finalyMessage = true;
    break;
    case "TSquad":
    await axios.patch(`/chatId/${ctx.chat.id}`, {
      firstTap : true,
      app : 'TSquad',
    })  

    finalyMessage = true;
    break;
    case "APPIE":
      await axios.patch(`/chatId/${ctx.chat.id}`, {
        firstTap : true,
        app : 'APPIE',
      })  
  
      finalyMessage = true;
  
      break;
      case "Trident":

    await axios.patch(`/chatId/${ctx.chat.id}`, {
      firstTap : true,
      app : 'Trident',
    })  

    finalyMessage = true;

    break;


}
if (finalyMessage) {

  ctx.reply("Введите PID например : 364", Markup.keyboard([["Вернуться на главное меню"]]));


}
}
  } catch (error) {
    throw new Error(error);
  }

})




// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body))
    return { statusCode: 200, body: "" }
  } catch (e) {
    console.error("error in handler:", e)
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
  }
}

