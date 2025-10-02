import { CSSProperties, useCallback, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';

import styles from 'src/styles/index.module.scss';

export const App = () => {
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
			className={styles.main}
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
