import { CompanySize } from '@/constant';
import { AddCompanyDTO as AddCompanyDto, Company } from '@/models/Company';
import companyService from '@/services/company.service';
import fileService from '@/services/file.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from '@nextui-org/react';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import SelectFileModal from '../select-file-modal';

interface AddCompanyModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
}

const validationSchema = yup.object().shape({
	name: yup.string().required('Tên công ty không được để trống'),
	address: yup.string().required('Địa chỉ không được để trống'),
	companySize: yup.string().required('Quy mô công ty không được để trống'),
	url: yup.string().required('URL không được để trống').url('URL không hợp lệ'),
});

const initialValues: AddCompanyDto = {
	name: '',
	address: '',
	companySize: 'TWENTY',
	url: '',
	banner: '',
	image: '',
};

function AddCompanyModal({ isOpen, onOpenChange }: AddCompanyModalProps) {
	const router = useRouter();
	const { isOpen: isOpenSelectBannerModal, onOpenChange: onOpenSelectBannerModalChange } = useDisclosure();
	const { isOpen: isOpenSelectImageModal, onOpenChange: onOpenSelectImageModalChange } = useDisclosure();

	const [autoAnimateParent] = useAutoAnimate();

	const onSubmit = async (values: AddCompanyDto) => {
		const company: Company = await companyService.createCompany(values);
		onOpenChange();
		router.push(`/companies/update/${company.id}`);
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader>Tạo Công Ty Mới</ModalHeader>
						<Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
							{({ handleChange, handleSubmit, errors, values, setFieldValue }) => (
								<form onSubmit={handleSubmit} ref={autoAnimateParent}>
									<ModalBody>
										<div
											className='w-full bg-gray-100 rounded-lg border relative bg-no-repeat bg-cover bg-center mb-16'
											style={{
												aspectRatio: 2,
												backgroundImage: `url(${fileService.getFileUrl(values.banner)})`,
											}}
										>
											<Button
												isIconOnly
												className='absolute right-2 bottom-2'
												onClick={onOpenSelectBannerModalChange}
											>
												<i className='bx bx-camera'></i>
											</Button>

											<div
												className='w-32 aspect-square bg-gray-100 border-4 border-white bg-no-repeat bg-cover bg-center rounded-full absolute left-2 -bottom-16 cursor-pointer'
												style={{
													backgroundImage: `url(${fileService.getFileUrl(values.image)})`,
												}}
												onClick={onOpenSelectImageModalChange}
											></div>
										</div>

										<Input
											value={values.name}
											onChange={handleChange}
											name='name'
											label='Tên công ty'
											labelPlacement='outside'
											isInvalid={!!errors.name}
											errorMessage={errors.name}
											placeholder='VD: Zit Software'
										/>

										<Input
											value={values.address}
											onChange={handleChange}
											name='address'
											label='Địa chỉ công ty'
											placeholder='VD: B3-10, Đường số 3...'
											isInvalid={!!errors.address}
											errorMessage={errors.address}
											labelPlacement='outside'
										/>

										<Input
											value={values.url}
											label='URL công ty'
											placeholder='VD: https://zit-software.com'
											onChange={handleChange}
											name='url'
											labelPlacement='outside'
											isInvalid={!!errors.url}
											errorMessage={errors.url}
										/>

										<Select
											name='companySize'
											placeholder='Chọn quy mô công ty'
											label='Quy mô công ty'
											labelPlacement='outside'
											selectedKeys={[values.companySize]}
											value={values.companySize}
											onChange={handleChange}
											isInvalid={!!errors.companySize}
											errorMessage={errors.companySize}
										>
											{Object.entries(CompanySize).map(([key, value]) => (
												<SelectItem key={key} value={key}>
													{`${value} nhân viên`}
												</SelectItem>
											))}
										</Select>

										<div className='flex justify-end mt-5'>
											<Button color='danger' variant='light' onPress={onClose}>
												Hủy
											</Button>
											<Button color='primary' type='submit'>
												Tạo
											</Button>
										</div>
									</ModalBody>

									<SelectFileModal
										isOpen={isOpenSelectBannerModal}
										onClose={onOpenSelectBannerModalChange}
										onSelected={(file) => {
											setFieldValue('banner', file.id);
											onOpenSelectBannerModalChange();
										}}
									/>

									<SelectFileModal
										isOpen={isOpenSelectImageModal}
										onClose={onOpenSelectImageModalChange}
										onSelected={(file) => {
											setFieldValue('image', file.id);
											onOpenSelectImageModalChange();
										}}
									/>
								</form>
							)}
						</Formik>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
export default AddCompanyModal;
