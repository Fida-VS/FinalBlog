import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { CLOSE_MODAL, openModal, removePostAsync } from "../../../../actions";
import { checkAccess } from "../../../../utils";
import { ROLE } from "../../../../constants";
import { selectUserRole } from "../../../../selectors";


const SpecialPanelContainer = ({className, id, publishedAt, editButton}) => {

const dispatch = useDispatch();
const navigate = useNavigate();
const userRole = useSelector(selectUserRole);


	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole)

	return (
		<div className={className}>
				<div className="published-at">
					{ publishedAt.substring(0, 16).replace('T', ' ') && <Icon inactive={true} id="fa-calendar" margin="0 7px 0 0" size="18px" />}
					{publishedAt.substring(0, 16).replace('T', ' ')}
				</div>
				{isAdmin && (<div className="buttons">
				{editButton}
				{ publishedAt && <Icon id="fa-trash" size="20px" margin="0 0 0 7px" onClick={() => onPostRemove(id)} />}
				</div>
                 )}
			</div>
	);
};


export const SpecialPanel = styled(SpecialPanelContainer)`
		display: flex;
		justify-content: space-between;
		margin: ${({margin}) => margin};

		& .published-at {
			display: flex;
			font-size: 18px;
		}

		& .buttons {
			display: flex;
		}

		& i {
			position: relative;
			top: -1px;
		}
`;


SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
