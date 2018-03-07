export const SHOW_MODAL = 'SHOW_MODAL';

export const changeModalState = (show) => {
	return {
		type: SHOW_MODAL,
		show
	}
};