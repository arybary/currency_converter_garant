import linkedin from '$lib/images/linkedin.svg';
import telegram from '$lib/images/telegram.svg';
import googleDisk from '$lib/images/googledisk.svg';
import github from '$lib/images/github.svg';
import telephone from '$lib/images/telephone.svg';
import gmail from '$lib/images/gmail.svg';

export const meContacts = [
	{ icon: telegram, label: 'Telegram', url: 'http://t.me/arybary' },
	{
		icon: linkedin,
		label: 'LinkedIn',
		url: 'https://www.linkedin.com/in/rostislav-medvid-9584081a2/'
	},
	{ icon: gmail, label: 'Email', url: 'mailto:medvidrostislav@gmail.com' },
	{ icon: telephone, label: '+38-(063)-767-17-74', url: 'tel:+380637671774' },
	{
		icon: googleDisk,
		label: 'Resume',
		url: 'https://docs.google.com/document/d/1UPVi2a9BNfme9zNLBeGaL41hKIwaAwfiADpX5A8pYIY/edit#'
	},
	{
		icon: github,
		label: 'Github',
		url: 'https://github.com/arybary'
	}
];
