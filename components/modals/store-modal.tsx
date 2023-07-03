'use client'

import * as z from 'zod'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Modal from '@/components/ui/modal'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useStoreModal } from '@/hooks/use-store-modal'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
	name: z.string().min(1),
})

export const StoreModal = () => {
	const storeModal = useStoreModal()

	const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true)

			const response = await axios.post('/api/stores', values)

			window.location.assign(`/${response.data.id}`)

			toast.success('Магазин создан 🔥')
		} catch (error) {
			toast.error('Что-то пошло не так 😣')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal
			title='Создать магазин'
			description='Добавить новый магазин для добавления продуктов и категорий'
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div className='space-y-4 py-2 pb-4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Название магазина'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='pt-6 space-x-2 flex items-center justify-end w-full'>
							<Button
								disabled={loading}
								variant={'outline'}
								onClick={storeModal.onClose}
							>
								Отмена
							</Button>
							<Button disabled={loading} type='submit'>
								Продолжить
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	)
}
