import { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	useOutsideClickClose({ isOpen, onChange: setIsOpen, rootRef: panelRef });

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				ref={panelRef as unknown as React.RefObject<HTMLDivElement>}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(opt) =>
							setFormState((s) => ({ ...s, fontFamilyOption: opt }))
						}
					/>

					<Separator />

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(opt) =>
							setFormState((s) => ({ ...s, fontSizeOption: opt }))
						}
					/>

					<Separator />

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(opt) => setFormState((s) => ({ ...s, fontColor: opt }))}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(opt) =>
							setFormState((s) => ({ ...s, backgroundColor: opt }))
						}
					/>

					<Separator />

					<RadioGroup
						title='Ширина контента'
						name='content-width'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(opt) =>
							setFormState((s) => ({ ...s, contentWidth: opt }))
						}
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
