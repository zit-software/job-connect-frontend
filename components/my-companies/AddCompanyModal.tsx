import { CompanySize } from '@/constant';
import { AddCompanyDTO, Company } from '@/models/Company';
import companyService from '@/services/company.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem } from '@nextui-org/react';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
interface AddCompanyModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
}
function AddCompanyModal({ isOpen, onOpenChange }: AddCompanyModalProps) {
	const router = useRouter();
	const [autoAnimateParent] = useAutoAnimate();
	const validationSchema = yup.object().shape({
		name: yup.string().required('Tên công ty không được để trống'),
		address: yup.string().required('Địa chỉ không được để trống'),
		companySize: yup.string().required('Quy mô công ty không được để trống'),
		url: yup
			.string()
			.required('URL không được để trống')
			.matches(
				/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
				'URL không hợp lệ',
			),
	});
	const onSubmit = async (values: AddCompanyDTO) => {
		const company: Company = await companyService.createCompany(values);
		onOpenChange();
		router.push(`/companies/update/${company.id}`);
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>Tạo Công Ty Mới</ModalHeader>
						<ModalBody>
							<Formik
								onSubmit={onSubmit}
								initialValues={{
									name: '',
									address: '',
									companySize: 'TWENTY',
									url: '',
								}}
								validationSchema={validationSchema}
							>
								{({ handleChange, handleSubmit, errors, values, setFieldValue }) => (
									<form onSubmit={handleSubmit} ref={autoAnimateParent}>
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
											className='my-5'
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
											className='my-5'
											value={values.url}
											label='URL công ty'
											placeholder='VD: http://zit-software.com'
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
									</form>
								)}
							</Formik>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
export default AddCompanyModal;
