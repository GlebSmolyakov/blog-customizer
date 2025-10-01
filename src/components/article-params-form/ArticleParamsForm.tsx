import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleStyles = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

type ArticleParamsFormProps = {
	onApply: (styles: ArticleStyles) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const initialState: ArticleStyles = {
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	};

	const [isOpen, setIsOpen] = useState(false);

	const [formState, setFormState] = useState(initialState);

	const handleReset = () => {
		setFormState(initialState);
		onReset();
	};

	const handleApply = () => {
		console.log('Применяем стили:', formState);
		onApply(formState);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleApply();
	};

	const handleFormReset = () => {
		handleReset();
	};

	const handleFontFamilyChange = (selected: OptionType) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: selected }));
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: selected }));
	};

	const handleFontColorChange = (selected: OptionType) => {
		setFormState((prev) => ({ ...prev, fontColor: selected }));
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setFormState((prev) => ({ ...prev, backgroundColor: selected }));
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setFormState((prev) => ({ ...prev, contentWidth: selected }));
	};

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const closeSidebar = () => {
		setIsOpen(false);
	};

	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				closeSidebar();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleFormReset}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='шрифт'
						placeholder='Выберите шрифт'
					/>
					<RadioGroup
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
						title='размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						title='цвет шрифта'
						placeholder='Выберите цвет'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						title='цвет фона'
						placeholder='Выберите цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						title='ширина контента'
						placeholder='Выберите ширину'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
