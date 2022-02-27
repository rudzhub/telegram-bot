import { Telegraf, Markup, Context } from 'telegraf';
import axios from 'axios';
import { Organization, organizations } from './organizations';

const token = '5227368679:AAG6NMaoWxG7AOYcnpK0eMigxOYa6vwYpsU';

export const bot = new Telegraf(token);

function getCities() {
  const cities: string[] = [];
  organizations.forEach((organization) => {
    if (!cities.includes(organization.city)) cities.push(organization.city);
  });

  return cities;
}

function getOrganizationsByCity(city: string) {
  const organizationsByCity = organizations.filter(
    (organization) => organization.city === city,
  );

  return organizationsByCity;
}

interface Item {
  name: string;
  count: number;
  description: string;
}

async function printOrganization(ctx: Context, organization: Organization) {
  const items: Item[] = (
    await axios.get(`http://localhost:5000/${organization.tableId}`)
  ).data;

  const formatedItems = items.map(
    (item) =>
      `${item.name}: ${item.count} \n` + `Подробности: ${item.description}`,
  );

  ctx.reply(
    `Назва організації: ${organization.name} \n` +
      `Контакти: \n` +
      `📱Телефон: ${organization.contacts.phone}\n` +
      `📍Адреса: ${organization.contacts.address}\n` +
      `🔵Телеграм: ${organization.contacts.telegram} \n` +
      `🔵Фейсбук: ${organization.contacts.facebook}\n\n` +
      `Ось що нам потрібно: \n\n` +
      `${formatedItems}`,
  );
}

function printOrganizations(ctx: Context, city: string) {
  const organizations = getOrganizationsByCity(city);
  ctx.reply(
    'Обери організацію',
    Markup.inlineKeyboard(
      organizations.map((organization) => {
        bot.action(organization.name, (ctx) => {
          printOrganization(ctx, organization);
        });

        return Markup.button.callback(organization.name, organization.name);
      }),
    ),
  );
}

function printCities(ctx: Context) {
  const cities = getCities();

  ctx.reply(
    'Привіт, цей бот створено для того, щоб ти зміг легко дізнатися, кому і яка потрібна допомога.\n' +
      'Для початку обери місто:',
    Markup.inlineKeyboard(
      cities.map((city) => {
        bot.action(city, (ctx) => {
          printOrganizations(ctx, city);
        });

        return Markup.button.callback(city, city);
      }),
    ),
  );
}

bot.start((ctx) => {
  printCities(ctx);
});
