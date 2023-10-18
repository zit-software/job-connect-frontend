/* eslint-disable @next/next/no-img-element */
'use client';

import UserNav from '@/components/user-nav';
import { Resume } from '@/models/Resume';
import fileService from '@/services/file.service';
import resumeService from '@/services/resume.service';
import { RootState } from '@/store';
import { Button, ButtonGroup, Chip, Spinner, Tab, Tabs } from '@nextui-org/react';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then((e) => e.CKEditor), { ssr: false });

export default function EditResumePage() {
	const router = useRouter();
	const params = useParams() as unknown as { id: number };

	const [zoom, setZoom] = useState<number>(1);

	const zoomIn = () => {
		setZoom((prev) => prev + 0.1);
	};

	const zoomOut = () => {
		setZoom((prev) => prev - 0.1);
	};

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

	return (
		<div className='w-full h-screen bg-gray-700 fixed z-[100] overflow-auto'>
			<div className='w-full bg-gray-600 flex h-14 sticky top-0 z-50'>
				<div
					className='h-full aspect-square bg-gray-500 flex justify-center items-center cursor-pointer hover:bg-gray-400 transition-all'
					onClick={router.back}
				>
					<i className='bx bx-chevron-left text-3xl text-white'></i>
				</div>

				<div className='flex-1'></div>

				{user && <UserNav size='sm' user={user} />}
			</div>

			{user && data ? (
				<Formik initialValues={data} enableReinitialize onSubmit={handleSubmit}>
					{({ values, errors, handleChange, setFieldValue, handleSubmit }) => (
						<form className='max-w-[95%] mx-auto' onSubmit={handleSubmit}>
							<div className='mx-auto w-fit mt-4 sticky top-10 z-[100] flex items-center gap-2'>
								<ButtonGroup color='primary' isIconOnly>
									<Button isDisabled={zoom <= 0.7} onClick={zoomOut}>
										<i className='bx bx-zoom-out'></i>
									</Button>

									<Button isIconOnly={false} onClick={() => setZoom(1)}>
										{(zoom * 100).toFixed(0)}%
									</Button>

									<Button isDisabled={zoom >= 1.5} onClick={zoomIn}>
										<i className='bx bx-zoom-in'></i>
									</Button>
								</ButtonGroup>

								<Button type='submit' startContent={<i className='bx bx-save'></i>} color='success'>
									Lưu
								</Button>
							</div>

							<div
								className='w-[21cm] min-h-[29cm] bg-background my-4 mx-auto origin-top transition-all'
								style={{
									scale: zoom,
								}}
							>
								<div className='w-full grid grid-cols-5'>
									<div className='col-span-2 bg-primary-50 min-h-[29cm]'>
										<div className='px-6 py-8'>
											<img
												className='mx-auto w-[50%] aspect-square rounded-full'
												src={fileService.getFileUrl(user.image)}
												alt={user.fullName}
											/>

											<h2 className='my-8 px-4 py-2 bg-primary-900 text-white font-bold flex items-center gap-2 rounded-xl'>
												<i className='bx bx-user'></i>
												<span>Thông tin cá nhân</span>
											</h2>

											<div className='flex flex-col gap-2'>
												<Chip
													variant='light'
													startContent={<i className='bx bx-male-female'></i>}
												>
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
													Cập nhật thông tin cá nhân tại{' '}
													<Link
														href='/settings/profile'
														className='text-primary-600 underline'
														target='_blank'
													>
														đây
													</Link>
												</Chip>
											</div>

											<h2 className='my-8 px-4 py-2 bg-primary-900 text-white font-bold flex items-center gap-2 rounded-xl'>
												<i className='bx bx-like'></i>
												<span>Kỹ năng</span>
											</h2>
										</div>
									</div>
									<div className='col-span-3 h-full bg-background'>
										<div className='px-6 py-14'>
											<h3 className='font-bold text-[2.5em] text-primary-600'>{user.fullName}</h3>
											<div className='flex items-center gap-1'>
												<input
													className='flex-1 font-semibold rounded-lg bg-transparent text-xl px-2 -mx-2 focus:outline-none border-2 border-transparent focus:border-primary-400'
													name='jobTitle'
													value={values.jobTitle}
													onChange={handleChange}
												/>
												<i className='bx bx-pencil'></i>
											</div>

											<Tabs className='mt-12' color='primary'>
												<Tab
													key='edit'
													title={
														<div className='flex items-center space-x-2'>
															<i className='bx bx-pencil'></i>
															<span>Chỉnh sửa</span>
														</div>
													}
												>
													<CKEditor
														editor={require('@ckeditor/ckeditor5-build-classic')}
														data={values.content}
														onChange={(_event, editor: any) => {
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
													<div
														className='ck-content'
														dangerouslySetInnerHTML={{ __html: values.content }}
													></div>
												</Tab>
											</Tabs>
										</div>
									</div>
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
