import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useCallback } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentStyles, setCurrentStyles] = useState(defaultArticleState);

	const handleApplyStyles = useCallback(
		(newStyles: typeof defaultArticleState) => {
			setCurrentStyles(newStyles);
		},
		[]
	);

	const handleResetStyles = useCallback(() => {
		setCurrentStyles(defaultArticleState);
	}, []);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentStyles.fontFamilyOption.value,
					'--font-size': currentStyles.fontSizeOption.value,
					'--font-color': currentStyles.fontColor.value,
					'--container-width': currentStyles.contentWidth.value,
					'--bg-color': currentStyles.backgroundColor.value,
				} as CSSProperties
			}>
			{}
			<ArticleParamsForm
				onApply={handleApplyStyles}
				onReset={handleResetStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
