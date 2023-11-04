'use client';
/* eslint-disable @next/next/no-img-element */
import { Resume } from '@/models/Resume';
import fileService from '@/services/file.service';
import {
	Button,
	ButtonGroup,
	Chip,
	Listbox,
	ListboxItem,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';

export interface CvPreviewerProps {
	resume: Resume;
	isOpen: boolean;
	onClose: () => void;
}

export default function CvPreviewer({ resume, isOpen, onClose }: CvPreviewerProps) {
	const cvRef = useRef<any>();

	return (
		<Modal isOpen={isOpen} size='full' onClose={onClose}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader>
							[{resume.jobTitle}] {resume.applicant.user.fullName}
						</ModalHeader>

						<ModalBody className='bg-gray-700 overflow-y-auto '>
							<div className='w-[21cm] mx-auto sticky top-4 mb-4 gap-1 flex z-50'>
								<ButtonGroup color='primary'>
									<Button isIconOnly>
										<i className='bx bx-zoom-out'></i>
									</Button>
									<Button>100%</Button>
									<Button isIconOnly>
										<i className='bx bx-zoom-in'></i>
									</Button>
								</ButtonGroup>

								<ReactToPrint
									trigger={() => (
										<Button isIconOnly color='danger'>
											<i className='bx bx-printer'></i>
										</Button>
									)}
									content={() => cvRef.current}
								/>
							</div>

							<div
								className='w-[21cm] min-h-[29cm] bg-background mx-auto origin-top transition-all'
								ref={cvRef}
							>
								<div className='w-full grid grid-cols-5'>
									<div className='col-span-2 bg-primary-50 min-h-[29cm]'>
										<div className='px-6 py-8'>
											<img
												className='mx-auto w-[50%] aspect-square rounded-full'
												src={fileService.getFileUrl(resume.applicant.user.image)}
												alt={resume.applicant.user.fullName}
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
													<strong>Giới tính:</strong> {resume.applicant.user.gender}
												</Chip>

												<Chip variant='light' startContent={<i className='bx bx-cake'></i>}>
													<strong>Ngày sinh:</strong>{' '}
													{dayjs(resume.applicant.user.dob).format('DD/MM/YYYY')}
												</Chip>

												<Chip variant='light' startContent={<i className='bx bx-envelope'></i>}>
													<strong>Email:</strong> {resume.applicant.user.email}
												</Chip>

												<Chip variant='light' startContent={<i className='bx bx-phone'></i>}>
													<strong>Số điện thoại:</strong> {resume.applicant.user.phoneNumber}
												</Chip>
											</div>

											<h2 className='mt-8 mb-4 px-4 py-2 bg-primary-900 text-white font-bold flex items-center gap-2 rounded-xl'>
												<i className='bx bx-like'></i>
												<span className='flex-1'>Kỹ năng</span>
											</h2>

											<Listbox>
												{resume.skills.map((skill) => (
													<ListboxItem key={skill.id}>{skill.name}</ListboxItem>
												))}
											</Listbox>
										</div>
									</div>
									<div className='col-span-3 h-full bg-background'>
										<div className='px-6 py-14'>
											<h3 className='font-bold text-[2.5em] text-primary-600'>
												{resume.applicant.user.fullName}
											</h3>
											<div className='flex items-center gap-1'>
												<div className='flex-1 font-semibold rounded-lg bg-transparent text-xl px-2 -mx-2 focus:outline-none border-2 border-transparent focus:border-primary-400'>
													{resume.jobTitle}
												</div>
											</div>

											<div
												className='ck-content mt-12'
												dangerouslySetInnerHTML={{ __html: resume.content }}
											></div>
										</div>
									</div>
								</div>
							</div>
						</ModalBody>

						<ModalFooter>
							<Button onClick={onClose}>Đóng</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
