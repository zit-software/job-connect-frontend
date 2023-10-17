import springWorkshop from '@/assets/images/spring-workshop.png';
import { Banner } from '@/models/Banner';

export const mockBanners: Banner[] = [
	{
		id: 1,
		href: '#',
		image: springWorkshop.src,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];
