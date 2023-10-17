import { Banner } from '@/models/Banner';
import springWorkshop from '@/assets/images/spring-workshop.png';

export const mockBanners: Banner[] = [
	{
		id: 1,
		href: '#',
		image: springWorkshop.src,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];
