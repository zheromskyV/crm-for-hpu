import { Navigation, NavigationLink } from '../models/navigation';
import { Role } from './roles';
import { PrimeIcons } from 'primeng/api';
import { routerPaths } from './router-paths';

const profileNavLink: NavigationLink = {
  name: 'Мой профиль',
  url: `${routerPaths.users.home}/${routerPaths.users.profile}`,
  icon: PrimeIcons.ID_CARD,
};

const reqViewNavLink: NavigationLink = {
  name: 'Мои запросы',
  url: `${routerPaths.requests.home}/${routerPaths.requests.view}`,
  icon: PrimeIcons.TABLE,
};

const incidentNavLink: NavigationLink = {
  name: 'Создать заявку',
  url: `${routerPaths.requests.home}/${routerPaths.requests.incident}`,
  icon: PrimeIcons.INBOX,
};

const feedbackNavLink: NavigationLink = {
  name: 'Оставить отзыв',
  url: `${routerPaths.requests.home}/${routerPaths.requests.feedback}`,
  icon: PrimeIcons.TAGS,
};

const bugNavLink: NavigationLink = {
  name: 'Сообщить о проблеме',
  url: `${routerPaths.requests.home}/${routerPaths.requests.bug}`,
  icon: PrimeIcons.SHIELD,
};

const featureNavLink: NavigationLink = {
  name: 'Запросить новые функции',
  url: `${routerPaths.requests.home}/${routerPaths.requests.feature}`,
  icon: PrimeIcons.COMPASS,
};

const emailNavLink: NavigationLink = {
  name: 'Отправить письмо',
  url: `${routerPaths.requests.home}/${routerPaths.requests.email}`,
  icon: PrimeIcons.SEND,
};

const analyticsNavLink: NavigationLink = {
  name: 'Аналитика',
  url: 'analyticsNavLink',
  icon: PrimeIcons.CHART_BAR,
};

const chatNavLink: NavigationLink = {
  name: 'Живой чат',
  url: 'chatNavLink',
  icon: PrimeIcons.COMMENTS,
};

const helpArticlesNavLink: NavigationLink = {
  name: 'Полезные статьи',
  url: 'helpArticlesNavLink',
  icon: PrimeIcons.QUESTION_CIRCLE,
};

const callUsNavLink: NavigationLink = {
  name: 'Позвонить нам',
  url: 'callUsNavLink',
  icon: PrimeIcons.PHONE,
};

export const navigation: Navigation = {
  [Role.Admin]: [reqViewNavLink, analyticsNavLink],
  [Role.Agent]: [reqViewNavLink],
  [Role.ChatAgent]: [chatNavLink],
  [Role.Client]: [
    profileNavLink,
    chatNavLink,
    helpArticlesNavLink,
    reqViewNavLink,
    incidentNavLink,
    feedbackNavLink,
    bugNavLink,
    featureNavLink,
    emailNavLink,
    callUsNavLink,
  ],
};
