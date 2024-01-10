import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { PROP_TYPE, ROLE } from '../../../../constants';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (<div className="new-comment">
				<textarea
					name="comment"
					value={newComment}
					placeholder="Комментарий..."
					onChange={({ target }) =>
						setNewComment(target.value)}
				></textarea>
				<Icon
					id="fa-paper-plane"
					margin="0 0 0 10px"
					size="18px"
					onClick={() => onNewCommentAdd(postId, newComment)}
				/>
			</div>)}

			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`

	width: 580px;
	margin: 0 auto;

	& .new-comment {
		width: 100%;
		display: flex;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 550px;
		height: 120px;
		resize: none;
		font-size: 18px;
	}
`;


Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
