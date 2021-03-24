import styled from 'styled-components';
import { Modal } from 'antd';
import { useMapStore } from '../pages/map/store';

const Iframe = styled.iframe`
	width: 100%;
	height: 100%;
	border: 0;
`;

export default function ArticleModal() {
	const [
		{ isModalVisible, currentArticle },
		{ setModalVisible, setCurrentArticle },
	] = useMapStore();

	function handleCancel() {
		setModalVisible(false);
		setCurrentArticle({ url: '', title: '' });
	}

	return (
		<Modal
			title={currentArticle.title}
			visible={isModalVisible}
			onCancel={handleCancel}
			footer={null}
			width='80vw'
			bodyStyle={{ height: 'calc(80vh - 100px)' }}
		>
			<Iframe
				src={currentArticle.url.replace(
					'pl.wikipedia',
					'pl.m.wikipedia'
				)}
				title={currentArticle.title}
			/>
		</Modal>
	);
}
