'use client';

import UserNav from '@/components/user-nav';
import { Resume } from '@/models/Resume';
import fileService from '@/services/file.service';
import resumeService from '@/services/resume.service';
import { RootState } from '@/store';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Avatar, Button, Card, CardBody, Chip, Spinner, Tab, Tabs } from '@nextui-org/react';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export default function EditResumePage() {
	const router = useRouter();
	const params = useParams() as unknown as { id: number };

	const { data } = useQuery(['resume', params.id], () => resumeService.getResumeById(params.id));

	const user = useSelector((state: RootState) => state.user);

	const handleSubmit = async (value: Resume) => {
		try {
			await resumeService.updateResumeById(params.id, value);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			toast.success('Cập nhật thành công');
		}
	};

	if (!user) {
		return <Spinner />;
	}

	return (
		<div className='w-full h-screen bg-primary-50 fixed z-[100] overflow-auto'>
			<div className='w-full bg-white flex h-14 border-b sticky top-0 z-50'>
				<div
					className='h-full aspect-square bg-gray-100 flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-all'
					onClick={router.back}
				>
					<i className='bx bx-chevron-left text-3xl'></i>
				</div>

				<div className='flex-1'></div>

				<UserNav size='sm' user={user} />
			</div>

			{data ? (
				<Formik initialValues={data} enableReinitialize onSubmit={handleSubmit}>
					{({ values, errors, handleChange, setFieldValue, handleSubmit }) => (
						<form className='max-w-[95%] mx-auto' onSubmit={handleSubmit}>
							<input
								className='w-full rounded-lg text-primary bg-transparent text-3xl font-bold my-4 py-4 px-2 -mx-2 focus:outline-none border-2 border-transparent focus:border-primary-400'
								name='jobTitle'
								value={values.jobTitle}
								onChange={handleChange}
							/>

							<div className='grid grid-cols-4 gap-2'>
								<div className='col-span-1 bg-background rounded-xl p-4 border h-fit'>
									<h4 className='font-bold text-lg'>Thông tin cá nhân</h4>

									<Avatar className='w-36 h-36 mx-auto' src={fileService.getFileUrl(user.image)} />

									<div className='flex flex-col gap-2 my-4'>
										<Chip variant='light' startContent={<i className='bx bx-user'></i>}>
											<strong>Họ và tên:</strong> {user.fullName}
										</Chip>

										<Chip variant='light' startContent={<i className='bx bx-male-female'></i>}>
											<strong>Giới tính:</strong> {user.gender}
										</Chip>

										<Chip variant='light' startContent={<i className='bx bx-cake'></i>}>
											<strong>Ngày sinh:</strong> {dayjs(user.dob).format('DD/MM/YYYY')}
										</Chip>

										<Chip variant='light' startContent={<i className='bx bx-envelope'></i>}>
											<strong>Email:</strong> {user.email}
										</Chip>

										<Chip variant='light' startContent={<i className='bx bx-phone'></i>}>
											<strong>Số điện thoại:</strong> {user.phoneNumber}
										</Chip>

										<Chip
											size='sm'
											variant='light'
											startContent={<i className='bx bx-info-circle'></i>}
										>
											Bạn có thể cập nhật thông tin cá nhân tại{' '}
											<Link
												href='/settings/profile'
												className='text-primary-600 underline'
												target='_blank'
											>
												đây
											</Link>
										</Chip>
									</div>
								</div>

								<div className='col-span-3 h-fit bg-background rounded-xl p-4 border'>
									<h4 className='font-bold text-lg flex gap-2 items-center'>
										<span className='flex-1'>Nội dung</span>
										<Button
											type='submit'
											color='primary'
											startContent={<i className='bx bx-save'></i>}
										>
											Lưu
										</Button>
									</h4>

									<Tabs className='mt-2' color='primary'>
										<Tab
											key='edit'
											title={
												<div className='flex items-center space-x-2'>
													<i className='bx bx-pen'></i>
													<span>Chỉnh sửa</span>
												</div>
											}
										>
											<CKEditor
												editor={ClassicEditor}
												data={values.content}
												onChange={(_event, editor) => {
													const data = editor.getData();
													setFieldValue('content', data);
												}}
											/>
										</Tab>

										<Tab
											key='preview'
											title={
												<div className='flex items-center space-x-2'>
													<i className='bx bx-right-arrow'></i>
													<span>Xem</span>
												</div>
											}
										>
											<Card>
												<CardBody
													className='ck-content'
													dangerouslySetInnerHTML={{ __html: values.content }}
												></CardBody>
											</Card>
										</Tab>
									</Tabs>
								</div>
							</div>
						</form>
					)}
				</Formik>
			) : (
				<div className='mx-auto my-20 w-fit'>
					<Spinner />
				</div>
			)}
		</div>
	);
}
