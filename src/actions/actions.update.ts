import { Update, Start, Action } from 'nestjs-telegraf';
import { DataService } from 'src/data/data.service';
import { cities } from 'src/data/stats/cities';
import { orgs } from 'src/data/stats/organizations';
import { Context, Markup } from 'telegraf';
import * as tg from 'telegraf/typings/core/types/typegram';

@Update()
export class ActionsUpdate {
  constructor(private _dataService: DataService) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(
      'Привіт, цей бот створено для того, щоб ти зміг легко дізнатися, кому і яка потрібна допомога.\n' +
        'Для початку обери місто:',
      Markup.inlineKeyboard(
        cities.map((city) => {
          return Markup.button.callback(city, `city:${city}`);
        }),
        { columns: 4 },
      ),
    );
  }

  @Action('list-of-city')
  async listOfCity(ctx: Context) {
    await ctx.reply(
      'Обери місто:',
      Markup.inlineKeyboard(
        cities.map((city) => {
          return Markup.button.callback(city, `city:${city}`);
        }),
        { columns: 4 },
      ),
    );
  }

  @Action([/city:.+/])
  async pickCity(ctx: Context) {
    const update = ctx.update as any;
    const [slug, city] = update.callback_query.data.split(':');

    const filtredOrgs = orgs.filter((org) => org.city == city);

    await ctx.reply(
      'Добре, обери організацію:',
      Markup.inlineKeyboard(
        filtredOrgs.map((org) => {
          return Markup.button.callback(org.name, `orgs:${org.id}`);
        }),
        { columns: 4 },
      ),
    );
  }

  @Action(/orgs:.+/)
  async pickOrgs(ctx: Context) {
    try {
      const update = ctx.update as any;
      const [slug, orgId] = update.callback_query.data.split(':');

      const org = orgs.find((org) => org.id === orgId);
      const orgData = await this._dataService.getOrgData(orgId);

      let replyMessage =
        `Назва організації: ${org.name} \n\n` +
        `Контакти: \n\n` +
        `📱Телефон: ${org.contacts.phone} \n`;

      if (org.contacts.address) replyMessage += `📍Адреса: @some_address \n`;
      if (org.contacts.telegram)
        replyMessage += `🔵Телеграм: @some_telegram \n`;
      if (org.contacts.facebook) replyMessage += `🔵Фейсбук: some_link\n\n`;

      replyMessage += `Ось що нам потрібно: \n\n`;

      orgData.forEach((item) => {
        replyMessage +=
          `Назва: ${item.name} \n` +
          `Кількість (шт.): ${item.count} \n` +
          `Опис: ${item.description} \n\n`;
      });

      await ctx.reply(
        replyMessage,
        Markup.inlineKeyboard(
          [
            Markup.button.callback('Оновити інформацію', `orgs:${org.id}`),
            Markup.button.callback(
              'Назад до списку организацій',
              `city:${org.city}`,
            ),
            Markup.button.callback('Назад до списку міст', `list-of-city`),
          ],
          { columns: 1 },
        ),
      );
    } catch (error) {
      console.error(error);
    }
  }
}
